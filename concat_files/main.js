import fs from 'fs'

function concatFiles (srcFiles, destinationFile, cb) {
    const destinationStream = fs.createWriteStream(destinationFile)

    function concatenateFile(index) {
        if (index < srcFiles.length) {
            const sourceReadStream = fs.createReadStream(srcFiles[index])
            sourceReadStream.pipe(destinationStream, { end: false })

            sourceReadStream.on('end', () => {
                destinationStream.write('\n')
                concatenateFile(index + 1)
            })
            sourceReadStream.on('error', error => cb(error))
        }
        else {
            destinationStream.end()
            cb(null)
        }
    }
    
    concatenateFile(0)
}

concatFiles(['file1.txt', 'file2.txt', 'fileC.txt'], 'nile.txt', error => {
    if (error) {
        console.error(`Error occured: ${error.message}`)
    }
    else {
        console.log('files concantened successfully')
    }
})