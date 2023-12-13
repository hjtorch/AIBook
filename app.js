const express = require("express");
const {MongoClient} = require('mongodb');

const app = express();
const port = process.env.PORT || 3001;

// Connect to DB 
async function DBConnection(){
    const uri = "mongodb://mongodb-1948:27017";
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        await  listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

DBConnection().catch(console.error);

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get("/", (req, res) => res.render('main.html'));
app.get("/story", (req, res) => res.render('story.html'));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

