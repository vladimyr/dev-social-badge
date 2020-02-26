import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import { string } from 'rollup-plugin-string';
import resolve from '@rollup/plugin-node-resolve';

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/index.js',
  output: {
    format: 'iife',
    name: 'DevtoBadge',
    exports: 'named',
    sourcemap: true,
    file: pkg.unpkg
  },
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    builtins(),
    babel({ exclude: 'node_modules/**' }),
    string({ include: '**/*.svg' })
  ]
};

export default config;
