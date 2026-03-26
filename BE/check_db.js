import { pool } from './src/config/db.js';

async function check() {
    try {
        const [jobs] = await pool.execute('SELECT * FROM jobs');
        console.log('Jobs:', jobs);
        const [skills] = await pool.execute('SELECT * FROM skills');
        console.log('Skills:', skills);
        const [js] = await pool.execute('SELECT * FROM job_skills');
        console.log('Job_Skills:', js);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
check();
