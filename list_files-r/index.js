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
await listNestedFiles('../web_spider')





    // .then((files) => {
    //     console.log('All files processed:', files);
    // })
    // .catch((error) => {
    //     console.error(error);
    // });