import { parsing_test } from '../parsing_test';
import { solving_test } from '../solving_test';
import { default as numbers } from './numbers';
import { default as additive_operators } from './additive_operators';
import { default as multiplicative_operators } from './multiplicative_operators';
import { default as pow_operator } from './pow_operator';
import { default as parenthesis } from './parenthesis';
import { default as functions } from './functions';
import { default as unary_operators } from './unary_operators';
import { default as complex_expressions } from './complex_expressions';
import { default as solver } from './solver';

export const test = () => {
  numbers(parsing_test);
  additive_operators(parsing_test);
  multiplicative_operators(parsing_test);
  pow_operator(parsing_test);
  parenthesis(parsing_test);
  functions(parsing_test);
  unary_operators(parsing_test);
  complex_expressions(parsing_test);
  solver(solving_test);

  console.log('all tests passed');
};
