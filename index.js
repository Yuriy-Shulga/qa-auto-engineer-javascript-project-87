import fs from 'fs';
import path from 'path';

import parser from './src/parsers.js';
import genFormatting from './src/formatters/index.js';
import genDiffTree from './src/genDiffTree.js';

const genDiff = (filepath1, filepath2, format) => {
  const ext1 = path.extname(filepath1);
  const obj1 = parser(fs.readFileSync(filepath1, 'utf8'), ext1);
  const ext2 = path.extname(filepath2);
  const obj2 = parser(fs.readFileSync(filepath2, 'utf8'), ext2);

  return genFormatting(genDiffTree(obj1, obj2), format);
};

export default genDiff;
