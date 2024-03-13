import _ from 'lodash';

const genDiffTree = (obj1, obj2) => {
  const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  return keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return _.isObject(obj2[key])
        ? ['+', key, genDiffTree(obj2[key], obj2[key])]
        : ['+', key, obj2[key]];
    }

    if (!Object.hasOwn(obj2, key)) {
      return _.isObject(obj1[key])
        ? ['-', key, genDiffTree(obj1[key], obj1[key])]
        : ['-', key, obj1[key]];
    }

    if (obj1[key] === obj2[key] && !_.isObject(obj1[key])) {
      return [' ', key, obj1[key]];
    }

    if (!_.isObject(obj1[key]) && !_.isObject(obj2[key])) {
      return ['-+', key, [obj1[key], obj2[key]]];
    }

    if (!_.isObject(obj1[key])) {
      return ['-+', key, [obj1[key], genDiffTree(obj2[key], obj2[key])]];
    }

    if (!_.isObject(obj2[key])) {
      return ['-+', key, [genDiffTree(obj1[key], obj1[key]), obj2[key]]];
    }

    return [' ', key, genDiffTree(obj1[key], obj2[key])];
  });
};

export default genDiffTree;
