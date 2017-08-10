function tick() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve()
    }, 1000)
  })
}


// [1, 2, 3].forEach(async function (item) {
//   await tick()
//   console.log(item)
// })


async function hehe () {
  const x = [1,2,3]

  for (let index = 0; index < x.length; index++) {
    const url = x[index]
    await tick(url)
    console.log(url)
  }
}

hehe()
