export default (diffs) => {
  const iter = (currDiffs, depth = 0) => {
    const space = '    '.repeat(depth);
    const closeBracketSpace = '    '.repeat(depth);
    const result = currDiffs.map((currDiff) => {
      const [operator, key, value] = currDiff;

      if (!Array.isArray(value)) {
        return `${space}  ${operator} ${key}: ${value}`;
      }

      if (operator === '-') {
        return `${space}  ${operator} ${key}: ${iter(value, depth + 1)}`;
      }

      if (operator === '+') {
        return `${space}  ${operator} ${key}: ${iter(value, depth + 1)}`;
      }

      if (operator === ' ') {
        return `${space}  ${operator} ${key}: ${iter(value, depth + 1)}`;
      }

      if (!Array.isArray(value[0]) && !Array.isArray(value[1])) {
        return `${space}  ${operator[0]} ${key}: ${(value[0])}\n${space}  ${operator[1]} ${key}: ${(value[1])}`;
      }

      if (!Array.isArray(value[0])) {
        const before = `${space}  ${operator[0]} ${key}: ${(value[0])}`;
        const after = `${space}  ${operator[1]} ${key}: ${iter(value[1], depth + 1)}`;
        return `${before}\n${after}`;
      }

      return `${space}  ${operator[0]} ${key}: ${iter(value[0], depth + 1)}\n${space}  ${operator[1]} ${key}: ${(value[1])}`;
    });

    return `{\n${result.join('\n')}\n${closeBracketSpace}}`;
  };

  return iter(diffs, 0);
};
