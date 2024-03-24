import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('formatters', () => {
  const json1 = getFixturePath('file1.json');
  const json2 = getFixturePath('file2.json');
  const yml1 = getFixturePath('file1.yml');
  const yml2 = getFixturePath('file2.yml');

  const stylishDiff = fs.readFileSync(getFixturePath('stylish.string'), 'utf8');
  const plainDiff = fs.readFileSync(getFixturePath('plain.string'), 'utf8');

  test('stylish', () => {
    expect(genDiff(json1, json2, 'stylish')).toBe(stylishDiff);
    expect(genDiff(yml1, yml2, 'stylish')).toBe(stylishDiff);
  });

  test('plain', () => {
    expect(genDiff(json1, json2, 'plain')).toBe(plainDiff);
    expect(genDiff(yml1, yml2, 'plain')).toBe(plainDiff);
  });
});
