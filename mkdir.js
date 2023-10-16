import { mkdirp } from "mkdirp";

mkdirp('concat_files').then(made =>
    console.log(`made directories, starting with ${made}`)
  )