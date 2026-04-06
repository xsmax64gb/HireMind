import { pool } from '../config/db.js';

class MockInterviewModel {
    static async getApplication(user_id, job_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                'SELECT * FROM applications WHERE user_id = ? AND job_id = ? ORDER BY applied_at DESC LIMIT 1',
                [user_id, job_id]
            );
            return rows[0];
        } finally {
            if (connection) connection.release();
        }
    }

    static async getSessionByApplication(application_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                'SELECT * FROM interview_sessions WHERE application_id = ? ORDER BY created_at DESC LIMIT 1',
                [application_id]
            );
            return rows[0];
        } finally {
            if (connection) connection.release();
        }
    }

    static async createSession(application_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [result] = await connection.execute(
                'INSERT INTO interview_sessions (application_id, status, started_at) VALUES (?, "in_progress", CURRENT_TIMESTAMP)',
                [application_id]
            );
            return result.insertId;
        } finally {
            if (connection) connection.release();
        }
    }

    static async addQuestions(session_id, questions) {
        let connection;
        try {
            connection = await pool.getConnection();
            // We just add questions without answers yet
            for (const q of questions) {
                await connection.execute(
                    'INSERT INTO interview_answers (session_id, question) VALUES (?, ?)',
                    [session_id, q]
                );
            }
        } finally {
            if (connection) connection.release();
        }
    }

    static async getSession(session_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                'SELECT * FROM interview_sessions WHERE id = ?',
                [session_id]
            );
            return rows[0];
        } finally {
            if (connection) connection.release();
        }
    }

    static async getAnswers(session_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                'SELECT * FROM interview_answers WHERE session_id = ? ORDER BY id ASC',
                [session_id]
            );
            return rows;
        } finally {
            if (connection) connection.release();
        }
    }

    static async getAnswerById(answer_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                'SELECT * FROM interview_answers WHERE id = ?',
                [answer_id]
            );
            return rows[0];
        } finally {
            if (connection) connection.release();
        }
    }

    static async updateAnswer(answer_id, candidate_answer, score, ai_feedback) {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.execute(
                'UPDATE interview_answers SET candidate_answer = ?, score = ?, ai_feedback = ? WHERE id = ?',
                [candidate_answer, score, ai_feedback, answer_id]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    static async completeSession(session_id, final_score) {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.execute(
                'UPDATE interview_sessions SET status = "completed", overall_score = ?, finished_at = CURRENT_TIMESTAMP WHERE id = ?',
                [final_score, session_id]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    static async getHistoryByUser(user_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                `SELECT i_s.*, j.title as job_title, j.id as job_id, rp.company_name
                 FROM interview_sessions i_s
                 JOIN applications a ON i_s.application_id = a.id
                 JOIN jobs j ON a.job_id = j.id
                 LEFT JOIN recruiter_profiles rp ON j.recruiter_id = rp.user_id
                 WHERE a.user_id = ? 
                 ORDER BY i_s.created_at DESC`,
                [user_id]
            );
            return rows;
        } finally {
            if (connection) connection.release();
        }
    }
}

export default MockInterviewModel;
