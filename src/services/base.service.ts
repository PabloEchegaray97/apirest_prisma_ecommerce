import prisma from './prisma/prisma.service';
import { PaginationParams, PaginatedResult } from '../types/paginated';

export abstract class BaseService<T, CreateInput, UpdateInput> {
  protected abstract modelName: string;
  protected selectFields: Record<string, any> = {};
  
  // Configuración de relaciones específica de cada servicio
  protected includeRelations: Record<string, any> = {};

  async findAll(params: PaginationParams = {}): Promise<PaginatedResult<T>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'desc'
    } = params;

    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100);
    const skip = (validPage - 1) * validLimit;

    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Usar includeRelations si están definidas, sino usar selectFields
    const hasSelectFields = Object.keys(this.selectFields).length > 0;
    const hasIncludeRelations = Object.keys(this.includeRelations).length > 0;
    
    let queryOptions: any = {};
    if (hasIncludeRelations) {
      queryOptions.include = this.includeRelations;
    } else if (hasSelectFields) {
      queryOptions.select = this.selectFields;
    }

    try {
      const [data, total] = await Promise.all([
        (prisma as any)[this.modelName].findMany({
          ...queryOptions,
          orderBy,
          skip,
          take: validLimit
        }),
        (prisma as any)[this.modelName].count()
      ]);

      const totalPages = Math.ceil(total / validLimit);

      return {
        data: data as T[],
        pagination: {
          total,
          page: validPage,
          limit: validLimit,
          totalPages,
          hasNext: validPage < totalPages,
          hasPrev: validPage > 1
        }
      };
    } catch (error) {
      console.error(`Error in findAll for ${this.modelName}:`, error);
      throw error;
    }
  }

  async findById(id: number): Promise<T | null> {
    const hasSelectFields = Object.keys(this.selectFields).length > 0;
    const hasIncludeRelations = Object.keys(this.includeRelations).length > 0;
    
    let queryOptions: any = { where: { id } };
    if (hasIncludeRelations) {
      queryOptions.include = this.includeRelations;
    } else if (hasSelectFields) {
      queryOptions.select = this.selectFields;
    }

    return (prisma as any)[this.modelName].findUnique(queryOptions);
  }

  async create(data: CreateInput): Promise<T> {
    const hasSelectFields = Object.keys(this.selectFields).length > 0;
    const hasIncludeRelations = Object.keys(this.includeRelations).length > 0;
    
    let queryOptions: any = { data };
    if (hasIncludeRelations) {
      queryOptions.include = this.includeRelations;
    } else if (hasSelectFields) {
      queryOptions.select = this.selectFields;
    }

    return (prisma as any)[this.modelName].create(queryOptions);
  }

  async update(id: number, data: UpdateInput): Promise<T> {
    const hasSelectFields = Object.keys(this.selectFields).length > 0;
    const hasIncludeRelations = Object.keys(this.includeRelations).length > 0;
    
    let queryOptions: any = { where: { id }, data };
    if (hasIncludeRelations) {
      queryOptions.include = this.includeRelations;
    } else if (hasSelectFields) {
      queryOptions.select = this.selectFields;
    }

    return (prisma as any)[this.modelName].update(queryOptions);
  }

  async delete(id: number): Promise<T> {
    const hasSelectFields = Object.keys(this.selectFields).length > 0;
    const hasIncludeRelations = Object.keys(this.includeRelations).length > 0;
    
    let queryOptions: any = { where: { id } };
    if (hasIncludeRelations) {
      queryOptions.include = this.includeRelations;
    } else if (hasSelectFields) {
      queryOptions.select = this.selectFields;
    }

    return (prisma as any)[this.modelName].delete(queryOptions);
  }
} 