"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const validateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET_KEY || 'default_secret_key');
        return res.status(200).json({ message: 'Token validado', decoded });
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.validateJWT = validateJWT;
