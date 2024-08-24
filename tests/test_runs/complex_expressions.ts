import { Ast } from '../../src';
import { TestFn } from '../parsing_test';

export default (test: TestFn): void => {
  test(
    `2 - 1 + 8 / 2 ^ 2 * (1 + 1)`,
    Ast.expression(
      Ast.binary_operation(
        Ast.binary_operation(Ast.number('2'), '-', Ast.number('1')),
        '+',
        Ast.binary_operation(
          Ast.binary_operation(
            Ast.number('8'),
            '/',
            Ast.binary_operation(Ast.number('2'), '^', Ast.number('2'))
          ),
          '*',
          Ast.binary_operation(Ast.number('1'), '+', Ast.number('1'))
        )
      )
    )
  );

  test(
    `(log(sqrt(100 ^ 2)))`,
    Ast.expression(
      Ast.function(
        'log',
        Ast.function('sqrt', Ast.binary_operation(Ast.number('100'), '^', Ast.number('2')))
      )
    )
  );
};
