export interface CreateWarehouseDto {
  name: string;
  code: string;
  address: string;
  capacity: number;
}

export interface UpdateWarehouseDto {
  name?: string;
  code?: string;
  address?: string;
  capacity?: number;
  isActive?: boolean;
}
