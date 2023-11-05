import { join } from 'path'
import { ToFileStream } from './to-file-stream.js'

const tfs = new ToFileStream()

tfs.write({
    path: join('files', 'file1.txt'),
    content: 'Hello '
})
tfs.write({
    path: join('files', 'file2.txt'),
    content: 'Node.js '
})
tfs.write({
    path: join('files', 'file3.txt'),
    content: 'Streams '
})

tfs.end(() => console.log('All files created and written'))