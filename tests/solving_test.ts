import * as assert from 'assert';
import { Parser, Solver } from '../src';

export type TestFn = (expression: string, expected: number) => void;

export const solving_test: TestFn = (expression: string, result: number): void => {
  const parser = new Parser();

  const solver = new Solver();

  assert.strictEqual(solver.solve(parser.parse(expression)), result);
};
