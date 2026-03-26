import bcrypt from 'bcryptjs';

const password = 'Admin@123'; // Đổi mật khẩu bạn muốn ở đây
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('--- PASSWORD INFORMATION ---');
    console.log('Raw Password:', password);
    console.log('Bcrypt Hash:', hash);
    console.log('\n--- MYSQL QUERY ---');
    const id = '1000000000000001'; // 16 digits
    console.log(`INSERT INTO users (id, name, email, password, role, status) \nVALUES ('${id}', 'Admin Root', 'admin@hiremind.vn', '${hash}', 'admin', 'active');`);
});
