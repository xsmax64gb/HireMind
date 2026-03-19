import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || undefined,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

export async function testConnection(retries = 5, delay = 5000) {
    while (retries > 0) {
        try {
            const conn = await pool.getConnection()
            await conn.ping()
            conn.release()
            console.log('Kết nối MySQL thành công!')
            return
        } catch (err) {
            console.error(`Không thể kết nối MySQL. Thử lại sau ${delay/1000}s... (còn ${retries - 1} lần)`)
            retries -= 1
            if (retries === 0) throw err
            await new Promise(res => setTimeout(res, delay))
        }
    }
}

export { pool }