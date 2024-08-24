import { Ast } from '../../src';
import { TestFn } from '../parsing_test';

export default (test: TestFn): void => {
  test(`42`, Ast.expression(Ast.number('42')));

  test(`4.5`, Ast.expression(Ast.number('4.5')));
};
