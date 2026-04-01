import { pool } from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();

async function checkData() {
    try {
        console.log("--- JOBS ---");
        const [jobs] = await pool.execute("SELECT id, title, status, chroma_id FROM jobs");
        console.table(jobs);
        
        console.log("--- CV FILES ---");
        const [cvs] = await pool.execute("SELECT id, file_name, chroma_id, is_deleted FROM cv_files");
        console.table(cvs);
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

checkData();
