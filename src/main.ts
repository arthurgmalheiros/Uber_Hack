import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './stylesheet/app.scss';

Vue.config.productionTip = true;
Vue.config.devtools = true;

declare var $: any;
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

