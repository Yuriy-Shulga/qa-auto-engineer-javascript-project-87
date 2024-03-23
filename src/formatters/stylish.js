import _ from 'lodash';

const replacer = '    ';
const getIndent = (depth) => replacer.repeat(depth);

const operators = {
  added: '+',
  removed: '-',
  unchanged: ' ',
  nested: ' ',
};

export default (diffs) => {
  const getValue = (value, depth) => {
    const currentIndent = getIndent(depth + 1);
    const bracketIndent = getIndent(depth);

    if (!_.isObject(value)) {
      return value;
    }

    const values = Object
      .entries(value)
      .map(([key, currentValue]) => `${currentIndent}${key}: ${getValue(currentValue, depth + 1)}`);

    return `{\n${values.join('\n')}\n${bracketIndent}}`;
  };

  const iter = (currDiffs, depth) => {
    const currentIndent = getIndent(depth - 1);

    const result = currDiffs.map((currDiff) => {
      const {
        key, status, value, children,
      } = currDiff;

      if (status === 'modified') {
        const [oldValue, newValue] = value;
        const add = `${currentIndent}  ${operators.removed} ${key}: ${getValue(oldValue, depth)}`;
        const rm = `${currentIndent}  ${operators.added} ${key}: ${getValue(newValue, depth)}`;
        return `${add}\n${rm}`;
      }

      if (status === 'nested') {
        return `${currentIndent}  ${operators[status]} ${key}: ${iter(children, depth + 1)}`;
      }

      return `${currentIndent}  ${operators[status]} ${key}: ${getValue(value, depth)}`;
    });

    return `{\n${result.join('\n')}\n${currentIndent}}`;
  };

  return iter(diffs, 1);
};
