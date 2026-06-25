import { WarehouseRepository } from '../repositories/warehouse.repository';
import { CreateWarehouseDto } from '../dtos/warehouse.dto';
import { Warehouse } from '../models/warehouse';

export class WarehouseService {
  private repository = new WarehouseRepository();

  async createWarehouse(dto: CreateWarehouseDto): Promise<Warehouse> {
    // Business rule: Warehouse code must be unique
    const existing = await this.repository.findByCode(dto.code);
    if (existing) {
      const error: any = new Error(`Warehouse with code ${dto.code} already exists`);
      error.status = 409;
      throw error;
    }

    return this.repository.create(dto);
  }

  async getWarehouseById(id: string): Promise<Warehouse> {
    const warehouse = await this.repository.findById(id);
    if (!warehouse) {
      const error: any = new Error(`Warehouse with ID ${id} not found`);
      error.status = 404;
      throw error;
    }
    return warehouse;
  }

  async getAllWarehouses(): Promise<Warehouse[]> {
    return this.repository.findAll();
  }
}
