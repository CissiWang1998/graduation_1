// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import router from './router'
import Home from './components/Home'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import VCharts from 'v-charts'

Vue.use(ViewUI)
Vue.use(VCharts)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Home },
  template: '<Home/>'
})
