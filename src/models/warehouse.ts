export interface Warehouse {
  id: string;
  name: string;
  code: string;
  address: string;
  capacity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
