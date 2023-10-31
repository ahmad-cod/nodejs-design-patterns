process.stdin
    .on('readable', () => {
        console.log('New Data available in non-flowing mode')
        let chunk

        while ((chunk = process.stdin.read()) !== null) {
            console.log(`Chunk read ${chunk.length} bytes : ${chunk.toString()}`)
        }
    })
    .on('end', () => console.log('End of stream'))

process.stdin
    .on('data', (chunk) => {
        console.log('New Data available in flowing mode')
        console.log(`Chunk read ${chunk.length} bytes: ${chunk.toString()}`)
    })
    .on('end', () => console.log('End of stream'))