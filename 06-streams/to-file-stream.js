import { promises as fs } from 'fs'
import { Writable } from 'stream'
import { dirname } from 'path'
import { mkdirp } from 'mkdirp'

export class ToFileStream extends Writable {
    constructor(options) {
        super({ ...options, objectMode: true })
    }

    _write (chunk, encoding, cb) {
        mkdirp(dirname(chunk.path))
        .then(() => fs.writeFile(chunk.path, chunk.content))
        .then(() => cb())
        .catch(cb)
    }
}

export const tfs = new Writable({
    objectMode: true,
    write (chunk, encoding, cb) {
        mkdirp(dirname(chunk.path))
        .then(() => fs.writeFile(chunk.path, chunk.content))
        .then(() => cb())
        .catch(cb)
    }
})