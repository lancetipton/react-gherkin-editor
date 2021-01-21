import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

const packageJson = require('./package.json')
const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: 'src/index.ts',

  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      exports: 'default',
      sourcemap: true
    },
    {
      dir: packageJson.moduleDir,
      format: 'esm',
      preserveModules: true,
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    json(),
    resolve(),
    commonjs({ extensions }),
    typescript()
  ]
}
