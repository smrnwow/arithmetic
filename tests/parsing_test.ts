import * as assert from 'assert';
import { Parser, ExpressionNode } from '../src';

export type TestFn = (expression: string, expected: ExpressionNode) => void;

export const parsing_test: TestFn = (expression: string, expected: ExpressionNode): void => {
  const parser = new Parser();

  assert.deepStrictEqual(parser.parse(expression), expected);
};
