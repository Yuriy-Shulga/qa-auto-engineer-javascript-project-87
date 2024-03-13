import plain from './plain.js';
import stylish from './stylish.js';

const genFormatting = (diff, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(diff);

    case 'plain':
      return plain(diff);

    default:
      throw new Error('an unknown format');
  }
};

export default genFormatting;
