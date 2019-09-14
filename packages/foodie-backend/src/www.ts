#!/usr/bin/env node

import dotenv from 'dotenv';
import http from 'http';
import app from './loaders/express';
import { MongoConnect } from './connection';
import Log from './config/logger';

dotenv.config();

MongoConnect()
  .then(() => {
    Log.info('connection to database successful');
  })
  .catch(error => {
    Log.error(error.message);
  });

const server = http.createServer(app);

const port = process.env.PORT || 3000;

app.set('port', port);

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      Log.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Log.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  Log.info(`server listening on  ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
