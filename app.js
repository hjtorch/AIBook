const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get("/", (req, res) => res.render('main.html'));
app.get("/story", (req, res) => res.render('story.html'));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

