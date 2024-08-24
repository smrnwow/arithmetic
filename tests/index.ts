import { Parser } from '../src';
import { test } from './test_runs';

test();

const manual = () => {
  const parser = new Parser();

  const tree = parser.parse(`(log(sqrt(100 ^ 2)))`);

  console.log(JSON.stringify(tree, null, 2));
};

manual();
