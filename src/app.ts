import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/user.routes';
import { authRouter } from './routes/auth.routes';
import cors from 'cors';
import { userAddressRouter } from './routes/userAddress.routes';
import { addressRouter } from './routes/address.routes';
import { brandRouter } from './routes/brand.routes';
import { productDiscountRouter } from './routes/productDiscount.routes';
import { productImageRouter } from './routes/productImage.routes';
import { categoryRouter } from './routes/category.routes';
import { productSizeRouter } from './routes/productSize.routes';
import { purchaseOrderRouter } from './routes/purchaseOrder.routes';
import { detailRouter } from './routes/detail.routes';
import { sizeRouter } from './routes/size.routes';
import { typeRouter } from './routes/type.routes';
import { productRouter } from './routes/product.routes';

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const API_PREFIX = process.env.API_V1_PREFIX;

app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/users`, userRouter);
app.use(`${API_PREFIX}/user-addresses`, userAddressRouter);
app.use(`${API_PREFIX}/addresses`, addressRouter);
app.use(`${API_PREFIX}/brands`, brandRouter);
app.use(`${API_PREFIX}/categories`, categoryRouter);
app.use(`${API_PREFIX}/details`, detailRouter);
app.use(`${API_PREFIX}/discounts`, productDiscountRouter);
app.use(`${API_PREFIX}/products`, productRouter);
app.use(`${API_PREFIX}/product-discounts`, productDiscountRouter);
app.use(`${API_PREFIX}/product-images`, productImageRouter);
app.use(`${API_PREFIX}/product-sizes`, productSizeRouter);
app.use(`${API_PREFIX}/purchase-orders`, purchaseOrderRouter);
app.use(`${API_PREFIX}/sizes`, sizeRouter);
app.use(`${API_PREFIX}/types`, typeRouter);


app.get('/', (req, res) => {
    res.json({ 
        status: 'success',
        message: 'API is running 10/10',
        version: '1.0.0'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

export default app; 