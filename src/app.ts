import express from 'express';
import {DatabaseLoader} from './services/loaders/database-loader.service';
import userRouter from './api/user.api';
import shopRouter from './api/shop.api';
import productRouter from './api/product.api';
import productOfferRouter from './api/product-offer.api';

DatabaseLoader.load();

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(userRouter);
app.use(shopRouter);
app.use(productRouter);
app.use(productOfferRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});