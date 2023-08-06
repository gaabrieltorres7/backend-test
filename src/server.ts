import express from 'express';
import { router } from './http/routes';

const app = express();

app.use(router);

app.listen(3000, () => console.log('Server is running!'));
