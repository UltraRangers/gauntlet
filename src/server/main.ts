import { createNestApplication } from './setup';

async function start() {
  const port = process.env.PORT || 3000;
  const app = await createNestApplication();
  await app.nestApp.listen(port, () => { console.log(`server listening at http://localhost:${port}`); });
}

start();
