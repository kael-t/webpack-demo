const path = require('path');
const setting = require('./webpack.setting');
const happypackPlugin = require('./happypack.config');

// 用于构建前清空dist目录内容
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 用于解析vue模板文件。webpack4以上要使用vue-loader 15.x。这要求开发者必须显式引入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !setting.isShowEslintWarningOverlay
  }
})

module.exports = {
	/**
	 * development
	 * 会将 process.env.NODE_ENV 的值设为 development。
	 * 启用 NamedChunksPlugin 和 NamedModulesPlugin。
	 * 
	 * production
	 * 会将 process.env.NODE_ENV 的值设为 production。
	 * 启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, 
	 *      ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, 
	 *      OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
	 */
	entry: {
		index: './src/index.js',
		polyfill: 'babel-polyfill'
	},

	output: {
		// 输出文件名模板
    filename: '[name].[hash].js',
    // 非入口chunk构建后文件名
		chunkFilename: '[name].[chunkhash].js',
		// 输出路径(绝对路径)
		path: resolve('dist'),
		// 静态文件的目录,相对于html页面
		// publicPath: ""
	},

	module: {
		rules: [
			...(setting.userEslint ? [createLintingRule()] : []),
			{
				test: /\.js$/,
				include: [
          resolve('src'),
          resolve('node_modules/webpack-dev-server/client')
				],
				/**
				 * babel-loader运行时会检查.babelrc文件，读取相关的语法和配置
				 * syntax-dynamic-import 解决动态引入模块的问题
				 * transform-runtime 解决这种全局对象或者全局对象方法编译不足的情况
				 */
				// loader: setting.useHappypack ? 'happypack/loader?id=babel-loader' : 'babel-loader',
				loader: 'babel-loader',
				options: {
					cacheDirectory: true, // 缓存转换结果，会在系统的临时缓存目录中生成缓存文件
				},
			},
			{
				test: /\.vue$/,
				use: [
					{
						loader: setting.useHappypack ? 'happypack/loader?id=vue' : 'vue-loader'
					}
				]
			}
		]
	},

	resolve: {
		// 指定查找目录
		modules: [
			"node_modules",
			resolve("src")
    ],
    // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。
    extensions: ['.js', '.vue', '.json'],
		// 别名
		alias: {
			"@": resolve('src'),
			"@test":  resolve('src/a/b/test'),
			'vue$': 'vue/dist/vue.js',
		}
	},

	// 性能
	performance: {
		hints: "warning",
		maxAssetSize: 200000, // webpack生成的文件大于此值会抛出一个警告 整数类型（以字节为单位）
    maxEntrypointSize: 400000, // 入口文件大于该值会抛出一个警告 整数类型（以字节为单位）
	},

	// 插件
	plugins: [
		new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..'),
      dry: false // 启用删除文件
		}),
		// webpack4以上必须显式引入vueLoaderPlugin
		new VueLoaderPlugin(),
		...(setting.useHappypack ? happypackPlugin : []),
	]
};