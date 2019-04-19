import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import '../static/css/reset.css';
import router from './router.js';
import axios from 'axios'
Vue.config.productionTip = false;
import './common/stylus/index.styl';

Vue.use(VueRouter);
Vue.prototype.$http = axios
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
