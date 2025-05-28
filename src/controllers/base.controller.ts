import { Request, Response } from 'express';
import { BaseService } from '../services/base.service';
import { PaginationParams } from '../types/paginated';

export abstract class BaseController<T, CreateInput, UpdateInput> {
    protected abstract service: BaseService<T, CreateInput, UpdateInput>;
    protected abstract entityName: string;

    async getAll(req: Request, res: Response) {
        try {
            // Extraer parámetros de paginación de la query
            const paginationParams: PaginationParams = {
                page: req.query.page ? parseInt(req.query.page as string) : 1,
                limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
                sortBy: req.query.sortBy as string || 'id',
                sortOrder: req.query.sortOrder as 'asc' | 'desc' || 'desc'
            };

            const result = await this.service.findAll(paginationParams);
            return res.status(200).json(result);
        } catch (error) {
            console.error(`Error getting ${this.entityName}s:`, error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const entity = await this.service.findById(parseInt(id));
            if (!entity) {
                return res.status(404).json({ message: `${this.entityName} not found` });
            }
            return res.status(200).json(entity);
        } catch (error) {
            console.error(`Error getting ${this.entityName}:`, error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            // validación básica: que el body no esté vacío
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).json({ message: 'Request body cannot be empty' });
            }
            const newEntity = await this.service.create(data);
            return res.status(201).json(newEntity);
        } catch (error: any) {
            console.error(`Error creating ${this.entityName}:`, error);
            // manejar errores específicos de Prisma
            if (error.code === 'P2002') {
                return res.status(400).json({ message: 'Duplicate entry' });
            }
            if (error.code === 'P2003') {
                return res.status(400).json({ message: 'Foreign key constraint violation - Referenced entity does not exist' });
            }
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            // verificar si la entidad existe
            const existingEntity = await this.service.findById(parseInt(id));
            if (!existingEntity) {
                return res.status(404).json({ message: `${this.entityName} not found` });
            }
            // filtrar datos vacíos de forma genérica
            const updateData: any = {};
            for (const [key, value] of Object.entries(data)) {
                if (value !== undefined && value !== null && value !== '') {
                    updateData[key] = value;
                }
            }
            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({ message: 'No data to update' });
            }
            const updatedEntity = await this.service.update(parseInt(id), updateData);
            return res.status(200).json(updatedEntity);
        } catch (error: any) {
            console.error(`Error updating ${this.entityName}:`, error);
            // manejar errores específicos de Prisma
            if (error.code === 'P2002') {
                return res.status(400).json({ message: 'Duplicate entry' });
            }
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            // verificar si la entidad existe
            const existingEntity = await this.service.findById(parseInt(id));
            if (!existingEntity) {
                return res.status(404).json({ message: `${this.entityName} not found` });
            }
            await this.service.delete(parseInt(id));
            return res.status(200).json({ message: `${this.entityName} deleted successfully` });
        } catch (error) {
            console.error(`Error deleting ${this.entityName}:`, error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
} 