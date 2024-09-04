import { Operations } from './operations';

export interface Token {
  type: TokenType;
  value: string;
}

export enum TokenType {
  Whitespace = 'WHITESPACE',
  Number = 'NUMBER',
  LeftParenthesis = '(',
  RightParentesis = ')',
  AdditiveOperator = 'ADDITIVE_OPERATOR',
  MultiplicativeOperator = 'MULTIPLICATIVE_OPERATOR',
  PowOperator = 'POW_OPERATOR',
  Function = 'FUNCTION',
}

export class Tokenizer {
  constructor(operations: Operations) {
    this.load(operations);
  }

  private tokens: [RegExp, TokenType][] = [
    [/^\s+/, TokenType.Whitespace],
    [/^([0-9]*\.[0-9]+|[0-9]+)/, TokenType.Number],
    [/^\(/, TokenType.LeftParenthesis],
    [/^\)/, TokenType.RightParentesis],
  ];

  private expression = '';

  private cursor = 0;

  init(expression: string): void {
    this.expression = expression;

    this.cursor = 0;
  }

  next_token(): Token {
    if (this.cursor >= this.expression.length) {
      return null;
    }

    const substring = this.expression.slice(this.cursor);

    for (const [regex, token_type] of this.tokens) {
      const token = this.match(regex, substring);

      if (token === null) {
        continue;
      }

      if (token_type === TokenType.Whitespace) {
        return this.next_token();
      }

      return {
        type: token_type,
        value: token,
      };
    }

    throw new SyntaxError(`unexpected token: "${substring[0]}"`);
  }

  private match(regex: RegExp, substring: string): string | null {
    let match = regex.exec(substring);

    if (match === null) {
      return null;
    }

    this.cursor += match[0].length;

    return match[0];
  }

  private load(operations: Operations): void {
    const binary = operations.list_binary();

    this.add_token(
      TokenType.AdditiveOperator,
      binary
        .filter((operation) => operation.precedence === 1)
        .map((operation) => '\\' + operation.operator)
        .join('|')
    );

    this.add_token(
      TokenType.MultiplicativeOperator,
      binary
        .filter((operation) => operation.precedence === 2)
        .map((operation) => '\\' + operation.operator)
        .join('|')
    );

    this.add_token(
      TokenType.PowOperator,
      binary
        .filter((operation) => operation.precedence === 3)
        .map((operation) => '\\' + operation.operator)
        .join('|')
    );

    this.add_token(
      TokenType.Function,
      operations
        .list_functions()
        .map((operation) => operation.name)
        .join('|')
    );
  }

  private add_token(token_type: TokenType, token: string): void {
    this.tokens.push([new RegExp(`^(${token})`), token_type]);
  }
}
