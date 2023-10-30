import fs from 'fs'
import path from 'path'

function listNestedFiles(directoryPath, callback) {
    fs.readdir(directoryPath, (error, files) => {
        if(error) {
            callback(`Error reading directory path: ${error}`)
        } else {
            console.log(`Reading files in ${directoryPath}:`)

            function processFile (index) {
                if (index < files.length) {
                    const file = files[index]
                    const filePath = path.join(directoryPath, file)

                    fs.stat(filePath, (statError, fileStat) => {
                        if (statError) {
                            callback(`Error accessing ${filePath}: ${statError}`)
                        }else {
                            if(fileStat.isDirectory()) {
                                listNestedFiles(filePath, err => {
                                    if(err) {
                                        callback(err)
                                    } else {
                                        processFile(index + 1)
                                    }
                                })
                            } else {
                                console.log(file)
                                processFile(index + 1)
                            }
                        }
                    })
                }
            }
            processFile(0)
        }
        callback(null, files)
    })
}


listNestedFiles('../web_spider', (err, files) => {
    if (err) {
        console.error(`Error occured: ${err.message}`)
    }
    else {
        console.log('files listed successfully')
    }
})