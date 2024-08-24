import { Ast } from '../../src';
import { TestFn } from '../parsing_test';

export default (test: TestFn): void => {
  // pow is binary operator
  test(`4 ^ 5`, Ast.expression(Ast.binary_operation(Ast.number('4'), '^', Ast.number('5'))));

  // pow is right associative operator
  test(
    `4 ^ 5 ^ 2`,
    Ast.expression(
      Ast.binary_operation(
        Ast.number('4'),
        '^',
        Ast.binary_operation(Ast.number('5'), '^', Ast.number('2'))
      )
    )
  );

  // pow before addition
  test(
    `4 + 5 ^ 2`,
    Ast.expression(
      Ast.binary_operation(
        Ast.number('4'),
        '+',
        Ast.binary_operation(Ast.number('5'), '^', Ast.number('2'))
      )
    )
  );

  // pow before multiplication
  test(
    `4 * 5 ^ 2`,
    Ast.expression(
      Ast.binary_operation(
        Ast.number('4'),
        '*',
        Ast.binary_operation(Ast.number('5'), '^', Ast.number('2'))
      )
    )
  );

  // functions before pow
  test(
    `log(100) ^ 2`,
    Ast.expression(
      Ast.binary_operation(Ast.function('log', Ast.number('100')), '^', Ast.number('2'))
    )
  );

  // parenthesized operations before pow
  test(
    `(2 + 2) ^ 2`,
    Ast.expression(
      Ast.binary_operation(
        Ast.binary_operation(Ast.number('2'), '+', Ast.number('2')),
        '^',
        Ast.number('2')
      )
    )
  );
};
