import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('plain json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const diffpath = getFixturePath('expected_file.json');

  const diff = fs.readFileSync(diffpath, 'utf8');
  expect(genDiff(filepath1, filepath2)).toBe(diff);
});
