import { AstNode, ExpressionNode } from './ast';
import { Operations } from './operations';

export class Solver {
  constructor(private operations: Operations) {}

  solve(expression: ExpressionNode): number {
    return this.calculate(expression.body);
  }

  calculate(ast_node: AstNode): number {
    if (ast_node.type === 'Number') {
      return ast_node.value;
    }

    if (ast_node.type === 'BinaryOperation') {
      const left = this.calculate(ast_node.left);

      const right = this.calculate(ast_node.right);

      const operation = this.operations.get_binary(ast_node.operator);

      if (operation === null) {
        throw new TypeError(`undefined binary operation: "${ast_node.operator}"`);
      }

      return operation.handler(left, right);
    }

    if (ast_node.type === 'UnaryOperation') {
      const argument = this.calculate(ast_node.argument);

      const operation = this.operations.get_unary(ast_node.operator);

      if (operation === null) {
        throw new TypeError(`undefined unary operation: "${ast_node.operator}"`);
      }

      return operation.handler(argument);
    }

    if (ast_node.type === 'Function') {
      const argument = this.calculate(ast_node.argument);

      const operation = this.operations.get_function(ast_node.name);

      if (operation === null) {
        throw new TypeError(`undefined function "${ast_node.name}"`);
      }

      return operation.handler(argument);
    }

    return 0;
  }
}
