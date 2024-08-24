import { TestFn } from '../solving_test';

export default (test: TestFn): void => {
  test(`2 + 2`, 4);

  test(`1 + 2 + 3`, 6);

  test(`1 + 2 - 3`, 0);

  test(`5 - 10`, -5);

  test(`2 * 2`, 4);

  test(`6 / 3`, 2);

  test(`3 ^ 2`, 9);

  test(`2 * 2 / 8`, 0.5);

  test(`6 + 2 * 2 - 4 / 2`, 8);

  test(`6 + 3 ^ 2`, 15);

  test(`2 ^ 2 * 3 ^ 2`, 36);

  test(`2 - 1 + 8 / 2 ^ 2 * (1 + 1)`, 5);

  test(`(3 - 1) * (1 + 1)`, 4);

  test(`log(100)`, 2);

  test(`log(100) ^ 2`, 4);

  test(`log(10 ^ 2)`, 2);

  test(`log(200 - 100)`, 2);

  test(`sqrt(4)`, 2);

  test(`sqrt(4 * 4)`, 4);

  test(`-3 ^ 2`, -9);

  test(`(-3) ^ 2`, 9);

  test(`sqrt(4) + log(100)`, 4);
};
