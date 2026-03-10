import express from 'express';
import type { Request, Response } from 'express';
import { connectToMongoDb } from '@/db/db';
import env from '@/env';
import { logger } from '@packages/httputils';
import authRoutes from '@/routes/authRoutes/auth.routes';
import fileRoutes from '@/routes/fileuploadRoutes/fileupload.routes'
import { errorHandler } from '@/middlewares/error.middleware';


const app = express();
const PORT = env.PORT

app.get('/', (_req: Request, res: Response) => {
   res.json({ message: 'Storex Backend is running!' });
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/file-upload', fileRoutes);

app.use(errorHandler);

connectToMongoDb(env.DATABASE_URL);

app.listen(PORT, () => {
  logger("INFO", `Server is running on http://localhost:${PORT}`);
});