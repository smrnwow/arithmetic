import { Tokenizer, Token, TokenType } from './tokenizer';
import { Ast, AstNode, ExpressionNode, FunctionNode, NumberNode } from './ast';

export class Parser {
  constructor(private tokenizer: Tokenizer) {}

  private lookahead: Token | null = null;

  parse(expression: string): ExpressionNode {
    this.tokenizer.init(expression);

    this.lookahead = this.tokenizer.next_token();

    return this.parse_expression();
  }

  private parse_expression(): ExpressionNode {
    const operation = this.parse_operation();

    return Ast.expression(operation);
  }

  private parse_operation(): AstNode {
    return this.parse_additive_operation();
  }

  private parse_additive_operation(): AstNode {
    let left = this.parse_multiplicative_operation();

    while (this.peek() === TokenType.AdditiveOperator) {
      const operator = this.consume(TokenType.AdditiveOperator).value;

      const right = this.parse_multiplicative_operation();

      left = Ast.binary_operation(left, operator, right);
    }

    return left;
  }

  private parse_multiplicative_operation(): AstNode {
    let left = this.parse_unary_operation();

    while (this.peek() === TokenType.MultiplicativeOperator) {
      const operator = this.consume(TokenType.MultiplicativeOperator).value;

      const right = this.parse_unary_operation();

      left = Ast.binary_operation(left, operator, right);
    }

    return left;
  }

  private parse_unary_operation(): AstNode {
    if (this.peek() === TokenType.AdditiveOperator) {
      const operator = this.consume(TokenType.AdditiveOperator).value;

      const argument = this.parse_pow_operation();

      return Ast.unary_operation(operator, argument);
    }

    return this.parse_pow_operation();
  }

  private parse_pow_operation(): AstNode {
    let left = this.parse_primary_operation();

    if (this.peek() === TokenType.PowOperator) {
      const operator = this.consume(TokenType.PowOperator).value;

      const right = this.parse_pow_operation();

      return Ast.binary_operation(left, operator, right);
    }

    return left;
  }

  private parse_primary_operation(): AstNode {
    switch (this.peek()) {
      case TokenType.Function:
        return this.parse_function();
      case TokenType.LeftParenthesis:
        return this.parse_parenthesized_operation();
      default:
        return this.parse_number();
    }
  }

  private parse_function(): FunctionNode {
    const name = this.consume(TokenType.Function).value;

    this.consume(TokenType.LeftParenthesis);

    const argument = this.parse_operation();

    this.consume(TokenType.RightParentesis);

    return Ast.function(name, argument);
  }

  private parse_parenthesized_operation(): AstNode {
    this.consume(TokenType.LeftParenthesis);

    const operation = this.parse_operation();

    this.consume(TokenType.RightParentesis);

    return operation;
  }

  private parse_number(): NumberNode {
    const token = this.consume(TokenType.Number);

    return Ast.number(token.value);
  }

  private peek(): TokenType | null {
    if (this.lookahead === null) {
      return null;
    }

    return this.lookahead.type;
  }

  private consume(token_type: TokenType): Token {
    const token = this.lookahead;

    if (token === null) {
      throw new SyntaxError(`unexpected end, expected: ${token_type}`);
    }

    if (token.type !== token_type) {
      throw new SyntaxError(`unexpected token: ${token.type}, expected: ${token_type}`);
    }

    this.lookahead = this.tokenizer.next_token();

    return token;
  }
}
