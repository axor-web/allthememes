# allthememes

## Find your meme quickly

Have you often tried to find a meme in order to tactfully use it in a chat? This is usually very problematic, because there are countless memes.  This project aims to solve this problem. You can upload memes to a convenient place, add all kinds of hashtags to them. And then - quickly find the right meme by hashtag!

Watch the demonstration:
<a href="https://youtu.be/a-m8FvPzkrs" target="_blank"><img src="https://img.youtube.com/vi/a-m8FvPzkrs/default.jpg" /></a>

You can:

* Find your memes by hashtags
* Download your memes
* Upload your new memes
* Find your memes by prompt for ChatGPT (You will need to specify the OpenAI API key)

## Used technologies

Technologies...

## How to start project locally

1. Install <a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker</a> on your machine
2. Install packages:
   * ```npm i```
3. Start server in 'server' folder using Docker:
   * ```npm run run```
4. Start frontend in 'allthememesapp' folder:
   * ```npm run build && npm run start```
  or
   * ```npm run dev```
5. Open project at <a href="http://localhost:3000/" target="_blank">localhost:3000</a> in your browser
6. Try it!

* EXTRA: If you want to use AI Prompt mode, you must insert your OpenAI API key in server/.env:

```env
MONGO_INITDB_ROOT_USERNAME = admin
MONGO_INITDB_ROOT_PASSWORD = admin
MONGO_INITDB_DATABASE = memes
PORT = 3001
OPENAI_API_KEY = <YOUR KEY HERE>
```

You can fork my project if you want and modify it :3
