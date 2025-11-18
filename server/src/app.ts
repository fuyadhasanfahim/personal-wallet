import 'dotenv/config';
import express, {
    type Application,
    type Request,
    type Response,
} from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';

const app: Application = express();

app.use(
    cors({
        origin: [process.env.FRONTEND_URL as string],
        credentials: true,
    })
);

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.use('/', (_req: Request, res: Response) => {
    res.send('🚀 Server is running successfully.');
});

export default app;
