import { promisify } from 'util';
import { readdir as _readdir, stat as _stat } from 'fs';
import { join } from 'path';

const readdir = promisify(_readdir);
const stat = promisify(_stat);

async function listNestedFiles(directoryPath) {
    try {
        const files = await readdir(directoryPath);
        console.log(`Reading files in ${directoryPath}:`);

        for (const file of files) {
            const filePath = join(directoryPath, file);
            const fileStat = await stat(filePath);

            if (fileStat.isDirectory()) {
                await listNestedFiles(filePath);
            } else {
                console.log(file);
            }
        }

        return files;
    } catch (error) {
        throw new Error(`Error reading directory path: ${error}`);
    }
}

// Usage:
listNestedFiles('../')
    .then((files) => {
        console.log('All files processed:', files);
    })
    .catch((error) => {
        console.error(error);
    });




// import fs from 'fs'
// import path from 'path'

// function listNestedFiles(directoryPath, callback) {
//     fs.readdir(directoryPath, (error, files) => {
//         if(error) {
//             callback(`Error reading directory path: ${error}`)
//         } else {
//             console.log(`Reaing files in ${directoryPath}:`)

//             function processFile (index) {
//                 if (index < files.length) {
//                     const file = files[index]
//                     const filePath = path.join(directoryPath, file)

//                     fs.stat(filePath, (statError, fileStat) => {
//                         if (statError) {
//                             callback(`Error accessing ${filePath}: ${statError}`)
//                         }else {
//                             if(fileStat.isDirectory()) {
//                                 listNestedFiles(filePath, err => {
//                                     if(err) {
//                                         callback(err)
//                                     } else {
//                                         processFile(index + 1)
//                                     }
//                                 })
//                             } else {
//                                 console.log(file)
//                                 processFile(index + 1)
//                             }
//                         }
//                     })
//                 }
//             }
//             processFile(0)
//         }
//         callback(null, files)
//     })
// }











// listNestedFiles('../', (err, files) => {
//     if (err) {
//         console.error(`Error occured: ${err.message}`)
//     }
//     else {
//         console.log('files listed successfully')
//     }
// })