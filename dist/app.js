"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = require("./routes/user.routes");
const auth_routes_1 = require("./routes/auth.routes");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
const API_PREFIX = process.env.API_V1_PREFIX || '/api/v1';
app.use(`${API_PREFIX}/users`, user_routes_1.userRouter);
app.use(`${API_PREFIX}/auth`, auth_routes_1.authRouter);
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'API is running 10/10',
        version: '1.0.0'
    });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});
exports.default = app;
