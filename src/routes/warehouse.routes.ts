import { Router } from 'express';
import { WarehouseController } from '../controllers/warehouse.controller';

const router = Router();
const controller = new WarehouseController();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

export default router;
