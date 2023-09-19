import express from "express";
import cors from 'cors';
import { memeRouter } from './routes/meme.js';
import { memesRouter } from './routes/memes.js';
import { hashtagsRouter } from './routes/hashtags.js';
import { imageRouter } from './routes/image.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import compression from 'http-compression';

const port = 3001;

const app = express();

app.use(cors({
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
}));
app.use(express.json({'limit': '20mb'}));
app.use(compression());
app.use('/meme', memeRouter);
app.use('/memes', memesRouter);
app.use('/hashtags', hashtagsRouter);
app.use('/image', imageRouter);
app.use((_, response) => {
  console.log('🟠 The requested resource was not found.');
  response.sendStatus(404);
});

app.listen(port, (error?: Error) => {
  error ? console.error('❌ ' + error) : console.log(`🟢 Listening port ${port}`);
});