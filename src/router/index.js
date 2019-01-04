import Vue from 'vue'
import Router from 'vue-router'
import Page1 from '@/components/Page1'
import Page2 from '@/components/Page2'

Vue.use(Router)
export const routes = [
  {
    name: 'dynamicPage1',
    path: '/dynamicPage1',
    /**
     * 动态引入可以设置为prefetch/preload
     * prefetch: 提前下载文件但是不执行。
     *           但是只在浏览器空闲的时候下载，即在父chunk下载完后
     *           用于将来会用到的chunk
     * preload:  提前下载文件并加载
     *           与父chunk并行下载
     *            用于马上使用到的chunk，即父chunk需要调用该文件的内容
     */
    component: () => import(/* webpackChunkName: "chunk-dynamic-page1", webpackPrefetch: true */ '@/components/DynamicPage1')
  },
  {
    name: 'dynamicPage2',
    path: '/dynamicPage2',
    component: () => import(/* webpackChunkName: "chunk-dynamic-page2" */ '@/components/DynamicPage2')
  },
  {
    name: 'page1',
    path: '/page1',
    component: Page1
  },
  {
    name: 'page2',
    path: '/page2',
    component: Page2
  }
]

console.log('vue-router')

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})