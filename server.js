import express from 'express';
import fakeDb from './db/dbAdapter.js';
import cache from './cache/cacheAdapter.js';

const app = express();
const port = 3000;

app.get('/some_resource/:id', express.json(), async (req, res) => {
  const id = req.params.id;
  let content = await cache.getContent(id);

  if (!content) {
    content = await fakeDb.getContent(id);
    res.send({ id , content });

    await cache.setContent(id, content);
    return;
  }

  res.send({ id , content });
});

app.use('*', express.json(), (req, res) => {
  res.status(400);
  res.end();
});

app.listen(port, () => console.log(`Express server is listening on localhost:${port}`));
