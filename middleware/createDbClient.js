const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const uri = `mongodb+srv://admin:${process.env.DB_PASS}@myloveverse.7vitjln.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = client