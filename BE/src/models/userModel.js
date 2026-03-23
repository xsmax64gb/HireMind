import { pool } from '../config/db.js';
import { nanoidNumbersOnly } from '../utils/nanoid.js';

class UserModel {
    static async findByEmail(email) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        // We will fetch user + profile info based on role
        const [userRows] = await pool.execute('SELECT id, name, email, avatar, role, status FROM users WHERE id = ?', [id]);
        const user = userRows[0];
        
        if (!user) return null;

        if (user.role === 'candidate') {
            const [profileRows] = await pool.execute('SELECT *, DATE_FORMAT(date_of_birth, "%Y-%m-%d") as date_of_birth FROM candidate_profiles WHERE user_id = ?', [id]);
            return { ...user, ...profileRows[0] };
        } else if (user.role === 'recruiter') {
            const [profileRows] = await pool.execute('SELECT * FROM recruiter_profiles WHERE user_id = ?', [id]);
            return { ...user, ...profileRows[0] };
        }
        
        return user;
    }

    static async create(userData) {
        const { name, email, password, role } = userData;
        
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();
            
            // Insert user
            const userId = nanoidNumbersOnly(); // Generates 16 digits numeric ID
            await connection.execute(
                'INSERT INTO users (id, name, email, password, role, status) VALUES (?, ?, ?, ?, ?, ?)',
                [userId, name, email, password, role, 'active']
            );
            
            // Insert related profile
            if (role === 'candidate') {
                await connection.execute(
                    'INSERT INTO candidate_profiles (user_id) VALUES (?)',
                    [userId]
                );
            } else if (role === 'recruiter') {
                await connection.execute(
                    'INSERT INTO recruiter_profiles (user_id) VALUES (?)',
                    [userId]
                );
            }

            await connection.commit();
            return userId;
        } catch (error) {
            if (connection) await connection.rollback();
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }

    static async updateProfile(id, role, data) {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            // Update users table
            if (data.name || data.email) {
                let userQuery = 'UPDATE users SET ';
                const userParams = [];
                if (data.name) {
                    userQuery += 'name = ?, ';
                    userParams.push(data.name);
                }
                if (data.email) {
                    userQuery += 'email = ?, ';
                    userParams.push(data.email);
                }
                userQuery = userQuery.slice(0, -2) + ' WHERE id = ?';
                userParams.push(id);
                
                await connection.execute(userQuery, userParams);
            }

            // Update profiles table
            if (role === 'candidate') {
                 let profileQuery = 'UPDATE candidate_profiles SET ';
                 const profileParams = [];
                 if (data.phone !== undefined) {
                     profileQuery += 'phone = ?, ';
                     profileParams.push(data.phone);
                 }
                 if (data.bio !== undefined) {
                     profileQuery += 'bio = ?, ';
                     profileParams.push(data.bio);
                 }
                 if (data.address !== undefined) {
                     profileQuery += 'address = ?, ';
                     profileParams.push(data.address);
                 }
                 if (data.date_of_birth !== undefined) {
                     profileQuery += 'date_of_birth = ?, ';
                     profileParams.push(data.date_of_birth);
                 }
                 if (data.gender !== undefined) {
                     profileQuery += 'gender = ?, ';
                     profileParams.push(data.gender);
                 }
                 if (data.position !== undefined) {
                      // Some UI labels might send position, map it to bio or ignore
                 }
                 
                 if (profileParams.length > 0) {
                     profileQuery = profileQuery.slice(0, -2) + ' WHERE user_id = ?';
                     profileParams.push(id);
                     await connection.execute(profileQuery, profileParams);
                 }
            } else if (role === 'recruiter') {
                 let profileQuery = 'UPDATE recruiter_profiles SET ';
                 const profileParams = [];
                 if (data.position !== undefined) {
                     profileQuery += 'position = ?, ';
                     profileParams.push(data.position);
                 }
                 if (data.company_name !== undefined) {
                     profileQuery += 'company_name = ?, ';
                     profileParams.push(data.company_name);
                 }
                 if (data.company_website !== undefined) {
                     profileQuery += 'company_website = ?, ';
                     profileParams.push(data.company_website);
                 }
                 if (data.company_size !== undefined) {
                     profileQuery += 'company_size = ?, ';
                     profileParams.push(data.company_size);
                 }
                 if (data.company_address !== undefined || data.address !== undefined) {
                     profileQuery += 'company_address = ?, ';
                     profileParams.push(data.company_address || data.address);
                 }
                 if (data.company_description !== undefined || data.bio !== undefined) {
                     profileQuery += 'company_description = ?, ';
                     profileParams.push(data.company_description || data.bio);
                 }
                 if (data.company_logo_url !== undefined) {
                     profileQuery += 'company_logo_url = ?, ';
                     profileParams.push(data.company_logo_url);
                 }
                 
                 if (profileParams.length > 0) {
                     profileQuery = profileQuery.slice(0, -2) + ' WHERE user_id = ?';
                     profileParams.push(id);
                     await connection.execute(profileQuery, profileParams);
                 }
            }

            await connection.commit();
        } catch (error) {
            if (connection) await connection.rollback();
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }

    static async updatePassword(email, hashedPassword) {
        await pool.execute(
            'UPDATE users SET password = ? WHERE email = ?',
            [hashedPassword, email]
        );
    }
    
    static async updatePasswordById(id, hashedPassword) {
        await pool.execute(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, id]
        );
    }

    static async findPasswordById(id) {
        const [rows] = await pool.execute('SELECT password FROM users WHERE id = ?', [id]);
        return rows[0];
    }
}

export default UserModel;
