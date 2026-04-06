import axios from 'axios';
import { pool } from '../config/db.js';
import MockInterviewModel from '../models/mockInterviewModel.js';
import JobModel from '../models/jobModel.js';

class MockInterviewController {
    static async startInterview(req, res) {
        try {
            const { jobId } = req.body;
            const userId = req.user.id; 

            // Find application
            const application = await MockInterviewModel.getApplication(userId, jobId);
            if (!application) {
                return res.status(400).json({ message: 'Bạn cần ứng tuyển vào công việc này trước khi tham gia phỏng vấn AI.' });
            }

            const job = await JobModel.findById(jobId);
            if (!job) {
                return res.status(404).json({ message: 'Không tìm thấy công việc.' });
            }

            // Check if there's an ongoing session
            let sessionId;
            let savedQuestions = [];
            
            const existingSession = await MockInterviewModel.getSessionByApplication(application.id);
            if (existingSession) {
                // Resume or review existing session
                sessionId = existingSession.id;
                savedQuestions = await MockInterviewModel.getAnswers(sessionId);
            } else {
                // Call AI Service to generate 5-7 questions
                const aiResponse = await axios.post(`http://localhost:8001/api/v1/interview/mock/generate`, {
                    job_title: job.title,
                    job_description: job.description,
                    requirements: job.requirements || ""
                });

                const questions = aiResponse.data.questions;
                if (!questions || questions.length === 0) {
                    return res.status(500).json({ message: 'Failed to generate mock interview questions' });
                }

                // Double check in case another request created it while AI was generating
                const doubleCheckSession = await MockInterviewModel.getSessionByApplication(application.id);
                if (doubleCheckSession) {
                    sessionId = doubleCheckSession.id;
                    savedQuestions = await MockInterviewModel.getAnswers(sessionId);
                } else {
                    sessionId = await MockInterviewModel.createSession(application.id);
                    await MockInterviewModel.addQuestions(sessionId, questions);
                    savedQuestions = await MockInterviewModel.getAnswers(sessionId);
                }
            }

            res.status(201).json({
                message: 'Interview started/resumed successfully',
                sessionId,
                jobTitle: job.title,
                questions: savedQuestions.map(q => {
                    let parsedFeedback = q.ai_feedback || "";
                    let perfectAnswer = "";
                    try {
                        const obj = JSON.parse(q.ai_feedback);
                        parsedFeedback = obj.feedback || "";
                        if (obj.improvements && Array.isArray(obj.improvements) && obj.improvements.length > 0) {
                            parsedFeedback += "\n\n**Gợi ý cải thiện:**\n" + obj.improvements.map(i => "- " + i).join("\n");
                        }
                        perfectAnswer = obj.perfect_answer || "";
                    } catch(e) {
                        // Keep raw if not json
                    }
                    return {
                        id: q.id,
                        question: q.question,
                        answer: q.candidate_answer,
                        ai_score: q.score,
                        ai_feedback: parsedFeedback,
                        ai_perfect_answer: perfectAnswer,
                        is_answered: q.candidate_answer ? 1 : 0
                    };
                })
            });
        } catch (error) {
            console.error('Error starting mock interview:', error.response?.data || error.message);
            res.status(500).json({ message: 'Lỗi hệ thống khi bắt đầu phỏng vấn' });
        }
    }

    static async evaluateAnswer(req, res) {
        try {
            const { questionId, answer } = req.body; // Actually FE sends questionId which corresponds to answerId
            const answerId = questionId;

            const answerDoc = await MockInterviewModel.getAnswerById(answerId);
            if (!answerDoc) {
                return res.status(404).json({ message: 'Question not found' });
            }

            const session = await MockInterviewModel.getSession(answerDoc.session_id);

            // Need to locate job
            const [appRows] = await pool.query('SELECT job_id FROM applications WHERE id = ?', [session.application_id]);
            const jobId = appRows[0].job_id;
            const job = await JobModel.findById(jobId);

            // Call AI Service to evaluate
            const aiResponse = await axios.post(`http://localhost:8001/api/v1/interview/mock/evaluate`, {
                question: answerDoc.question,
                answer: answer,
                job_title: job.title,
                job_description: job.description
            });

            const { score, feedback, perfect_answer, improvements } = aiResponse.data;
            const ai_feedback_json = JSON.stringify({
                feedback: feedback,
                improvements: improvements || [],
                perfect_answer: perfect_answer || ""
            });
            
            let parsedFeedback = feedback || "";
            if (improvements && Array.isArray(improvements) && improvements.length > 0) {
                 parsedFeedback += "\n\n**Gợi ý cải thiện:**\n" + improvements.map(i => "- " + i).join("\n");
            }

            // Update candidate_answer, score, ai_feedback
            await MockInterviewModel.updateAnswer(answerId, answer, score, ai_feedback_json);

            // Fetch all questions to check if interview is completed
            const allQuestions = await MockInterviewModel.getAnswers(session.id);
            const allAnswered = allQuestions.every(q => q.candidate_answer !== null && q.candidate_answer !== "");
            
            if (allAnswered) {
                const totalScore = allQuestions.reduce((acc, q) => acc + (q.score || 0), 0);
                const avgScore = totalScore / allQuestions.length;
                await MockInterviewModel.completeSession(session.id, avgScore);
            }

            res.status(200).json({
                message: 'Answer evaluated successfully',
                evaluation: {
                    score,
                    feedback: parsedFeedback,
                    perfect_answer // returned to frontend for real-time display
                },
                isCompleted: allAnswered
            });
        } catch (error) {
            console.error('Error evaluating answer:', error.response?.data || error.message);
            res.status(500).json({ message: 'Internal server error evaluating answer' });
        }
    }

    static async getInterview(req, res) {
        try {
            const { id } = req.params;
            const session = await MockInterviewModel.getSession(id);
            if (!session) {
                return res.status(404).json({ message: 'Interview not found' });
            }

            const answers = await MockInterviewModel.getAnswers(id);
            const [appRows] = await pool.query('SELECT * FROM applications WHERE id = ?', [session.application_id]);
            const job = await JobModel.findById(appRows[0].job_id);

            res.status(200).json({
                interview: session,
                job: { title: job.title, company_name: job.company_name },
                questions: answers.map(q => {
                    let parsedFeedback = q.ai_feedback || "";
                    let perfectAnswer = "";
                    try {
                        const obj = JSON.parse(q.ai_feedback);
                        parsedFeedback = obj.feedback || "";
                        if (obj.improvements && Array.isArray(obj.improvements) && obj.improvements.length > 0) {
                            parsedFeedback += "\n\n**Gợi ý cải thiện:**\n" + obj.improvements.map(i => "- " + i).join("\n");
                        }
                        perfectAnswer = obj.perfect_answer || "";
                    } catch(e) {
                         // Keep raw string format
                    }
                    return {
                        id: q.id,
                        question: q.question,
                        answer: q.candidate_answer,
                        ai_score: q.score,
                        ai_feedback: parsedFeedback,
                        ai_perfect_answer: perfectAnswer,
                        is_answered: q.candidate_answer ? 1 : 0
                    };
                })
            });
        } catch (error) {
            console.error('Error fetching interview:', error);
            res.status(500).json({ message: 'Internal server error fetching interview' });
        }
    }

    static async getHistory(req, res) {
        try {
            const userId = req.user.id;
            const history = await MockInterviewModel.getHistoryByUser(userId);
            res.status(200).json(history);
        } catch (error) {
            console.error('Error fetching interview history:', error);
            res.status(500).json({ message: 'Internal server error fetching history' });
        }
    }

    static async getInterviewStatus(req, res) {
        try {
            const { jobId } = req.params;
            const userId = req.user.id;
            
            const application = await MockInterviewModel.getApplication(userId, jobId);
            if (!application) {
                 return res.status(200).json({ hasApplication: false, hasInterview: false, status: null });
            }
            
            const session = await MockInterviewModel.getSessionByApplication(application.id);
            if (!session) {
                 return res.status(200).json({ hasApplication: true, hasInterview: false, status: null });
            }
            
            res.status(200).json({ hasApplication: true, hasInterview: true, status: session.status, sessionId: session.id });
        } catch (error) {
            console.error('Error fetching interview status:', error);
            res.status(500).json({ message: 'Internal server error checking interview status' });
        }
    }
}

export default MockInterviewController;
