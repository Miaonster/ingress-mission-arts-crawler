const fetch = require('isomorphic-fetch')
const fs = require('fs')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const dataPath = path.resolve(__dirname, '../assets/ingress-trello-url.json')

const plain = fs.readFileSync(dataPath)
const urls = JSON.parse(plain).map((url) => `${url}.json`)
// const x = [urls[1]]

function getOneUrl (url) {
  return fetch(url)
    .then((response) => response.json())
}

function filterCards (data) {
  const lists = {}

  data.lists.forEach((x) => {
    if (x.closed) {
      lists[x.id] = true
    }
  })

  return data.cards.filter((x) => {
    return !x.closed && !lists[x.idList] && !!x.idAttachmentCover
  })
}

const mongodbUrl = 'mongodb://localhost:27017/ingress';

async function upsertCards (cards) {
  const db = await MongoClient.connect(mongodbUrl);
  const collection = db.collection('trello')
  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];
    const query = { id: card.id }
    const options = { upsert: true }
    await collection.update(query, card, options)
  }
  db.close()
}

async function getAndStoreCards (urls) {
  for (let index = 0; index < urls.length; index++) {
    const url = urls[index];
    const data = await getOneUrl(url)
    const cards = filterCards(data)
    await upsertCards(cards)
    console.log(`Inserted ${cards.length} cards to mongodb.`);
  }
}

module.exports = async function () {
  await getAndStoreCards(urls)
}