import express from 'express';
import {DatabaseLoader} from './services/loaders/database-loader';

DatabaseLoader.load();

const app = express();
const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});