import express from 'express';
import { router } from '../src/http/routes/routes';

require('dotenv').config()

const app = express();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
