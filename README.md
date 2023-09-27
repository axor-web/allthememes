# allthememes

## Find your meme quickly

Have you often tried to find a meme in order to tactfully use it in a chat? This is usually very problematic, because there are countless memes.  This project aims to solve this problem. You can upload memes to a convenient place, add all kinds of hashtags to them. And then - quickly find the right meme by hashtag!

Watch the demonstration:

<a href="https://youtu.be/a-m8FvPzkrs" target="_blank"><img src="https://img.youtube.com/vi/a-m8FvPzkrs/default.jpg" /></a>

You can:

* Find your memes by hashtags
* Download your memes
* Upload your new memes
* Delete your memes
* Edit your memes
* Find your memes by prompt for ChatGPT (You will need to specify the OpenAI API key)

## Used technologies:

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
</br>
![MongoDB](https://img.shields.io/badge/mongodb-000000?style=for-the-badge&logo=mongodb&logoColor=green)
![Node.js](https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=nodedotjs&logoColor=green)
![Express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=green)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## How to start project locally

1. Install <a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker</a> on your machine
2. Install packages and husky:
   * ```npm i```
   * ```npm run prepare```
3. Start server in 'server' folder using Docker:
   * ```npm run run```
4. Start frontend in 'allthememesapp' folder:
   * ```npm run build && npm run start```
   * or
   * ```npm run dev```
5. Open project at <a href="http://localhost:3000/" target="_blank">localhost:3000</a> in your browser
6. Try it!

### EXTRA

If you want to use AI Prompt mode, you must insert your OpenAI API key in server/.env:

```env
MONGO_INITDB_ROOT_USERNAME = admin
MONGO_INITDB_ROOT_PASSWORD = admin
MONGO_INITDB_DATABASE = memes
PORT = 3001
OPENAI_API_KEY = <YOUR KEY HERE>
```

You can fork my project if you want and modify it :3
