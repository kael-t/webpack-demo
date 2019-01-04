const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const os = require('os');
// 用于开启多进程加速构建
const HappyPack = require('happypack');
const threadPool = HappyPack.ThreadPool({ size: os.cpus().length }); // 构造出共享进程池，在进程池中包含与cpu个数相同的子进程

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: options.userCssModule,
      sourceMap: options.sourceMap,
      localIdentName: '[path][name]__[local]--[hash:base64:5]'
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = []

    // 提取css
    // 通过用dev.config和prod.config设置不同的extract来区分是否需要提取
    if (options.extract) {
      loaders.push(MiniCssExtractPlugin.loader)
    } else {
      loaders.push('vue-style-loader')
    }

    // cssLoader必选
    loaders.push(cssLoader)

    // 在配置文件中配置usePostCSS来配置是否开启postcss配置
    if (options.usePostCSS) {
      loaders.push(postcssLoader)
    }

    // 如果有特殊的loader则在调用generateLoader时传入,并放在数组最后
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    return loaders
  }
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  // 导出以下文件来分别兼容不同的样式文件
  // 每个key代表1条rules
  return {
    // 不需要额外loader
    css: generateLoaders(),
    postcss: generateLoaders(),
    // 需要额外的loader
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

/**
 * @description 生成最终的loader到config文件中，主要配置项如下
 * @param options 配置项
 *        sourceMap 是否开启postcss和cssloader的sourceMap
 *        extract 是否需要抽离css
 *        usePostCSS 是否启用postcss
 */
exports.styleLoader = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  // 把cssLoaders返回的对象生成一个rules数组返回
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: options.useHappypack ? ['happypack/loader?id=' + extension ] : loader
    })
  }
  return output
}

/**
 * @description 生成最终的loader到config文件中，主要配置项如下
 * @param options 配置项
 *        useHappypack 是否启用happypack
 */
exports.generatePlugins = function (options) {
  const plugins = []

  if (options.useHappypack) {
    const loaders = exports.cssLoaders(options)
    // 把cssLoaders返回的对象生成一个rules数组返回
    for (const extension in loaders) {
      const loader = loaders[extension]
      plugins.push(
        new HappyPack({
          id: extension, // id名
          threadPool: threadPool, // 共享进程池
          loaders: loader, // loader
          cache: true, // 开启缓存
          verbose: true // 允许happypack在控制台中打印
        })
      )
    }
  }
  return plugins
}