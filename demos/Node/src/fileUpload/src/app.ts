import path from 'path';
import fs from 'fs-extra';
import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import multiparty from 'multiparty';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { PUBLIC_DIR } from './utils';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/upload', async (req: Request, res: Response, next: NextFunction) => {
  const form = new multiparty.Form();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(err);
    }
    console.log(fields, files.chunk);
    const [filename] = fields.filename;
    const [chunk] = files.chunk;
    await fs.move(chunk.path, path.resolve(PUBLIC_DIR, filename), {
      overwrite: true,
    });
    res.json({
      success: true,
    });
    // setTimeout(() => {
    //   res.json({
    //     success: true,
    //   });
    // }, 3000);
  });
});
app.post('/getTest', async (_: Request, res: Response) => {
  console.log('----');
  setTimeout(() => {
    res.json({
      success: true,
    });
  }, 10 * 100);
});
app.use((_req, _res, next) => {
  next(createError(404));
});
app.use((error: any, _: Request, res: Response) => {
  res.status(error.status || INTERNAL_SERVER_ERROR);
  res.json({
    success: false,
    error,
  });
});

export default app;
