// 公用部分happypack配置

const os = require('os');
// 用于开启多进程加速构建
const HappyPack = require('happypack');
const threadPool = HappyPack.ThreadPool({ size: os.cpus().length }); // 构造出共享进程池，在进程池中包含与cpu个数相同的子进程

module.exports = [
  new HappyPack({
    id: 'babel-loader', // 处理这类文件的happypack标识符
    threadPool: threadPool, // 共享进程池
    loaders: [ 'babel-loader' ]
  }),
  new HappyPack({
    id: 'vue', // 处理这类文件的happypack标识符
    threadPool: threadPool, // 共享进程池
    threads: 4, // 开启几个子进程去处理这一类型的文件，默认是3个，类型必须是整数。
    loaders: [ 'vue-loader' ] // 与webpack的loader一样
  }),
  new HappyPack({
    loaders: [{
      path: 'vue-loader'
    }]
  })
]