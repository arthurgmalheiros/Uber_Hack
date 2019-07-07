import Vue from 'vue';
import Router from 'vue-router';
import HomeApp from '@/views/HomeApp.vue';
import LogIn from '@/views/Login.vue';
import LoginConfirm from '@/views/LoginConfirm.vue';

Vue.use(Router);
const router = new Router({
  routes: [
        { 
        path: '/',
        name: 'LogIn',
        component: LogIn,
        },
        {
            path: '/HomeApp',
            name: 'HomeApp',
            component: HomeApp,
        },
        {
            path: '/LoginConfirm',
            name: 'LoginConfirm',
            component: LoginConfirm,
        }
    ]
});
export default router;