import express from 'express';
import routes from './Routes/Routes';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors())

app.use(routes);

app.get('/', (req, res) => { res.status(200).json({ message: 'hello mongo' }) });

export default app;