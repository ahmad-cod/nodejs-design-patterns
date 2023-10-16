import { readFile } from 'fs'
import { EventEmitter } from 'events'
function findRegex (files, regex) {
 const emitter = new EventEmitter()
 for (const file of files) {
 readFile(file, 'utf8', (err, content) => {
 if (err) {
 return emitter.emit('error', err)
 }
 emitter.emit('fileread', file)
 const match = content.match(regex)
 if (match) {
 match.forEach(elem => emitter.emit('found', file, elem))
 }
 })
 }
 return emitter
}

findRegex(
    ['fileA.txt', 'fileB.json'],
    /hello \w+/g
   )
    .on('fileread', file => console.log(`${file} was read`))
    .on('found', (file, match) => console.log(`Matched "${match}" in 
   ${file}`))
    .on('error', err => console.error(`Error emitted ${err.message}`))




// import { readFile } from 'fs'
// const cache = new Map()
// function consistentReadAsync (filename, callback) {
//  if (cache.has(filename)) {
//  // deferred callback invocation
//  process.nextTick(() => callback(cache.get(filename)))
//  } else {
//  // asynchronous function
//  readFile(filename, 'utf8', (err, data) => {
//  cache.set(filename, data)
//  callback(data)
//  })
//  }
// }