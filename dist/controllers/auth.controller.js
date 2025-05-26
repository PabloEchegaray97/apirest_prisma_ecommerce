"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_service_1 = require("../services/user.service");
class AuthController {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({
                        status: 'error',
                        message: 'Email and password are required'
                    });
                }
                const result = yield this.userService.login(email, password);
                return res.status(200).json({
                    status: 'success',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({
                        status: 'error',
                        message: error.message
                    });
                }
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal server error'
                });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userService.create(req.body);
                return res.status(201).json({
                    status: 'success',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({
                        status: 'error',
                        message: error.message
                    });
                }
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal server error'
                });
            }
        });
    }
}
exports.AuthController = AuthController;
