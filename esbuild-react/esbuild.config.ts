import * as fs from 'fs';
import * as path from 'path';
import { build, server, BuildOptions } from 'esbuild';
import dayjs from "dayjs";

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const isDev = NODE_ENV === 'development';
const watch = process.env.WATCH === 'true' || false;
const metafile = process.env.META_FILE === 'true' || false;

// webpackのdefine pluginと同じ
const define: BuildOptions['define'] = {
  // コード上の `process.env.NODE_ENV` を `development` などで置き換える
  'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
};

// ビルド処理
build({
  define,
  // Reactのメインファイル
  entryPoints: [path.resolve(__dirname, 'src/index.tsx')],
  bundle: true,
  // ビルドされたバンドルの出力先
  outfile: 'public/index.js',
  minify: !!process.env.MIN || !isDev,
  sourcemap: true,
  platform: 'browser',
  treeShaking: true,
  watch: watch && {
    // watchモードで起動したい場合は、再ビルドのcallbackを渡す
    onRebuild(error, result) {
      if (error) console.error(`${dayjs().format('HH:mm:ss')} Failed: `, error)
      else console.log(`${dayjs().format('HH:mm:ss')} Success: `, result)
    },
  },
}).then(result => {
  console.log(`ビルド完了`);
}).catch(() => process.exit(1));
