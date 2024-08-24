export type AstNode = BinaryOperationNode | UnaryOperationNode | FunctionNode | NumberNode;

export interface ExpressionNode {
  type: 'Expression';
  body: AstNode;
}

export interface BinaryOperationNode {
  type: 'BinaryOperation';
  operator: string;
  left: AstNode;
  right: AstNode;
}

export interface UnaryOperationNode {
  type: 'UnaryOperation';
  operator: string;
  argument: AstNode;
}

export interface FunctionNode {
  type: 'Function';
  name: string;
  argument: AstNode;
}

export interface NumberNode {
  type: 'Number';
  value: number;
}

export class Ast {
  static expression(body: AstNode): ExpressionNode {
    return {
      type: 'Expression',
      body,
    };
  }

  static binary_operation(left: AstNode, operator: string, right: AstNode): BinaryOperationNode {
    return {
      type: 'BinaryOperation',
      operator,
      left,
      right,
    };
  }

  static unary_operation(operator: string, argument: AstNode): UnaryOperationNode {
    return {
      type: 'UnaryOperation',
      operator,
      argument,
    };
  }

  static function(name: string, argument: AstNode): FunctionNode {
    return {
      type: 'Function',
      name,
      argument,
    };
  }

  static number(value: string): NumberNode {
    return {
      type: 'Number',
      value: parseFloat(value),
    };
  }
}
