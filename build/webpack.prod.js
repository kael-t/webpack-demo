const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');
const path = require('path');
const setting = require('./webpack.setting');
const webpackCommonConfig = require('./webpack.common');
// 用于提取css防止将样式打包在js中引起页面样式加载错乱的现象
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 用于生成html入口文件,引入css、js等外部资源,动态添加每次构建后的hash值
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 用于压缩混淆js文件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// 用于分析构建后的各个chunk
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 用于压缩混淆css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 用于对打包过程中消耗的时间进行精确的统计
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = merge(webpackCommonConfig, {
  // 线上模式
  mode: "production",
  module: {
    rules: utils.styleLoader({
			sourceMap: setting.productionSourceMap,
			extract: true,
			usePostCSS: true,
			userCssModule: setting.useCssModule,
			useHappypack: setting.useHappypack
		})
  },
  // webpack4 官方移除了commonChunkPlugin,改用了optimization属性进行更灵活的配置
	optimization: {
		/**
		 * 分离webpack运行时的文件到manifest文件中
		 */
		runtimeChunk: {
			name: 'manifest'
		},

		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				},
				// 把第三方库,如:vue。单独从vendors中抽出
				lodash: {
					name: 'lodash-chunk',
					// 优先级需要高于vendors,保证执行顺序在vendors前
					priority: 20,
					test: /[\\/]node_modules[\\/]lodash[\\/]/,
					minChunks: 1
				},
				// 把第三方库,如:vue。单独从vendors中抽出
				vue: {
					name: 'vue-chunk',
					// 优先级需要高于vendors,保证执行顺序在vendors前
					priority: 20,
					test: /[\\/]node_modules[\\/]vue[\\/]|[\\/]node_modules[\\/]vue-router[\\/]/,
					minChunks: 1
				},
			},
			chunks: 'all',
			minChunks: 1, // 
			minSize: 30000,
			name: 'vendor' // 打包生成的文件名
		},
		minimizer: [
			new UglifyJSPlugin({
				uglifyOptions: {
					mangle: true,
					output:{
						comments: false, // 移除注释(主要是移除构建过程中生成的注释)
					}
				},
				sourceMap: false, // 不生成sourceMap
				cache: true, // 开启缓存
				parallel: true, // 开启多进程并行构建,提高构建速度
			})
		],
	},
  
  plugins: [
		new webpack.HashedModuleIdsPlugin(), // 生成唯一的hash作为chunk的id(用于生产环境)
    new HtmlWebpackPlugin({
			title: "webpack test production", // title标签
			template: resolve('index.html'), // 指定html模板
			filename: "index.html", // 指定构建后的文件名
			// hash: true, // 是否在资源后加上hash值
			favicon: false, // 指定faviocon
			minify: {
        removeComments: true, // 移除注释
        removeEmptyElements: true, // 清除空内容元素
      },
			cache: true, // 只有在内容变化时才生成新文件
			inject: true, // 在body结尾插入script
    }),
    new MiniCssExtractPlugin({
			filename: "[name].css"
		}),
		new OptimizeCSSAssetsPlugin({
			assetNameRegExp: /\.css$/g, // 需要压缩的文件名
			cssProcessor: require('cssnano'), // 引入cssnano配置压缩选项
			cssProcessorOptions: {
				safe: true,
				discardComments: {
					removeAll: true
				}
			},
			canPrint: false //是否将插件信息打印到控制台
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			reportFilename: 'bundle-report.html',
			openAnalyzer: true
		}),
		// new BundleAnalyzerPlugin({
		// 	analyzerPort: 8080,
		// 	generateStatsFile: false
		// })
		...utils.generatePlugins({
			useHappypack: setting.useHappypack
		})
  ]
})

module.exports = setting.showBuildSpeed ? smp.wrap(webpackConfig) : webpackConfig;