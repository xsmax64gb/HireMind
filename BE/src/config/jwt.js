import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'skibididopdop';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'skibididopdop';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export const generateToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null; // Invalid or expired token
    }
};

export const generateRefreshToken = (payload, expiresIn = JWT_REFRESH_EXPIRES_IN) => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn });
};

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (error) {
        return null;
    }
};
