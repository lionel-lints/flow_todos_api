import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';

const app = express();

app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders,
}));

app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

// 3rd party security stuff:
app.use(helmet());

// connect to db
initializeDb((db) => {
  // internal middleware
  app.use(middleware({ config, db }));
  // api router
  app.use('/api', api({ config, db }));
  app.server.listen((process.env.PORT || config.port), () => {
    /* eslint-disable no-console */
    console.log(`Started on port ${app.server.address().port}`);
  });
});

export default app;
