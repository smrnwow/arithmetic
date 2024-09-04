import { Operations, Operation } from './operations';
import { Parser } from './parser';
import { Solver } from './solver';
import { Tokenizer } from './tokenizer';

export class Calculator {
  constructor() {
    this.operations = new Operations();

    this.init();
  }

  private operations: Operations;

  private tokenizer: Tokenizer;

  private parser: Parser;

  private solver: Solver;

  calculate(expression: string): number {
    return this.solver.solve(this.parser.parse(expression));
  }

  add_operation(operation: Operation): void {
    this.operations.add_operation(operation);

    this.init();
  }

  private init(): void {
    this.tokenizer = new Tokenizer(this.operations);

    this.parser = new Parser(this.tokenizer);

    this.solver = new Solver(this.operations);
  }
}
