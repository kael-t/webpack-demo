<template>
  <div>
    <div>this is page app</div>
    <button @click="toPage('1')">to page 1</button>
    <button @click="toPage('2')">to page 2</button>
    <button @click="toDynamicPage('1')">to dynamic page 1</button>
    <button @click="toDynamicPage('2')">to dynamic page 2</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Test',
  methods: {
    toPage (num) {
      this.$router.push({ path: `/page${num}` })
    },
    toDynamicPage (num) {
      this.$router.push({ path: `/dynamicPage${num}` })
    }
  }
}
</script>

<style lang="less">
  #app {
    background: red;
  }
</style>
