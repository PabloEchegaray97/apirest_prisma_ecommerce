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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validateJWT_1 = require("../middlewares/validateJWT");
const router = express_1.default.Router();
exports.userRouter = router;
router.get('/', validateJWT_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_controller_1.default.getAll(req, res);
}));
router.get('/:id', validateJWT_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_controller_1.default.getById(req, res);
}));
router.put('/:id', validateJWT_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_controller_1.default.update(req, res);
}));
router.delete('/:id', validateJWT_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_controller_1.default.delete(req, res);
}));
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_controller_1.default.create(req, res);
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_controller_1.default.login(req, res);
}));
