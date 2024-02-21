import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('plain', () => {
  const diffPath = getFixturePath('plain_result.string');
  const diff = fs.readFileSync(diffPath, 'utf8');

  test('plain json', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    expect(genDiff(filepath1, filepath2)).toBe(diff);
  });

  test('plain yaml', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yaml');

    expect(genDiff(filepath1, filepath2)).toBe(diff);
  });

  test('plain yml', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');

    expect(genDiff(filepath1, filepath2)).toBe(diff);
  });
});

describe('nested', () => {
  const diffpath = getFixturePath('nested_result.string');
  const diff = fs.readFileSync(diffpath, 'utf8');

  test('nested json', () => {
    const filepath1 = getFixturePath('nested1.json');
    const filepath2 = getFixturePath('nested2.json');

    expect(genDiff(filepath1, filepath2)).toBe(diff);
  });
});
