<template>
  <div
    class="page2 white-font"
    :class="$style.page2"
  >this is page 2</div>
</template>
<script>
export default {
  name: 'Page2',
  created () {
    console.log('page2 created')
  }
}
</script>
<style lang="less" module>
/**
 * module在没开启cssModule时无效
 * 开启了cssModule会在css的类名中添加随机值
 * vue中可以通过$style.xxx来为标签生成带随机值的类名
 */
.page2 {
  background: blue;
}
.white-font {
  color: white;
}
</style>
