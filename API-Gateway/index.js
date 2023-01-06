const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3007;

const {
  USERS_API_URL,
  SKILLS_API_URL,
} = require('./URLs');

const users = {
  target: USERS_API_URL,
  changeOrigin: true, 
  logger: console,
};

const skills = {
  target: SKILLS_API_URL,
  changeOrigin: true, 
  logger: console,
};

const usersProxy = createProxyMiddleware(users);
const skillsProxy = createProxyMiddleware(skills);

app.get('/', (req, res) => res.send('Hello Gateway API'));
app.get('/skils', skillsProxy);
app.get('/users', usersProxy);

app.listen(port, () => console.log(`App listening on port ${port}!`));