import Vue from 'vue';
import Router from 'vue-router';
import HomeApp from '@/views/HomeApp.vue';
import LogIn from '@/views/Login.vue';
import Cadastro from '@/views/Cadastro.vue';
import Pagamento from '@/views/Pagamento.vue';

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
            path: '/Cadastro',
            name: 'Cadastro',
            component: Cadastro,
        },
        {
            path: '/Pagamento',
            name: 'Pagamento',
            component: Pagamento,
        }
    ]
});
export default router;