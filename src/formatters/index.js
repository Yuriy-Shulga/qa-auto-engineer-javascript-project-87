import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const genFormatting = (diff, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(diff);

    case 'plain':
      return plain(diff);

    case 'json':
      return json(diff);

    default:
      throw new Error('The unknown format!');
  }
};

export default genFormatting;
