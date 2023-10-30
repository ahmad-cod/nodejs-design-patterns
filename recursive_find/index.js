import fs from 'fs/promises';
import path from 'path';

async function recursiveFind(dir, keyword) {
  const results = [];

  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      const subResults = await recursiveFind(filePath, keyword);
      results.push(...subResults);
    } else if (stats.isFile()) {
      const data = await fs.readFile(filePath, 'utf8');
      if (data.includes(keyword)) {
        results.push(file);
      }
    }
  }

  return results;
}

// Example usage:
recursiveFind('../web_spider', 'I')
  .then((result) => console.log(result))
  .catch((err) => console.error(err))