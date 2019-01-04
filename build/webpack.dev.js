const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');
const path = require('path');
const setting = require('./webpack.setting');
const webpackCommonConfig = require('./webpack.common');
// 用于生成html入口文件,引入css、js等外部资源,动态添加每次构建后的hash值
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = merge(webpackCommonConfig, {
	// 开发模式
	mode: "development",
	module: {
		rules: utils.styleLoader({
			sourceMap: setting.devSourceMap,
			extract: false,
			usePostCSS: true,
			useCssModule: setting.useCssModule
		})
	},
	/**
	 * 用于构建后调试
	 * devtool: "source-map", // 生成SourceMap,表示构建前后的方法映射,牺牲了构建速度的 `source-map' 是最详细的。
	 * devtool: "inline-source-map", // 嵌入到源文件中
	 * devtool: "eval-source-map", // 将 SourceMap 嵌入到每个模块中
	 * devtool: "hidden-source-map", // SourceMap 不在源文件中引用
	 * devtool: "cheap-source-map", // 没有模块映射(module mappings)的 SourceMap 低级变体(cheap-variant)
	 * devtool: "cheap-module-source-map", // 有模块映射(module mappings)的 SourceMap 低级变体
	 * devtool: "eval", // 没有模块映射，而是命名模块。以牺牲细节达到最快。
	 */
	// devtool: "inline-cheap-module-source-map",

	// 配置开发时代理服务
	devServer: {
    proxy: setting.devProxy,
    contentBase: false, // boolean | string | array, static file location
    historyApiFallback: true, // 设为true则404时返回index.html,设为对象可自己配置
    https: false, // 是否启动https服务,设置为对象可提供自己的证书
		noInfo: true, // only errors & warns on hot reload
    hot: setting.useHMR, // 开启热更新
		compress: setting.devCompress, // 服务开启gzip压缩
		host: setting.devHost, // 指定host,方便局域网内部访问
		port: setting.devPort, // 指定port
		index: "index.html", // 指定
		overlay: setting.isShowBuildErrorOverlay, // 构建时发生错误,将会在页面生成弹出层提示
		// useLocalIp: true, // 使用本地ip启动服务
		// watchContentBase: true, // 监听contentBase设定的路径下的文件变动,只要有变化将就会使页面重新加载
	},

	plugins: [
		new webpack.NamedChunksPlugin(), // 生成唯一的name作为chunk的id(用于开发环境)
		new HtmlWebpackPlugin({
			title: "webpack test development", // title标签
			template: resolve('index.html'), // 指定html模板
			filename: "index.html", // 指定构建后的文件名
			// hash: true, // 是否在资源后加上hash值
			favicon: false, // 指定faviocon
			minify: false, // 不进行压缩
			cache: true, // 只有在内容变化时才生成新文件
			inject: true, // 在body结尾插入script
		}),
		new webpack.HotModuleReplacementPlugin()
	]
})