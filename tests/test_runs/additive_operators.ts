import { Ast, ExpressionNode } from '../../src';

export default (test: (expression: string, result: ExpressionNode) => void) => {
  // addition is binary operator
  test(`2 + 2`, Ast.expression(Ast.binary_operation(Ast.number('2'), '+', Ast.number('2'))));

  // subtraction is binary operator
  test(`6 - 3`, Ast.expression(Ast.binary_operation(Ast.number('6'), '-', Ast.number('3'))));

  // addition and subtraction are left associative operators
  test(
    `4 + 5 - 2`,
    Ast.expression(
      Ast.binary_operation(
        Ast.binary_operation(Ast.number('4'), '+', Ast.number('5')),
        '-',
        Ast.number('2')
      )
    )
  );
};
