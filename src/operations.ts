export type Operation = BinaryOperation | UnaryOperation | FunctionOperation;

export interface BinaryOperation {
  type: 'BinaryOperation';
  operator: string;
  precedence: number;
  handler: (left: number, right: number) => number;
}

export interface UnaryOperation {
  type: 'UnaryOperation';
  operator: string;
  handler: (argument: number) => number;
}

export interface FunctionOperation {
  type: 'FunctionOperation';
  name: string;
  handler: (argument: number) => number;
}

export class Operations {
  constructor() {
    const operations: Operation[] = [
      {
        type: 'BinaryOperation',
        operator: '+',
        precedence: 1,
        handler: (left, right) => left + right,
      },
      {
        type: 'BinaryOperation',
        operator: '-',
        precedence: 1,
        handler: (left, right) => left - right,
      },
      {
        type: 'BinaryOperation',
        operator: '*',
        precedence: 2,
        handler: (left, right) => left * right,
      },
      {
        type: 'BinaryOperation',
        operator: '/',
        precedence: 2,
        handler: (left, right) => left / right,
      },
      {
        type: 'BinaryOperation',
        operator: '^',
        precedence: 3,
        handler: (left, right) => left ** right,
      },
      {
        type: 'UnaryOperation',
        operator: '+',
        handler: (argument) => +argument,
      },
      {
        type: 'UnaryOperation',
        operator: '-',
        handler: (argument) => -argument,
      },
      {
        type: 'FunctionOperation',
        name: 'log',
        handler: (argument) => Math.log10(argument),
      },
      {
        type: 'FunctionOperation',
        name: 'sqrt',
        handler: (argument) => Math.sqrt(argument),
      },
    ];

    operations.forEach((operation) => this.add_operation(operation));
  }

  private binary: Record<string, BinaryOperation> = {};

  private unary: Record<string, UnaryOperation> = {};

  private functions: Record<string, FunctionOperation> = {};

  add_operation(operation: Operation): void {
    switch (operation.type) {
      case 'BinaryOperation': {
        this.binary[operation.operator] = operation;
        break;
      }

      case 'UnaryOperation': {
        this.unary[operation.operator] = operation;
        break;
      }

      case 'FunctionOperation': {
        this.functions[operation.name] = operation;
        break;
      }
    }
  }

  get_binary(operator: string): BinaryOperation | null {
    return this.binary[operator] || null;
  }

  list_binary(): BinaryOperation[] {
    return Object.values(this.binary);
  }

  get_unary(operator: string): UnaryOperation | null {
    return this.unary[operator] || null;
  }

  get_function(name: string): FunctionOperation | null {
    return this.functions[name] || null;
  }

  list_functions(): FunctionOperation[] {
    return Object.values(this.functions);
  }
}
