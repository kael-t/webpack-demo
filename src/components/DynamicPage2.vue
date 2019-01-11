<template>
  <div class="page2 white-font">this is dynamic page 2</div>
</template>
<script>
export default {
  name: 'DynamicPage2',
  created () {
    console.log('page2 created')
  }
}
</script>
<style lang="less">
.page2 {
  background: blue;
}
.white-font {
  color: white;
}
</style>
