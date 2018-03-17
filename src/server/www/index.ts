import { resolve } from 'path';

import express = require('express');

import { createNestApplication } from '../main';

async function start() {
  const port = process.env.PORT || 3000;
  const app = await createNestApplication();
  setupClient(app.expressApp);
  await app.nestApp.listen(port, () => { console.log(`server listening at http://localhost:${port}`); });
}

function setupClient(expressApp: express.Application) {
  expressApp.use(express.static(resolve(__dirname, '../../dist/client')));
  expressApp.get('*', (request: express.Request, response: express.Response) => {
    if (request.path.match(/\.(html|css|png|jpg|ttf|js|ico)$/)) {
      return response.status(404)
        .send('Not found');
    }
    response.sendFile(resolve(__dirname, '../../dist/client/index.html'));
  });
}

start();
