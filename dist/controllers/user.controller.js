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
exports.UserController = void 0;
const base_controller_1 = require("./base.controller");
const user_service_1 = require("../services/user.service");
class UserController extends base_controller_1.BaseController {
    constructor() {
        super(...arguments);
        this.service = new user_service_1.UserService();
        this.entityName = 'User';
    }
    // Implementación de métodos abstractos requeridos por BaseController
    validateCreateData(data) {
        const { name, email, password } = data;
        return !!(name && email && password);
    }
    getCreateValidationMessage() {
        return 'Name, email and password are required';
    }
    getDuplicateErrorMessage(error) {
        var _a, _b;
        if ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('email')) {
            return 'Email already in use';
        }
        return 'Duplicate entry';
    }
    filterUpdateData(data) {
        const { name, email, password } = data;
        const updateData = {};
        if (name)
            updateData.name = name;
        if (email)
            updateData.email = email;
        if (password)
            updateData.password = password;
        return updateData;
    }
    // Método específico de login
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({ message: 'Email and password are required' });
                }
                const result = yield this.service.login(email, password);
                return res.status(200).json(result);
            }
            catch (error) {
                console.error('Error logging in:', error);
                if (error.message === 'User not found' || error.message === 'Invalid Password') {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.UserController = UserController;
const userController = new UserController();
exports.default = userController;
