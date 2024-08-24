import { Ast } from '../../src';
import { TestFn } from '../parsing_test';

export default (test: TestFn): void => {
  // multiplication is binary operator
  test(`2 * 2`, Ast.expression(Ast.binary_operation(Ast.number('2'), '*', Ast.number('2'))));

  // division is binary operator
  test(`6 / 3`, Ast.expression(Ast.binary_operation(Ast.number('6'), '/', Ast.number('3'))));

  // multiplication and division are left associative operators
  test(
    `4 * 5 / 2`,
    Ast.expression(
      Ast.binary_operation(
        Ast.binary_operation(Ast.number('4'), '*', Ast.number('5')),
        '/',
        Ast.number('2')
      )
    )
  );

  // multiplicative operators has higher precedence than additive operators
  test(
    `6 + 2 * 2 - 4 / 2`,
    Ast.expression(
      Ast.binary_operation(
        Ast.binary_operation(
          Ast.number('6'),
          '+',
          Ast.binary_operation(Ast.number('2'), '*', Ast.number('2'))
        ),
        '-',
        Ast.binary_operation(Ast.number('4'), '/', Ast.number('2'))
      )
    )
  );
};
