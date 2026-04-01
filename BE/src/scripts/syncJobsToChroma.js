import mysql from 'mysql2/promise';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8001';

async function syncAllJobs() {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT
    });

    console.log("Connected to MySQL. Fetching all open jobs...");

    try {
        const [rows] = await connection.execute("SELECT id, title, description, requirements, recruiter_id FROM jobs WHERE status = 'open'");
        console.log(`Found ${rows.length} open jobs to sync.`);

        for (const job of rows) {
            console.log(`Syncing Job #${job.id}: ${job.title}...`);
            try {
                const response = await axios.post(`${AI_SERVICE_URL}/api/v1/job/embed`, {
                    job_id: job.id.toString(),
                    job_title: job.title,
                    job_description: job.description,
                    requirements: job.requirements || '',
                    recruiter_id: job.recruiter_id.toString()
                });
                
                if (response.status === 200 || response.status === 201) {
                    console.log(`- Job #${job.id} embedded successfully.`);
                    // Optional: update chroma_id in DB if you have that column
                    await connection.execute("UPDATE jobs SET chroma_id = ? WHERE id = ?", [job.id.toString(), job.id]);
                }
            } catch (err) {
                console.error(`- Failed to sync Job #${job.id}:`, err.message);
            }
        }
    } catch (err) {
        console.error("Error during sync:", err);
    } finally {
        await connection.end();
        console.log("Sync completed.");
    }
}

syncAllJobs();
