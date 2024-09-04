import * as assert from 'assert';
import { Operations, Tokenizer, Parser, Solver } from '../src';

export type TestFn = (expression: string, expected: number) => void;

export const solving_test: TestFn = (expression: string, result: number): void => {
  const parser = new Parser(new Tokenizer(new Operations()));

  const solver = new Solver(new Operations());

  assert.strictEqual(solver.solve(parser.parse(expression)), result);
};
