const express = require('express')
const staticRouter = require('./router/static')
const app = express()

const dbClient = require('./middleware/createDbClient')

const dotenv = require('dotenv');
dotenv.config();

const { encrypt, decrypt } = require('./security/encyptor')

const encryptionKey = process.env.ENCRYPTION_KEY;
const iv = process.env.ENCRYPTION_IV;

let client = dbClient
if (!encryptionKey || !iv) {
  console.error('Encryption key and/or IV are not set in the environment variables.');
  process.exit(1);
}

const encryptData = (text=String) => 
{
    const { encryptedData, tag } = encrypt(text, encryptionKey, Buffer.from(iv, 'hex'));
    return encryptedData
}
const decryptData = (text=String) => 
{
    const decryptedData = decrypt(text, encryptionKey, Buffer.from(iv, 'hex'), tag);
    return decryptedData
}

async function connectDB() {
    await client.connect()
    console.log("- DB Connection Established")
}
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/static'))

app.use(staticRouter)
connectDB().then(()=>{
app.listen(2000, ()=>{console.log("Listening on port 2000")})
})