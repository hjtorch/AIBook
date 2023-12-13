const express = require("express");
const {MongoClient} = require('mongodb');

const app = express();
const port = process.env.PORT || 3001;

// Connect to DB 
const uri = "mongodb://mongodb-1948:27017";
const client = new MongoClient(uri);

async function DBConnection(client) {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

function getUsers(client){
    const database = client.db("BIXI_MAIN");
    const users_collection = database.collection("users");
    return users_collection.find();
}

DBConnection(client).catch(console.error);

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get("/", (req, res) => res.render('main.html'));
app.get("/story", (req, res) => res.render('story.html'));
app.get("/auth", function(req, res) {
    res.render('auth.ejs', { users : [{user_name:"huoju"}, {user_name:"jiaqi"}] })
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

