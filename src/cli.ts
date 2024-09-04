import * as readline from 'readline';
import { Calculator } from './index';

(async () => {
  const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
    prompt: 'type an expression> ',
  });

  const calculator = new Calculator();

  terminal.prompt();

  terminal
    .on('line', (expression) => {
      try {
        console.log(calculator.calculate(expression));
      } catch (error) {
        console.log(`error: ${error.message}`);
      } finally {
        terminal.prompt();
      }
    })
    .on('close', () => process.exit());
})();
