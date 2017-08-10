const schedule = require('node-schedule')
const crawler = require('./crawler')

schedule.scheduleJob('42 * * * *', function () {
  crawler()
    .then(() => {
      console.log('trello trieved successfully')
    }).catch((err) => {
      console.error('trello save file failed', err)
    })
})
