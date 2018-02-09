// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'iview/dist/styles/iview.css';

import iView from 'iview';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueLocalForage from 'vue-localforage';
import Vue from 'vue';
import App from './App';


Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(VueLocalForage);
Vue.use(VueGoogleMaps, {
  load: {
    apiKey: 'AIzaSyAEaENGkdpePV2G4Nv7orSMZpgyMMPafzA',
    libraries: 'places',
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
