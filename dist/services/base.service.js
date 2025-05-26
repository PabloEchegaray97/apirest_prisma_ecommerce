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
exports.BaseService = void 0;
const prisma_service_1 = __importDefault(require("./prisma.service"));
class BaseService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_service_1.default[this.modelName].findMany({
                select: this.selectFields,
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_service_1.default[this.modelName].findUnique({
                where: { id },
                select: this.selectFields,
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_service_1.default[this.modelName].create({
                data,
                select: this.selectFields,
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_service_1.default[this.modelName].update({
                where: { id },
                data,
                select: this.selectFields,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_service_1.default[this.modelName].delete({
                where: { id },
                select: this.selectFields,
            });
        });
    }
}
exports.BaseService = BaseService;
