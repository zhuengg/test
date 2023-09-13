const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const os = require('os')
// const mime = require('mime')
const mime = {
  map: {
    'html': 'text/html',
    'xhtml': 'application/xhtml+xml',
    'xml': 'text/xml',
    'js': 'application/javascript',
    'wasm': 'application/wasm; charset=UTF-8',
    'map': 'magnus-internal/imagemap',
    'css': 'text/css',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'ico': 'image/vnd.microsoft.icon',
    'mp4': 'video/mpeg'
  },
  getType: function (ext) {
    let conType = this.map[ext]
    return conType || 'text/plain'
  }
}

const PORT = 80
const httpServer = http.createServer()

httpServer.on('request', (req, res) => {
  // console.log(`[receive request] ${req.method} ${req.url}`)
  let urlJson = url.parse(req.url),
    { pathname } = urlJson
  if (/\/$/.test(pathname)) {
    pathname += 'index.html'
  }
  // 根据文件后缀名设置 Content-Type
  let ext = pathname.split('.').pop(),
    contentType = mime.getType(ext)

  // 设置跨域隔离
  // res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
  // res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
  // console.log('process.argv: ', process.argv)
  if (process.argv.includes('--coop')) {
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
  }

  // 读取文件
  fs.readFile(path.resolve(__dirname, pathname.substr(1)), (err, data) => {
    if (err) {
      res.writeHead(404)
      res.end('no such file or directory.')
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': Buffer.byteLength(data)
      })
      res.end(data)
    }
  })
})

httpServer.listen(PORT, () => {
  let IP = '',
    netsIter = Object.values(os.networkInterfaces()).reduce((acc, cur) => acc.concat(cur)).entries()
  while (true) {
    let { value, done } = netsIter.next()
    if (done) {
      break
    }

    let alias = value[1]
    if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
      IP = alias.address
      break
    }
  }
  console.log(`Http server running at :`)
  console.log(`-Local     http://localhost:${PORT}`)
  console.log(`-Network:  http://${IP}:${PORT}`)
})
