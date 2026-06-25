import express, { Application } from 'express';
import dotenv from 'dotenv';
import warehouseRoutes from './routes/warehouse.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Application = express();

app.use(express.json());

// Routes
app.use('/api/v1/warehouses', warehouseRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
