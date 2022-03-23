// webpack.common.config.js
const path = require('path') // node.js 的路径模块
const miniSVGDataURI = require('mini-svg-data-uri')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    main: './src/index.js',
  },

  output: {
    filename: 'bundle.js', // 打包后的文件名
    path: path.resolve(__dirname, '../dist'), // 打包后的路径
    // 静态文件打包后的路径及文件名（默认是走全局的，如果有独立的设置就按照自己独立的设置来
    assetModuleFilename: 'assets/[name]_[hash][ext]',
    clean: true, // clean the output directory before emit
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack5-base',
      template: './src/index.html',
    }),

    new MiniCssExtractPlugin(),
  ],

  module: {
    rules: [
      //图片文件
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset/resource',
        // include: [path.resolve(__dirname, 'src')],
        generator: {
          filename: 'images/[name]_[hash][ext]', // 独立的配置
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb (低于8kb都会压缩成 base64)
          },
        },
      },

      //   svg文件
      {
        test: /\.svg$/i,
        type: 'asset',
        generator: {
          filename: 'icons/[name]_[hash][ext]',
          dataUrl(conent) {
            content = content.toString()
            return miniSVGDataURI(content) // 通过插件提供的编码算法处理文件
          },
        },
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024, // 2kb （低于2kb都会压缩）
          },
        },
      },

      //   字体文件
      {
        test: /\.(otf|eot|woff2?|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]_[hash][ext]',
        },
      },

      //   数据文件
      {
        test: /\.(txt|xml)$/i,
        type: 'asset/source', // 一般会转为 "asset/source"
      },

      //   处理css
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', // translates css into commonjs
            options: {
              importLoaders: 2,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader,sass-loader
              modules: true, // 默认是 false ***
            },
          },
          'sass-loader', // compiles sass to css
          'postcss-loader',
        ],
        sideEffects: true,
      },

      // 处理js
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all', // 同步或异步
      minSize: 100, // 自己设置最小分割大小
      cacheGroups: {
        // 缓存组
        // 打包第三方库
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, // 正则匹配第三方库文件
          priority: -10, // 优先级
          reuseExistingChunk: true, // 如果一个模块已经被打包过了，那么这个模块也不会被打包
          filename: 'vendors.js', // 打包后的文件名
        },
        // 打包公共模块
        default: {
          minChunks: 2, // 被超过两个模块引用，才会被打包（可以去掉）
          priority: -20, // 优先级
          reuseExistingChunk: true, // 如果一个模块已经被打包过了，那么这个模块也不会被打包
          filename: 'common.js', // 打包后的文件名
        },
      },
    },
  },
}
