import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('nested', () => {
  const diffpath = getFixturePath('nested_result.string');
  const diff = fs.readFileSync(diffpath, 'utf8');

  test('nested json', () => {
    const filepath1 = getFixturePath('nested1.json');
    const filepath2 = getFixturePath('nested2.json');

    expect(genDiff(filepath1, filepath2)).toBe(diff);
  });

  test('nested yml', () => {
    const filepath1 = getFixturePath('nested1.yml');
    const filepath2 = getFixturePath('nested2.yml');

    expect(genDiff(filepath1, filepath2)).toBe(diff);
  });
});
