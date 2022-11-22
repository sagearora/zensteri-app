import path from 'path';
import type { Configuration } from 'webpack';
import { rules } from './webpack.rules';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyWebpackPlugin = require('copy-webpack-plugin')


const copy = new CopyWebpackPlugin({
  patterns: [{ from: path.resolve(__dirname, 'assets'), to: 'assets' }],
})

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/index.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
  plugins: [
    copy,
  ]
};
