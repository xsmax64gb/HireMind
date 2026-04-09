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
            WHERE j.recruiter_id = ? AND j.status != 'deleted'
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

    static async findAllForAdmin({ search, status, sort = 'desc', limit = 10, offset = 0 }) {
        let whereClause = "WHERE 1=1";
        let queryParams = [];

        if (search) {
            whereClause += ' AND (j.title LIKE ? OR rp.company_name LIKE ? OR u.name LIKE ?)';
            const searchParam = `%${search}%`;
            queryParams.push(searchParam, searchParam, searchParam);
        }

        if (status) {
            whereClause += ' AND j.status = ?';
            queryParams.push(status);
        } else {
            whereClause += ` AND j.status != 'deleted'`;
        }

        const countQuery = `
            SELECT COUNT(*) as total 
            FROM jobs j 
            LEFT JOIN recruiter_profiles rp ON j.recruiter_id = rp.user_id
            LEFT JOIN users u ON j.recruiter_id = u.id
            ${whereClause}
        `;
        const [countRows] = await pool.execute(countQuery, queryParams);
        const total = countRows[0].total;

        let query = `
            SELECT j.*, rp.company_name, u.name as recruiter_name 
            FROM jobs j
            LEFT JOIN recruiter_profiles rp ON j.recruiter_id = rp.user_id
            LEFT JOIN users u ON j.recruiter_id = u.id
            ${whereClause}
        `;

        if (sort === 'asc') {
            query += ' ORDER BY j.created_at ASC';
        } else {
            query += ' ORDER BY j.created_at DESC';
        }

        query += ' LIMIT ? OFFSET ?';
        queryParams.push(limit.toString(), offset.toString());

        const [jobs] = await pool.execute(query, queryParams);
        return { jobs: jobs, total };
    }

    static async updateStatus(id, status) {
        const [result] = await pool.execute('UPDATE jobs SET status = ? WHERE id = ?', [status, id]);
        return result.affectedRows > 0;
    }

    static async adminDelete(id) {
        let connection;
        try {
            connection = await pool.getConnection();

            const [result] = await connection.execute("UPDATE jobs SET status = 'deleted' WHERE id = ?", [id]);

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        } finally {
            if (connection) connection.release();
        }
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

            const [result] = await connection.execute(
                "UPDATE jobs SET status = 'deleted' WHERE id = ? AND recruiter_id = ?",
                [id, recruiter_id]
            );

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }
    static async findByIds(ids) {
        if (!ids || ids.length === 0) return [];
        const placeholders = ids.map(() => '?').join(',');
        const query = `
            SELECT j.*, rp.company_name, rp.company_logo_url 
            FROM jobs j
            LEFT JOIN recruiter_profiles rp ON j.recruiter_id = rp.user_id
            WHERE j.id IN (${placeholders}) AND j.status = 'open'
        `;
        const [rows] = await pool.execute(query, ids);
        
        // Sort by the original order of IDs to maintain recommendation ranking
        // Note: IDs from Chroma might be strings while DB IDs are integers
        const idMap = new Map(rows.map(job => [String(job.id), job]));
        return ids.map(id => idMap.get(String(id))).filter(job => job !== undefined);
    }

    static async getDashboardStats(recruiter_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [candidateCount] = await connection.execute(
                `SELECT COUNT(*) as total FROM applications a JOIN jobs j ON a.job_id = j.id WHERE j.recruiter_id = ?`,
                [recruiter_id]
            );
            const [jobCount] = await connection.execute(
                `SELECT COUNT(*) as total FROM jobs WHERE recruiter_id = ? AND status = 'open'`,
                [recruiter_id]
            );
            const [recentCandidates] = await connection.execute(
                `SELECT a.id, a.status, a.applied_at, u.name as candidate_name, u.email, j.title as job_title, j.id as job_id
                 FROM applications a
                 JOIN users u ON a.user_id = u.id
                 JOIN jobs j ON a.job_id = j.id
                 WHERE j.recruiter_id = ?
                 ORDER BY a.applied_at DESC
                 LIMIT 5`,
                 [recruiter_id]
            );
            const [popularJobs] = await connection.execute(
                `SELECT j.id, j.title, COUNT(a.id) as application_count
                 FROM jobs j
                 LEFT JOIN applications a ON j.id = a.job_id
                 WHERE j.recruiter_id = ?
                 GROUP BY j.id, j.title
                 ORDER BY application_count DESC
                 LIMIT 5`,
                 [recruiter_id]
            );

            return {
                totalCandidates: candidateCount[0].total,
                activeJobs: jobCount[0].total,
                recentCandidates,
                popularJobs
            };
        } finally {
            if (connection) connection.release();
        }
    }
}

export default JobModel;
