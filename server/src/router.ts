import express from 'express';
import cors from 'cors';
import { memeRouter } from './routes/meme.js';
import { memesRouter } from './routes/memes.js';
import { memesByQueryRouter } from './routes/memesByQuery.js';
import { hashtagsRouter } from './routes/hashtags.js';
import { imageRouter } from './routes/image.js';
import { binaryImageRouter } from './routes/binaryimage.js';
import { deleteMemeRouter } from './routes/deletememe.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import compression from 'http-compression';
import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { updateMemeRouter } from './routes/updatememe.js';

if (existsSync('.env')) {
  dotenv.config({ path: '.env' });
} else {
  console.log(
    "🔴 WARNING! Server can't find .env variables! This will lead to errors while working!",
  );
}

if (existsSync('.env.local')) {
  console.log('Using variables from .env.local');
  dotenv.config({ path: '.env.local', override: true });
}

const port = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  }),
);
app.use(express.json({ limit: '20mb' }));
app.use(compression());
app.use('/meme', memeRouter);
app.use('/memes', memesRouter);
app.use('/memesByQuery', memesByQueryRouter);
app.use('/hashtags', hashtagsRouter);
app.use('/image', imageRouter);
app.use('/binaryimage', binaryImageRouter);
app.use('/deletememe', deleteMemeRouter);
app.use('/updatememe', updateMemeRouter);
app.use((_, response) => {
  console.log('🟠 The requested resource was not found.');
  response.sendStatus(404);
});

app.listen(port, (error?: Error) => {
  error
    ? console.error('❌ ' + error)
    : console.log(`🟢 Listening port ${port}`);
});
