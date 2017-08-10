const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const mongodbUrl = 'mongodb://localhost:27017/test';

async function insert () {
  const db = await MongoClient.connect(mongodbUrl);
  const collection = db.collection('test')
  const result = await collection.insertMany([ { a: 1 }, { a: 2 }, { a: 3 }])
  assert.equal(3, result.result.n);
  assert.equal(3, result.ops.length);
  console.log("Inserted 3 documents into the document collection");
  db.close()
}

insert()