"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ user }, secretKey, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
