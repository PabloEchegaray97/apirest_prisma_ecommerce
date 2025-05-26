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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const base_service_1 = require("./base.service");
const prisma_service_1 = __importDefault(require("./prisma.service"));
const passService_1 = require("./passService");
const authService_1 = require("./authService");
class UserService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        this.modelName = 'user';
        this.selectFields = {
            id: true,
            name: true,
            email: true,
            password: false,
        };
    }
    // Override del método create para manejar el hash de la contraseña
    create(data) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.password) {
                throw new Error('Password is required');
            }
            const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
            return _super.create.call(this, Object.assign(Object.assign({}, data), { password: hashedPassword }));
        });
    }
    // Override del método update para manejar el hash de la contraseña
    update(id, data) {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let updateData = Object.assign({}, data);
            if (data.password) {
                const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
                updateData = Object.assign(Object.assign({}, updateData), { password: hashedPassword });
            }
            return _super.update.call(this, id, updateData);
        });
    }
    // Método específico para encontrar usuario por email (necesario para login)
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_service_1.default.user.findFirst({
                where: {
                    email: {
                        equals: email,
                        mode: 'insensitive'
                    }
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    role: true,
                },
            });
        });
    }
    // Método específico de login
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.findByEmail(email);
                if (!user) {
                    throw new Error('User not found');
                }
                if (!user.password) {
                    throw new Error('Invalid credentials');
                }
                const passwordMatch = yield (0, passService_1.validatePass)(password, user.password);
                if (!passwordMatch) {
                    throw new Error('Invalid Password');
                }
                const token = (0, authService_1.generateToken)({
                    id: user.id,
                    email: user.email,
                    role: user.role
                });
                const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
                return { user: userWithoutPassword, token };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                throw new Error('Error logging in');
            }
        });
    }
}
exports.UserService = UserService;
