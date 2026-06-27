import { z } from 'zod';

export default interface CreateWarehouseDto {
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

export const CreateWarehouseSchema = z.object({
  name: z.string(),
  code: z.string(),
  address: z.string(),
  capacity: z.number().int("capacity must be an integer").min(0, "capacity must be greater than or equal to 0"),
});
