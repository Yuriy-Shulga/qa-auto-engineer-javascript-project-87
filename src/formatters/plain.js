import _ from 'lodash';

const getNormalizeValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (_.isObject(value)) {
    return '[complex value]';
  }

  return value;
};

export default (diffs) => {
  const iter = (currDiffs, currKey) => {
    const result = currDiffs.flatMap((currDiff) => {
      const {
        key, status, value, children,
      } = currDiff;
      const path = currKey === '' ? `${key}` : `${currKey}.${key}`;

      if (status === 'added') {
        const normalizeValue = getNormalizeValue(value);
        return `Property '${path}' was added with value: ${normalizeValue}`;
      }

      if (status === 'removed') {
        return `Property '${path}' was removed`;
      }

      if (status === 'modified') {
        const normalizeValue1 = getNormalizeValue(value[0]);
        const normalizeValue2 = getNormalizeValue(value[1]);
        return `Property '${path}' was updated. From ${normalizeValue1} to ${normalizeValue2}`;
      }

      if (status === 'nested') {
        return iter(children, path);
      }

      return [];
    });

    return result.join('\n');
  };

  return iter(diffs, '');
};
