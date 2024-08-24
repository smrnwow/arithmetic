import { AstNode, ExpressionNode } from './ast';

export class Solver {
  private binary_operations: Record<string, (left: number, right: number) => number> = {
    '+': (left, right) => left + right,
    '-': (left, right) => left - right,
    '*': (left, right) => left * right,
    '/': (left, right) => left / right,
    '^': (left, right) => left ** right,
  };

  private unary_operations: Record<string, (argument: number) => number> = {
    '+': (argument) => +argument,
    '-': (argument) => -argument,
  };

  private functions: Record<string, (argument: number) => number> = {
    log: (argument) => Math.log10(argument),
    sqrt: (argument) => Math.sqrt(argument),
  };

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

      const handler = this.binary_operations[ast_node.operator];

      if (typeof handler === 'undefined') {
        throw new TypeError(`undefined binary operation: "${ast_node.operator}"`);
      }

      return handler(left, right);
    }

    if (ast_node.type === 'UnaryOperation') {
      const argument = this.calculate(ast_node.argument);

      const handler = this.unary_operations[ast_node.operator];

      if (typeof handler === 'undefined') {
        throw new TypeError(`undefined unary operation: "${ast_node.operator}"`);
      }

      return handler(argument);
    }

    if (ast_node.type === 'Function') {
      const argument = this.calculate(ast_node.argument);

      const handler = this.functions[ast_node.name];

      if (typeof handler === 'undefined') {
        throw new TypeError(`undefined function "${ast_node.name}"`);
      }

      return handler(argument);
    }

    return 0;
  }
}
