import express from "express";
import cors from 'cors';
import { memeRouter } from './routes/meme';
import { memesRouter } from './routes/memes';
import { hashtagsRouter } from './routes/hashtags';

const port = 3001;

const app = express();

app.listen(port, (error?: Error) => {
  error ? console.error('❌ ' + error) : console.log(`🟢 Listening port ${port}`);
});

app.use(express.json());
app.use(cors());
app.use('/memes', memesRouter);
app.use('/meme', memeRouter);
app.use('/hashtags', hashtagsRouter);
app.use((_, response) => {
  response.sendStatus(404);
});