### Pattern: Streaming aggregation

Use _transform() to process the data and accumulate the partial result, then call this.push() only in the _flush() method to emit the result when all the data has been processed.

* Use a PassThrough stream when you need to provide a placeholder for data that will be read or written in the future.