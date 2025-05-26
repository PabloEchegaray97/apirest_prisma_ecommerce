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
exports.BaseController = void 0;
class BaseController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield this.service.findAll();
                return res.status(200).json(entities);
            }
            catch (error) {
                console.error(`Error getting ${this.entityName}s:`, error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const entity = yield this.service.findById(parseInt(id));
                if (!entity) {
                    return res.status(404).json({ message: `${this.entityName} not found` });
                }
                return res.status(200).json(entity);
            }
            catch (error) {
                console.error(`Error getting ${this.entityName}:`, error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                if (!this.validateCreateData(data)) {
                    return res.status(400).json({ message: this.getCreateValidationMessage() });
                }
                const newEntity = yield this.service.create(data);
                return res.status(201).json(newEntity);
            }
            catch (error) {
                console.error(`Error creating ${this.entityName}:`, error);
                // Manejar errores específicos de Prisma
                if (error.code === 'P2002') {
                    return res.status(400).json({ message: this.getDuplicateErrorMessage(error) });
                }
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                // Verificar si la entidad existe
                const existingEntity = yield this.service.findById(parseInt(id));
                if (!existingEntity) {
                    return res.status(404).json({ message: `${this.entityName} not found` });
                }
                const updateData = this.filterUpdateData(data);
                if (Object.keys(updateData).length === 0) {
                    return res.status(400).json({ message: 'No data to update' });
                }
                const updatedEntity = yield this.service.update(parseInt(id), updateData);
                return res.status(200).json(updatedEntity);
            }
            catch (error) {
                console.error(`Error updating ${this.entityName}:`, error);
                // Manejar errores específicos de Prisma
                if (error.code === 'P2002') {
                    return res.status(400).json({ message: this.getDuplicateErrorMessage(error) });
                }
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Verificar si la entidad existe
                const existingEntity = yield this.service.findById(parseInt(id));
                if (!existingEntity) {
                    return res.status(404).json({ message: `${this.entityName} not found` });
                }
                yield this.service.delete(parseInt(id));
                return res.status(200).json({ message: `${this.entityName} deleted successfully` });
            }
            catch (error) {
                console.error(`Error deleting ${this.entityName}:`, error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.BaseController = BaseController;
