import { createServer } from 'http'
import { createWriteStream } from 'fs'
import { createGunzip } from 'zlib'
import { createDecipheriv, randomBytes } from 'crypto'
import { basename, join } from 'path'

const secret = randomBytes(24)

const server = createServer((req, res) => {
    const filename = basename(req.headers['x-filename'])
    const iv = Buffer.from(req.headers['x-initialization-vector'], 'hex')
    const destFilename = join('received_files', filename)

    req
      .pipe(createDecipheriv('aes-192', secret, iv))
      .pipe(createGunzip())
      .pipe(createWriteStream(destFilename))
      .on('finish', () => {
          res.writeHead(201, { 'Content-Type': 'text/plain' })
          res.end('OK\n')
          console.log('file passed successfully')
        })
})
server.listen(3000, () => {
    console.log('listening on port 3000')
})