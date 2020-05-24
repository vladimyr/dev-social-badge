import babel from '@rollup/plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import svgo from 'rollup-plugin-svgo';
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
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    svgo({
      plugins: [
        { removeViewBox: false },
        { removeDimensions: false },
        { removeEmptyText: false }
      ]
    })
  ]
};

export default config;
