const express = require('express')
const postsRouter = require('./routes/postsRouter.js')
const commentsRouter = require('./routes/commentsRouter.js')
const server = express()
server.use(express.json())
server.use('/api/posts', postsRouter);
server.use('/api/posts', commentsRouter);



server.get('/', (req, res) => {
    res.send('<h2>Posts API </h2>');
  });

  module.exports = server;