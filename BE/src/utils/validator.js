export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
    // Password: ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
};

export const validatePhone = (phone) => {
    // Phone Vietnam format
    const re = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/;
    return re.test(phone);
};

export const validateString = (str, min = 1, max = 255) => {
    if (!str || typeof str !== 'string') return false;
    const len = str.trim().length;
    return len >= min && len <= max;
};

export const validateAge = (dateString, minAge = 18) => {
    if (!dateString) return false;
    const dob = new Date(dateString);
    if (isNaN(dob.getTime())) return false; // Invalid date format
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms); 
    const age = Math.abs(age_dt.getUTCFullYear() - 1970);
    return age >= minAge;
};
