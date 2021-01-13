import express from 'express';
import {connectMongoose} from './mongoose';

connectMongoose();

const app = express();
const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});