import { Ast } from '../../src';
import { TestFn } from '../parsing_test';

export default (test: TestFn): void => {
  test(`log(42)`, Ast.expression(Ast.function('log', Ast.number('42'))));

  test(
    `sqrt(42 + 5)`,
    Ast.expression(
      Ast.function('sqrt', Ast.binary_operation(Ast.number('42'), '+', Ast.number('5')))
    )
  );

  test(
    `sqrt(log(100))`,
    Ast.expression(Ast.function('sqrt', Ast.function('log', Ast.number('100'))))
  );

  test(
    `sqrt(2 ^ 2 * 4)`,
    Ast.expression(
      Ast.function(
        'sqrt',
        Ast.binary_operation(
          Ast.binary_operation(Ast.number('2'), '^', Ast.number('2')),
          '*',
          Ast.number('4')
        )
      )
    )
  );
};
