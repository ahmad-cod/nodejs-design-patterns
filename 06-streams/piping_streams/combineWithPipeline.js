import { createReadStream, createWriteStream } from 'fs'
import { Transform, pipeline } from 'stream'
import { strict as assert } from 'assert'

const streamA = createReadStream('../pattern.md')
const streamB = new Transform({
    transform(chunk, enc, done) {
        this.push(chunk.toString().toUpperCase())
        done()
    }
})
const streamC = createWriteStream('toUpperCase.md')

const pipelineReturn = pipeline(streamA, streamB, streamC, (err) => {
    console.log(err)
})

assert.strictEqual(streamC, pipelineReturn)

const pipeReturn = streamA.pipe(streamB).pipe(streamC)

assert.strictEqual(streamC, pipeReturn)