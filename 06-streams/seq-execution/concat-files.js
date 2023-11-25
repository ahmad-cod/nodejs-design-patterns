import { Readable, Transform } from 'stream'
import { createReadStream, createWriteStream } from 'fs'

const concatFiles = (dest, files) => {
    return new Promise ((resolve, reject) => {
        const destWriteStream = createWriteStream(dest)
    
        Readable.from(files)
            .pipe(new Transform({
                objectMode: true,
                transform(fileName, _, done) {
                    const src = createReadStream(fileName)
                    src.pipe(destWriteStream, { end: false })
                    src.on('error', done)
                    src.on('end', done)
                }
            }))
            .on('error', reject)
            .on('finish', () => {
                destWriteStream.end()
                resolve()
            })
    })
}