import Vue from 'vue';
import Router from 'vue-router';
import HomeApp from '@/views/HomeApp.vue';
import LogIn from '@/views/Login.vue';

Vue.use(Router);
const router = new Router({
  routes: [
        { 
        path: '/',
        name: 'HomeApp',
        component: HomeApp,
        },
        {
            path: '/LogIn',
            name: 'LogIn',
            component: LogIn,
        }
    ]
});
export default router;