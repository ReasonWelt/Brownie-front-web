import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import router from './router'


Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(mavonEditor);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
