// import 'babel-polyfill'
import Vue from 'vue'
import app from './b/app'
import app2 from './b/app2'
import App from './App.vue'
import router from './router'

new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
