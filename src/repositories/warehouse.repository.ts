import { Warehouse } from '../models/warehouse';
import { CreateWarehouseDto } from '../dtos/warehouse.dto';

export class WarehouseRepository {
  private static warehouses: Warehouse[] = [
    {
      id: 'wh_01',
      name: 'Austin Distribution Center',
      code: 'TX-AUS-01',
      address: '701 Brazos St, Austin, TX 78701',
      capacity: 500,
      isActive: true,
      createdAt: new Date('2026-01-10T08:00:00Z'),
      updatedAt: new Date('2026-01-10T08:00:00Z'),
    },
    {
      id: 'wh_02',
      name: 'Seattle Transit Hub',
      code: 'WA-SEA-02',
      address: '1918 8th Ave, Seattle, WA 98101',
      capacity: 250,
      isActive: true,
      createdAt: new Date('2026-02-15T09:30:00Z'),
      updatedAt: new Date('2026-02-15T09:30:00Z'),
    },
  ];

  async findById(id: string): Promise<Warehouse | null> {
    const warehouse = WarehouseRepository.warehouses.find(w => w.id === id);
    return warehouse ? { ...warehouse } : null;
  }

  async findByCode(code: string): Promise<Warehouse | null> {
    const warehouse = WarehouseRepository.warehouses.find(w => w.code === code);
    return warehouse ? { ...warehouse } : null;
  }

  async findAll(): Promise<Warehouse[]> {
    return WarehouseRepository.warehouses.map(w => ({ ...w }));
  }

  async create(dto: CreateWarehouseDto): Promise<Warehouse> {
    const newWarehouse: Warehouse = {
      id: `wh_${Math.random().toString(36).substr(2, 9)}`,
      name: dto.name,
      code: dto.code.toUpperCase(),
      address: dto.address,
      capacity: dto.capacity,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    WarehouseRepository.warehouses.push(newWarehouse);
    return { ...newWarehouse };
  }

  async clear(): Promise<void> {
    WarehouseRepository.warehouses = [];
  }
}
