export const otpStore = new Map();

// Helper to clean up expired OTPs (optional but good practice)
export const setOTP = (email, data, expiresIn = 5 * 60 * 1000) => {
    otpStore.set(email, {
        ...data,
        expiresAt: Date.now() + expiresIn
    });
};

export const getOTP = (email) => {
    const data = otpStore.get(email);
    if (!data) return null;
    if (Date.now() > data.expiresAt) {
        otpStore.delete(email);
        return null;
    }
    return data;
};

export const deleteOTP = (email) => {
    otpStore.delete(email);
};
