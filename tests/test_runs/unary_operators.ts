import { Ast } from '../../src';
import { TestFn } from '../parsing_test';

export default (test: TestFn) => {
  test(`-3`, Ast.expression(Ast.unary_operation('-', Ast.number('3'))));

  test(`-(4)`, Ast.expression(Ast.unary_operation('-', Ast.number('4'))));

  test(`+4`, Ast.expression(Ast.unary_operation('+', Ast.number('4'))));

  test(
    `-3 ^ 2`,
    Ast.expression(
      Ast.unary_operation('-', Ast.binary_operation(Ast.number('3'), '^', Ast.number('2')))
    )
  );

  test(
    `-5 + 4`,
    Ast.expression(
      Ast.binary_operation(Ast.unary_operation('-', Ast.number('5')), '+', Ast.number('4'))
    )
  );

  test(
    `-5 * -5`,
    Ast.expression(
      Ast.binary_operation(
        Ast.unary_operation('-', Ast.number('5')),
        '*',
        Ast.unary_operation('-', Ast.number('5'))
      )
    )
  );
};
