import { pool } from '../config/db.js';

class JobModel {
    static async create(jobData) {
        const {
            recruiter_id, title, description, requirements, benefits,
            location, employment_type, experience_level, salary_min,
            salary_max, currency, quantity, deadline, status, skills
        } = jobData;

        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            const [result] = await connection.execute(
                `INSERT INTO jobs (
                    recruiter_id, title, description, requirements, benefits,
                    location, employment_type, experience_level, salary_min,
                    salary_max, currency, quantity, deadline, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    recruiter_id, title, description, requirements, benefits,
                    location, employment_type, experience_level, salary_min,
                    salary_max, currency || 'VND', quantity || 1, deadline, status || 'open'
                ]
            );
            const jobId = result.insertId;

            // Handle skills
            if (skills && Array.isArray(skills) && skills.length > 0) {
                for (const skillName of skills) {
                    // Find or create skill
                    const [skillRows] = await connection.execute(
                        'SELECT id FROM skills WHERE name = ?',
                        [skillName]
                    );
                    let skillId;
                    if (skillRows.length > 0) {
                        skillId = skillRows[0].id;
                    } else {
                        const [newSkillResult] = await connection.execute(
                            'INSERT INTO skills (name) VALUES (?)',
                            [skillName]
                        );
                        skillId = newSkillResult.insertId;
                    }

                    // Link skill to job
                    await connection.execute(
                        'INSERT INTO job_skills (job_id, skill_id) VALUES (?, ?)',
                        [jobId, skillId]
                    );
                }
            }

            await connection.commit();
            return jobId;
        } catch (error) {
            if (connection) await connection.rollback();
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }

    static async findAll({ search, location, type, level, limit = 10, offset = 0 }) {
        let whereClause = "WHERE j.status = 'open'";
        const params = [];

        if (search) {
            whereClause += ' AND (j.title LIKE ? OR j.description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        if (location) {
            whereClause += ' AND j.location LIKE ?';
            params.push(`%${location}%`);
        }

        if (type) {
            whereClause += ' AND j.employment_type = ?';
            params.push(type);
        }

        if (level) {
            whereClause += ' AND j.experience_level = ?';
            params.push(level);
        }

        const parsedLimit = parseInt(limit) || 10;
        const parsedOffset = parseInt(offset) || 0;

        const countQuery = `SELECT COUNT(*) as total FROM jobs j ${whereClause}`;
        const [countRows] = await pool.execute(countQuery, params);
        const total = countRows[0].total;

        const query = `
            SELECT j.*, rp.company_name, rp.company_logo_url 
            FROM jobs j
            LEFT JOIN recruiter_profiles rp ON j.recruiter_id = rp.user_id
            ${whereClause}
            ORDER BY j.created_at DESC
            LIMIT ${parsedLimit} OFFSET ${parsedOffset}
        `;
        
        const [rows] = await pool.execute(query, params);
        return { jobs: rows, total };
    }

    static async findByRecruiterId(recruiterId) {
        const [rows] = await pool.execute(
            `SELECT j.*, 
            (SELECT COUNT(*) FROM applications a WHERE a.job_id = j.id) as application_count
            FROM jobs j 
            WHERE j.recruiter_id = ? 
            ORDER BY j.created_at DESC`,
            [recruiterId]
        );
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.execute(
            `SELECT j.*, rp.company_name, rp.company_logo_url, rp.company_description, rp.company_website
            FROM jobs j
            LEFT JOIN recruiter_profiles rp ON j.recruiter_id = rp.user_id
            WHERE j.id = ?`,
            [id]
        );
        const job = rows[0];
        
        if (job) {
            const [skillRows] = await pool.execute(
                `SELECT s.name 
                FROM skills s
                JOIN job_skills js ON s.id = js.skill_id
                WHERE js.job_id = ?`,
                [id]
            );
            job.skills = skillRows.map(row => row.name);
        }
        
        return job;
    }

    static async update(id, recruiterId, jobData) {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            const { skills, ...otherData } = jobData;
            console.log('Update JobData:', jobData);
            console.log('Skills to update:', skills);
            const fields = [];
            const params = [];

            for (const [key, value] of Object.entries(otherData)) {
                if (value !== undefined) {
                    fields.push(`${key} = ?`);
                    params.push(value);
                }
            }

            if (fields.length > 0) {
                const paramsWithId = [...params, id, recruiterId];
                const [result] = await connection.execute(
                    `UPDATE jobs SET ${fields.join(', ')} WHERE id = ? AND recruiter_id = ?`,
                    paramsWithId
                );
                
                if (result.affectedRows === 0 && !skills) {
                    await connection.rollback();
                    return false;
                }
            }

            // Handle skills if provided
            if (skills && Array.isArray(skills)) {
                // Delete existing skills
                await connection.execute(
                    'DELETE FROM job_skills WHERE job_id = ?',
                    [id]
                );

                // Add new skills
                for (const skillName of skills) {
                    // Find or create skill
                    const [skillRows] = await connection.execute(
                        'SELECT id FROM skills WHERE name = ?',
                        [skillName]
                    );
                    let skillId;
                    if (skillRows.length > 0) {
                        skillId = skillRows[0].id;
                    } else {
                        const [newSkillResult] = await connection.execute(
                            'INSERT INTO skills (name) VALUES (?)',
                            [skillName]
                        );
                        skillId = newSkillResult.insertId;
                    }

                    // Link skill to job
                    await connection.execute(
                        'INSERT INTO job_skills (job_id, skill_id) VALUES (?, ?)',
                        [id, skillId]
                    );
                }
            }

            await connection.commit();
            return true;
        } catch (error) {
            if (connection) await connection.rollback();
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }

    static async saveInterviewQuestions(jobId, categorizedQuestions) {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            // Insert new questions - categorizedQuestions is an object like { Technical: [...], Soft Skills: [...] }
            for (const category of Object.keys(categorizedQuestions)) {
                const questions = categorizedQuestions[category];
                if (Array.isArray(questions)) {
                    for (const q of questions) {
                        // Check for duplicates
                        const [existing] = await connection.execute(
                            'SELECT id FROM job_interview_questions WHERE job_id = ? AND question = ?',
                            [jobId, q.question]
                        );

                        if (existing.length === 0) {
                            await connection.execute(
                                `INSERT INTO job_interview_questions (job_id, category, question, suggested_answer, tags)
                                VALUES (?, ?, ?, ?, ?)`,
                                [jobId, category, q.question, q.suggested_answer, JSON.stringify(q.tags || [])]
                            );
                        }
                    }
                }
            }

            await connection.commit();
            return true;
        } catch (error) {
            if (connection) await connection.rollback();
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }

    static async deleteInterviewQuestionsByJobId(jobId) {
        await pool.execute(
            'DELETE FROM job_interview_questions WHERE job_id = ?',
            [jobId]
        );
        return true;
    }

    static async deleteInterviewQuestionById(id) {
        await pool.execute(
            'DELETE FROM job_interview_questions WHERE id = ?',
            [id]
        );
        return true;
    }

    static async getInterviewQuestions(jobId) {
        const [rows] = await pool.execute(
            'SELECT * FROM job_interview_questions WHERE job_id = ? ORDER BY id ASC',
            [jobId]
        );
        return rows;
    }

    static async updateEmbeddingStatus(jobId, chromaId) {
        await pool.execute(
            'UPDATE jobs SET is_embedded = 1, chroma_id = ? WHERE id = ?',
            [chromaId, jobId]
        );
        return true;
    }

    static async delete(id, recruiter_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            // 1. Delete associated interview questions
            await connection.execute(
                'DELETE FROM job_interview_questions WHERE job_id = ?',
                [id]
            );

            // 2. Delete associated job skills
            await connection.execute(
                'DELETE FROM job_skills WHERE job_id = ?',
                [id]
            );

            // 3. Delete applications (if any) or handle them
            // Note: If you don't want to lose application history, you might want 
            // to restrict delete or soft-delete. For now, we'll delete them to maintain DB integrity.
            await connection.execute(
                'DELETE FROM applications WHERE job_id = ?',
                [id]
            );

            // 4. Finally delete the job
            const [result] = await connection.execute(
                'DELETE FROM jobs WHERE id = ? AND recruiter_id = ?',
                [id, recruiter_id]
            );

            if (result.affectedRows === 0) {
                await connection.rollback();
                return false;
            }

            await connection.commit();
            return true;
        } catch (error) {
            if (connection) await connection.rollback();
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }
}

export default JobModel;
