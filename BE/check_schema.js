import { pool } from './src/config/db.js';

async function check() {
    try {
        const [tables] = await pool.execute('SHOW TABLES');
        console.log('Tables:', tables);
        for (const t of tables) {
            const tableName = Object.values(t)[0];
            const [desc] = await pool.execute(`DESCRIBE ${tableName}`);
            console.log(`Description of ${tableName}:`, desc);
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
check();
