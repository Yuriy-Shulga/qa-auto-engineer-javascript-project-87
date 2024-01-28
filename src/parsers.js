import yaml from 'js-yaml';

const parser = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      console.log('Расширение не поддерживается!\n');
      throw new Error('an unknown extension');
  }
};

export default parser;
