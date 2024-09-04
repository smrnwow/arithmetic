import * as assert from 'assert';
import { Calculator } from '../../src';

export default (): void => {
  const calculator = new Calculator();

  assert.throws(() => calculator.calculate(`5 % 3`), 'SyntaxError: unexpected token: "%"');

  calculator.add_operation({
    type: 'BinaryOperation',
    operator: '%',
    precedence: 2,
    handler: (left, right) => left % right,
  });

  assert.deepStrictEqual(calculator.calculate(`5 % 3`), 2);
};
