import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const parser = (filepath, extension) => {
  const data = fs.readFileSync(filepath, 'utf8');

  switch (extension) {
    case '.json':
      return JSON.parse(data);
    default:
      console.log('Расширение не поддерживается!\n');
      throw new Error('an unknown extension');
  }
};

const compare = (obj1, obj2) => {
  const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  const result = keys.map((key) => {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }

    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }

    if (obj1[key] !== obj2[key]) {
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }

    return `    ${key}: ${obj1[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const ext1 = path.extname(filepath1);
  const obj1 = parser(filepath1, ext1);
  const ext2 = path.extname(filepath2);
  const obj2 = parser(filepath2, ext2);

  return compare(obj1, obj2);
};

export default genDiff;
