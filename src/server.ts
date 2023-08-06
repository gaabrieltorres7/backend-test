import express from 'express';
import { router } from '../src/http/routes/routes';

const app = express();

app.use(router);

app.listen(3000, () => console.log('Server is running!'));
