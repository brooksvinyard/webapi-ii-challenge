const express = require('express');

const hubsRouter = require('./posts/posts-router.js')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Posts API</h2>
    <p>Welcome to the Posts API</p>
  `);
});

server.use('/api/posts', hubsRouter);

module.exports = server;