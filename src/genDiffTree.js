import _ from 'lodash';

const genDiffTree = (obj1, obj2) => {
  const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  return keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!Object.hasOwn(obj1, key)) {
      return { key, status: 'added', value: value2 };
    }

    if (!Object.hasOwn(obj2, key)) {
      return { key, status: 'removed', value: value1 };
    }

    if (value1 === value2) {
      return { key, status: 'unchanged', value: value1 };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, status: 'nested', children: genDiffTree(value1, value2) };
    }

    return { key, status: 'modified', value: [value1, value2] };
  });
};

export default genDiffTree;
