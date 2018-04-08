import { INestApplication } from '@nestjs/common';
import { Application, Request, Response } from 'express';
import { resolve } from 'path';

import express = require('express');

export async function setupNestApplication(nestApplication: INestApplication) {
  nestApplication.setGlobalPrefix('api');
}

export async function setupExpressApplication(expressApplication: Application) {
  expressApplication.use(express.static(resolve(__dirname, '../../dist/client')));
  expressApplication.get(/^((?!\/api).)*$/g, (request: Request, response: Response) => {
    if (request.path.match(/\.(html|css|png|jpg|ttf|js|ico)$/)) {
      return response.status(404)
        .send('Not found');
    }
    response.sendFile(resolve(__dirname, '../../dist/client/index.html'));
  });
}
