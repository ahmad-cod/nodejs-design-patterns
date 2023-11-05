import { ReplaceStream } from "./replaceStream.js"

const replaceStream = new ReplaceStream('World', 'Ahmad')
replaceStream.on('data', (chunk) => console.log(chunk.toString()))

replaceStream.write('Hello W')
replaceStream.write('orld')
replaceStream.end(() => console.log('All search strings have been replaced'))