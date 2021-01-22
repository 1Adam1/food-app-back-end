import express from 'express';
import {DatabaseLoader} from './services/loaders/database-loader.service';
import userRouter from './api/user.api';
import shopRouter from './api/shop.api';

DatabaseLoader.load();

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(userRouter);
app.use(shopRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});