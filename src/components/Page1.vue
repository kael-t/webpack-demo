<template>
  <div
    class="page1 white-font"
    :class="$style.page1"
  >this is page 1</div>
</template>
<script>
export default {
  name: 'Page1',
  created () {
    console.log('page1 created')
  }
}
</script>
<style lang="less" module>
.page1 {
  background: red;
}
.white-font {
  color: white;
}
</style>
