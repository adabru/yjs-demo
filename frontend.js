Y = require('yjs')
require('y-websockets-client')(Y)
require('y-memory')(Y)
require('y-indexeddb')(Y)
require('y-array')(Y)
require('y-text')(Y)
require('y-map')(Y)


// setup Y framework
Y({
  db: {name: 'indexeddb'},
  connector: {
    name: 'websockets-client',
    room: 'demo',
    url: `http://${location.hostname}:8010`
  },
  share: {fruits: 'Map'},
}).then(y => {
  console.log('Y is initialized')
  var fruits = y.share.fruits
  // for debugging
  window.fruits = fruits

  // add an apple if there is no fruit yet
  if(fruits.keys().length == 0)
    fruits.set('apple', Y.Text)

  // enable creating new fruits
  document.querySelector('button').onclick = () =>
    fruits.set(document.querySelector('input').value, Y.Text)

  updateDom = () => {
    // update dom
    var root = document.querySelector('div')
    root.innerHTML = ''
    for(fruit of fruits.keys()) {
      var fruitName = document.createElement('h4')
      fruitName.innerHTML = fruit
      var fruitChat = document.createElement('textarea')
      var ytextElement = fruits.get(fruit)
      ytextElement.bindTextarea(fruitChat)
      root.appendChild(fruitName)
      root.appendChild(fruitChat)
    }
  }

  fruits.observe(updateDom)

  updateDom()
})
