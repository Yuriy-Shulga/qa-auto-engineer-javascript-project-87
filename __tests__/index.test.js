import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('stylish', () => {
  const diffpath = getFixturePath('stylish.string');
  const diff = fs.readFileSync(diffpath, 'utf8');

  test('stylish json', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    expect(genDiff(filepath1, filepath2)).toBe(diff);
  });

  test('stylish yml', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');

    expect(genDiff(filepath1, filepath2)).toBe(diff);
  });
});

describe('plain', () => {
  const diffpath = getFixturePath('plain.string');
  const diff = fs.readFileSync(diffpath, 'utf8');

  test('plain json', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    expect(genDiff(filepath1, filepath2, 'plain')).toBe(diff);
  });

  test('plain yml', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');

    expect(genDiff(filepath1, filepath2, 'plain')).toBe(diff);
  });
});
