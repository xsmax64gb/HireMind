import { pool } from '../config/db.js';

class CVModel {
    static async create(cvData) {
        const { user_id, cloudinary_url, file_name, extracted_text } = cvData;
        
        let connection;
        try {
            connection = await pool.getConnection();
            const [result] = await connection.execute(
                'INSERT INTO cv_files (user_id, cloudinary_url, file_name, extracted_text) VALUES (?, ?, ?, ?)',
                [user_id, cloudinary_url, file_name, extracted_text]
            );
            return result.insertId;
        } finally {
            if (connection) connection.release();
        }
    }

    static async updateChromaId(id, chroma_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.execute(
                'UPDATE cv_files SET chroma_id = ?, is_embedded = TRUE WHERE id = ?',
                [chroma_id, id]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    static async getByUserId(user_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                'SELECT id, user_id, cloudinary_url, file_name, is_default, created_at, updated_at FROM cv_files WHERE user_id = ? AND is_deleted = 0 ORDER BY created_at DESC',
                [user_id]
            );
            return rows;
        } finally {
            if (connection) connection.release();
        }
    }

    static async getById(id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                'SELECT * FROM cv_files WHERE id = ?',
                [id]
            );
            return rows[0];
        } finally {
            if (connection) connection.release();
        }
    }

    static async delete(id) {
        let connection;
        try {
            connection = await pool.getConnection();
            // Switch to soft delete (setting is_deleted = 1)
            await connection.execute('UPDATE cv_files SET is_deleted = 1 WHERE id = ?', [id]);
        } finally {
            if (connection) connection.release();
        }
    }

    static async getAnalysisCache(cv_id, job_id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                `SELECT match_score, strengths, improvements, summary FROM cv_analysis_cache 
                 WHERE cv_id = ? AND job_id = ?`,
                [cv_id, job_id]
            );
            
            if (rows.length > 0) {
                const row = rows[0];
                return {
                    match_score: row.match_score,
                    strengths: typeof row.strengths === 'string' ? JSON.parse(row.strengths) : row.strengths,
                    improvements: typeof row.improvements === 'string' ? JSON.parse(row.improvements) : row.improvements,
                    summary: row.summary
                };
            }
            return null;
        } finally {
            if (connection) connection.release();
        }
    }

    static async saveAnalysisCache(cacheData) {
        const { cv_id, job_id, user_id, match_score, strengths, improvements, summary } = cacheData;
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.execute(
                `INSERT INTO cv_analysis_cache (cv_id, job_id, user_id, match_score, strengths, improvements, summary)
                 VALUES (?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                 match_score = VALUES(match_score), 
                 strengths = VALUES(strengths),
                 improvements = VALUES(improvements), 
                 summary = VALUES(summary)`,
                [cv_id, job_id, user_id, match_score, JSON.stringify(strengths), JSON.stringify(improvements), summary]
            );
        } finally {
            if (connection) connection.release();
        }
    }
}

export default CVModel;
