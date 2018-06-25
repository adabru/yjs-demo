http = require('http')
cp = require('child_process')
url = require('url')
fs = require('fs')

if(!process.version.startsWith('v8'))
  return console.log(`only node v8 supported because of native modules in y-websockets-server; current version is ${process.version}`)

cp.spawn('node', [require.resolve('y-websockets-server/src/server.js'), '--port', 8010, '--db', 'leveldb'], {stdio:'inherit'})

http.createServer( (req, res) => {
  if(req.url == '/') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(`<div></div><input/><button>create</button><script src="app.js"></script>`)
  } else {
    // serve raw file
    fs.createReadStream(`.${req.url}`)
      .on('error', () => {
        res.writeHead(404)
        res.end('not found') })
      .on('open', () => {
        res.writeHead(200)})
      .pipe(res)
  }
}).listen(8011, 'localhost', () => console.log(`http-server running at http://localhost:8011/`))
