import { Transform } from 'stream'

export class FilterByCountry extends Transform {
    constructor(country, options) {
        super({ ...options, objectMode: true })
        this.country = country
    }

    _transform(record, enc, cb) {
        if (record.country === this.country) {
            this.push(record)
        }
        cb()
    }
}