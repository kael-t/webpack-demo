<template>
  <div class="page1 white-font">this is dynamic page 1</div>
</template>
<script>
export default {
  name: 'page1',
  created () {
    console.log('page1 created')
  }
}
</script>
<style lang="less">
.page1 {
  background: red;
}
.white-font {
  color: white;
}
</style>
