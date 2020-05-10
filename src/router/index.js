import Vue from 'vue'
import Router from 'vue-router'
import User from '@/User.vue'
import Travel from '@/Travel.vue'
import Report from '@/Report.vue'

Vue.use(Router);

export default new Router({
  routes: [{
    path: '*',
    redirect: '/user'
  }, {
    path: '/user',
    name: 'user',
    components: {
      main: User
    }
  }, {
    path: '/travel',
    name: 'travel',
    components: {
      main: Travel
    }
  }, {
    path: '/report',
    name: 'report',
    components: {
      main: Report
    }
  }]
});