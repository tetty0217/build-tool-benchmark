import * as fs from 'fs';
import * as path from 'path';
import {build, BuildOptions, serve} from 'esbuild';
import dayjs from "dayjs";

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const isDev = NODE_ENV === 'development';
const isWatch = process.env.WATCH === 'true' || false;
const metafile = process.env.META_FILE === 'true' || false;

// webpackのdefine pluginと同じ
const define: BuildOptions['define'] = {
  // コード上の `process.env.NODE_ENV` を `development` などで置き換える
  'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
};

// ビルド処理
const buildOption: BuildOptions = {
  define,
  // Reactのメインファイル
  entryPoints: [path.resolve(__dirname, 'src/index.tsx')],
  // bundle するかどうか
  bundle: true,
  // ビルドされたバンドルの出力先
  outdir: 'build',
  // bundle file を難読化するか
  minify: !!process.env.MIN || !isDev,
  // ソースマップ出力
  sourcemap: true,
  // target
  platform: 'browser',
  // tree shaking を有効化するか
  treeShaking: true,
  // code 分割する
  splitting: true,
  format: "esm",
  // chunk file の設定
  chunkNames: "chunk-[name]-[hash]"
}

try {
  (async () => {
    await build({...buildOption, ...{
      // 開発サーバー（webpack serve と同じ）
      watch: isWatch && {
        // watchモードで起動したい場合は、再ビルドのcallbackを渡す
        onRebuild(error, result) {
          if (error) console.error(`${dayjs().format('HH:mm:ss')} Failed: `, error)
          else console.log(`${dayjs().format('HH:mm:ss')} Success: `, result)
        },
      }
    }}).then((result) => {
        console.log(`${dayjs().format('HH:mm:ss')} Success: `, result)
      })
    if (isWatch) {
      serve({
        servedir: "build",
        port: 3000,
      }, buildOption).then((result) => {
        console.log(`http://${result.host}:${result.port}`)
      })
    }
  })()
} catch (error) {
  console.error(`${dayjs().format('HH:mm:ss')} Failed: `, error)
}
