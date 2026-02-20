import 'dotenv/config';
import './clients/db';
import express from 'express';
import Boom from 'boom';
import cors from 'cors';
import limiter from './rate-limiter';
import routes from './routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(routes);

app.use((req, res, next) => {
  return next(Boom.notFound('This route does not exist.'));
});

app.use((err, req, res, next) => {
  console.log(err);

  if (err) {
    if (err.output) {
      return res.status(err.output.statusCode || 500).json(err.output.payload);
    }

    return res.status(500).json(err);
  }
});

app.listen(4000, () => console.log('Server is up!'));
