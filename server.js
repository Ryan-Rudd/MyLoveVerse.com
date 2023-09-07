const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const dbClient = require('./middleware/createDbClient');
const { encrypt, decrypt } = require('./security/encyptor');
const router = require('./router/static');
const encryptRequestBody = require('./middleware/mitmEncryption'); // Import the middleware

dotenv.config();
const encryptionKey = process.env.ENCRYPTION_KEY;
const iv = process.env.ENCRYPTION_IV;

if (!encryptionKey || !iv) {
    console.error('Encryption key and/or IV are not set in the environment variables.');
    process.exit(1);
}

const app = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.use('/', router);

let client = dbClient;

async function connectDB() {
    try {
        await client.connect();
        console.log("- DB Connection Established");
        return client;
    } catch (err) {
        console.error("Error connecting to the database:", err);
        process.exit(1);
    }
}

connectDB().then(() => {
    const postRouter = require('./router/postRouter')(client);

    // Use the encryptRequestBody middleware for '/method/post' route
    app.use('/method/post', encryptRequestBody, postRouter);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
