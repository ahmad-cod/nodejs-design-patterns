
process.stdin
    .on('readable', () => {
        console.log('New Data available')
        let chunk

        while ((chunk = process.stdin.read()) !== null) {
            console.log(`Chunk read ${chunk.length} bytes : ${chunk.toString()}`)
        }
    })
    .on('end', () => console.log('End of stream'))