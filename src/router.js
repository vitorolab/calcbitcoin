import Vue from 'vue';
import Router from 'vue-router'

import Home from "./pages/Home";
import Table from "./pages/Table";

//a partir daqui estamos registrando router na instancia do vue
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/table',
            component: Table,
        },
    ],
    mode:'history'
})