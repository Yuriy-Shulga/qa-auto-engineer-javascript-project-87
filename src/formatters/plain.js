const getNormalizeValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (Array.isArray(value)) {
    return '[complex value]';
  }

  return value;
};

export default (diffs) => {
  const iter = (currDiffs, curPath) => {
    const result = currDiffs.flatMap((currDiff) => {
      const [operator, key, value] = currDiff;
      const path = curPath === '' ? key : `${curPath}.${key}`;

      if (operator === '-') {
        return `Property '${path}' was removed`;
      }

      if (operator === '+') {
        const normalizeValue = getNormalizeValue(value);
        return `Property '${path}' was added with value: ${normalizeValue}`;
      }

      if (operator === '-+') {
        const normalizeValue1 = getNormalizeValue(value[0]);
        const normalizeValue2 = getNormalizeValue(value[1]);

        return `Property '${path}' was updated. From ${normalizeValue1} to ${normalizeValue2}`;
      }

      if (!Array.isArray(value)) {
        return [];
      }

      return iter(value, path);
    });

    return result.join('\n');
  };

  return iter(diffs, '');
};
