import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

require("materialize-css/dist/js/materialize.js")

new Vue({
  render: (h) => h(App),
}).$mount('#app');
