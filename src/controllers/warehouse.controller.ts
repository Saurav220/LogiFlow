import { Request, Response, NextFunction } from 'express';
import { WarehouseService } from '../services/warehouse.service';

export class WarehouseController {
  private service = new WarehouseService();

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, code, address, capacity } = req.body;

      // Basic validation for missing fields
      if (!name || !code || !address || capacity === undefined) {
        res.status(400).json({
          status: 'fail',
          message: 'Validation failed',
          errors: {
            missingFields: 'name, code, address, and capacity are required fields',
          },
        });
        return;
      }

      // NOTE: Bug is here. We are not validating that capacity is a positive integer.
      // We just call the service directly.
      const warehouse = await this.service.createWarehouse({
        name,
        code,
        address,
        capacity,
      });

      res.status(201).json({
        status: 'success',
        data: { warehouse },
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const warehouse = await this.service.getWarehouseById(id);
      res.status(200).json({
        status: 'success',
        data: { warehouse },
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const warehouses = await this.service.getAllWarehouses();
      res.status(200).json({
        status: 'success',
        data: { warehouses },
      });
    } catch (error) {
      next(error);
    }
  };
}
