const webpack = require('webpack');
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
		vendors: ['vue', 'vue-router', 'lodash'], // 需要进行dll打包的第三方库
	},

	output: {
		// 输出文件名模板
    filename: '[name]_dll.[hash].js',
		// 输出路径(绝对路径)
    path: resolve('dist'),
    library: '[name]'
	},

	// 插件
	plugins: [
		// webpack内置的DllPlugin插件
		new webpack.DllPlugin({
			// 动态连接哭的全局变量名称
			// manifest.json中会使用该值作为key值
			name: '[name]_dll.[hash].js',
			// 指定生成的manifest文件名称
      path: resolve('dist/dll/[name].manifest.json'),
      // 上下文
      context: '/'
		}),
	]
};