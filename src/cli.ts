import * as readline from 'readline';
import { Parser, Solver } from './index';

(async () => {
  const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
    prompt: 'type an expression> ',
  });

  const parser = new Parser();

  const solver = new Solver();

  terminal.prompt();

  terminal
    .on('line', (line) => {
      try {
        console.log(`= ${solver.solve(parser.parse(line))}`);
      } catch (error) {
        console.log(`error: ${error.message}`);
      } finally {
        terminal.prompt();
      }
    })
    .on('close', () => process.exit());
})();
