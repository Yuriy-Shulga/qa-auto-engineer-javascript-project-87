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
  const jsonDiff = fs.readFileSync(getFixturePath('json.string'), 'utf8');

  test('stylish', () => {
    expect(genDiff(json1, json2, 'stylish')).toBe(stylishDiff);
    expect(genDiff(yml1, yml2, 'stylish')).toBe(stylishDiff);
  });

  test('plain', () => {
    expect(genDiff(json1, json2, 'plain')).toBe(plainDiff);
    expect(genDiff(yml1, yml2, 'plain')).toBe(plainDiff);
  });

  test('json', () => {
    expect(genDiff(json1, json2, 'json')).toBe(jsonDiff);
    expect(genDiff(yml1, yml2, 'json')).toBe(jsonDiff);
  });
});

describe('default values', () => {
  const text1 = getFixturePath('file1.txt');
  const json1 = getFixturePath('file1.json');
  const json2 = getFixturePath('file2.json');

  const stylishDiff = fs.readFileSync(getFixturePath('stylish.string'), 'utf8');

  test('is an unknown extension', () => {
    const error = () => genDiff(text1, text1);
    expect(error).toThrow(Error);
    expect(error).toThrow('The unknown extension!');
  });

  test('is an unknown format', () => {
    const error = () => genDiff(json1, json2, 'abc');
    expect(error).toThrow(Error);
    expect(error).toThrow('The unknown format!');
  });

  test('is a default format', () => {
    expect(genDiff(json1, json2)).toBe(stylishDiff);
  });
});
