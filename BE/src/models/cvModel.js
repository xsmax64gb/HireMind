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
                'SELECT id, user_id, cloudinary_url, file_name, is_default, created_at, updated_at FROM cv_files WHERE user_id = ? ORDER BY created_at DESC',
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
            await connection.execute('DELETE FROM cv_files WHERE id = ?', [id]);
        } finally {
            if (connection) connection.release();
        }
    }
}

export default CVModel;
