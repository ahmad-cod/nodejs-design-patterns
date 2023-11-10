import { Transform } from 'stream'

export class SumProfit extends Transform {
    constructor(options) {
        super({ ...options, objectMode: true })
        this.total = 0
    }

    _transform(record, enc, cb) {
        this.total += Number.parseFloat(record.profit)
        cb()
    }

    _flush(cb) {
        this.push(this.total.toString())
        cb()
    }
}