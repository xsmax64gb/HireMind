import { pool } from '../config/db.js';

class ApplicationModel {
    static async create(appData) {
        const { job_id, user_id, cv_id, match_score, missing_skills, ai_feedback } = appData;
        let connection;
        try {
            connection = await pool.getConnection();
            const [result] = await connection.execute(
                `INSERT INTO applications (job_id, user_id, cv_id, match_score, missing_skills, ai_feedback) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    job_id, 
                    user_id, 
                    cv_id, 
                    match_score || null, 
                    missing_skills ? JSON.stringify(missing_skills) : null, 
                    ai_feedback || null
                ]
            );
            return result.insertId;
        } finally {
            if (connection) connection.release();
        }
    }

    static async checkAlreadyApplied(job_id, user_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                `SELECT id FROM applications WHERE job_id = ? AND user_id = ? LIMIT 1`,
                [job_id, user_id]
            );
            return rows.length > 0;
        } finally {
            if (connection) connection.release();
        }
    }

    static async getByUser(user_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                `SELECT a.*, j.title as job_title, j.status as job_status, rp.company_name, c.file_name as cv_name
                 FROM applications a
                 JOIN jobs j ON a.job_id = j.id
                 LEFT JOIN recruiter_profiles rp ON j.recruiter_id = rp.user_id
                 JOIN cv_files c ON a.cv_id = c.id
                 WHERE a.user_id = ?
                 ORDER BY a.applied_at DESC`,
                [user_id]
            );
            return rows;
        } finally {
            if (connection) connection.release();
        }
    }

    static async deleteByUser(application_id, user_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [result] = await connection.execute(
                `DELETE FROM applications WHERE id = ? AND user_id = ?`,
                [application_id, user_id]
            );
            return result.affectedRows > 0;
        } finally {
            if (connection) connection.release();
        }
    }

    static async getByJobIdWithCandidates(job_id, recruiter_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                `SELECT a.*, u.name as candidate_name, u.email as candidate_email, u.avatar as candidate_avatar,
                        c.cloudinary_url as cv_url, c.file_name as cv_file_name
                 FROM applications a
                 JOIN users u ON a.user_id = u.id
                 JOIN cv_files c ON a.cv_id = c.id
                 JOIN jobs j ON a.job_id = j.id
                 WHERE a.job_id = ? AND j.recruiter_id = ?
                 ORDER BY a.applied_at DESC`,
                [job_id, recruiter_id]
            );
            return rows;
        } finally {
            if (connection) connection.release();
        }
    }

    static async updateStatus(application_id, recruiter_id, status) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [result] = await connection.execute(
                `UPDATE applications a
                 JOIN jobs j ON a.job_id = j.id
                 SET a.status = ?
                 WHERE a.id = ? AND j.recruiter_id = ?`,
                [status, application_id, recruiter_id]
            );
            return result.affectedRows > 0;
        } finally {
            if (connection) connection.release();
        }
    }
}

export default ApplicationModel;
