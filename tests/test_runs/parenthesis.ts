import { Ast } from '../../src';
import { TestFn } from '../parsing_test';

export default (test: TestFn): void => {
  test(`(3)`, Ast.expression(Ast.number('3')));

  test(`(4 / 2)`, Ast.expression(Ast.binary_operation(Ast.number('4'), '/', Ast.number('2'))));

  test(
    `(4 + 5) * (6 - 5)`,
    Ast.expression(
      Ast.binary_operation(
        Ast.binary_operation(Ast.number('4'), '+', Ast.number('5')),
        '*',
        Ast.binary_operation(Ast.number('6'), '-', Ast.number('5'))
      )
    )
  );
};
