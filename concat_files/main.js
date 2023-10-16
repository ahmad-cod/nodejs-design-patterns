import fs from 'fs'

function concatFiles (src, dest) {
    fs.writeFile(dest, '', err => {
        if (err) throw err
    })
    
    src.map((file) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) throw err
        fs.appendFile(dest, `${data} \n`, err => {
            if (err) throw err

            console.log(file, 'appended successfully')
        })
    })
    })
}

concatFiles(['fileA.txt', 'fileB.txt', 'fileC.txt'], 'new_file.txt')

fs.unlink('fileB.txt', (err) => {
    if (err) throw err

    console.log('fileB deleted successfully')
})