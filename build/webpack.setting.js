module.exports = {
  // 是否启用eslint
  userEslint: true,
  // 是否在弹出层显示eslint错误
  isShowEslintWarningOverlay: false,
  // 是否在生产环境开启sourceMap
  productionSourceMap: false,
  // 是否在开发环境开启srouceMap,
  devSourceMap: false,
  // 是否开启热更新
  useHMR: true,
  // 开发时临时服务部署主机
  devHost: '10.10.32.69',
  // 开发时临时服务部署端口
  devPort: 8085,
  // 开发时服务开启Gzip
  devCompress: true,
  // 开发时是否在弹出层显示构建错误
  isShowBuildErrorOverlay: true,
  // 开发时代理服务的配置(用于前后端分离)
  devProxy: {
    '/api': 'http://localhost:3000'
  },
  // 是否开启css module
  useCssModule: false,
  // 是否显示编译过程中的各个时间
  showBuildSpeed: true,
  /* 
   * 是否开启happypack加速构建
   * 1、由于新版本vue-loader的问题，happypack尝试使用vue-loader时会报无法找到vueLoaderPlugin的错误
   * 2、尝试只对.vue文件内的js进行happypack打包构建时，由于无法读取.vue的<template></template>标签等语法,会识别不出.vue文件内的js语法
   * 3、又因为vueLoaderPlugin会自动把js和style的规则应用到.vue文件中，所以也没办法只对js和style文件进行单独打包
   * 目前不知道如何解决,所以在用到新版的vue-loader时暂不打开happypack加速
   */
  useHappypack: false,
}