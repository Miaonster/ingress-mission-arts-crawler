const fs = require('fs')

const dataPath = './ingress-medal-arts.json'

const plain = fs.readFileSync(dataPath)
const obj = JSON.parse(plain)
const lists = {}

obj.lists.forEach((x) => {
  if (x.closed) {
    lists[x.id] = true
  }
})

const cards = obj.cards.filter((x) => !x.closed && !lists[x.idList])

const urls = cards.map((card) => {
  const pattern = /(https:\/\/trello.com\/.*)\n/
  const matches = card.desc.match(pattern)

  if (matches) {
    return matches[1]
  }

  return null
}).filter((x) => x)


fs.writeFile('./ingress-trello-url.json', JSON.stringify(urls), function (err) {
  if (err) {
    console.error('wirteFile error', err)
  }
})