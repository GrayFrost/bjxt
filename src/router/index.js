/**
 * Created by Administrator on 2017/4/3.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import index from 'components/index.vue';
import computers from 'components/computers.vue';
import computersJd from 'components/computersJd.vue';
import computersGm from 'components/computersGm.vue';
import computersCompare from 'components/computersCompare.vue';
import jd from 'components/jd.vue';
import gm from 'components/gm.vue';
import detail from 'components/detail.vue';
import search from 'components/search.vue';
import about from 'components/about.vue';
import thank from 'components/thank.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/', component: index},
    {
        path: '/computers',
        component: computers,
        name: 'computers',
        children: [
            {path: '/computers/jd', component: computersJd, name: 'computersJd'},
            {path: '/computers/gm', component: computersGm, name: 'computersGm'},
            {path: '/computers/compare', component: computersCompare, name: 'computersCompare'}
        ]
    },
    {path: '/jd', component: jd, name: 'jd'},
    {path: '/gm', component: gm, name: 'gm'},
    {path: '/detail', component: detail, name: 'detail'},
    {path: '/search', component: search, name: 'search'},
    {path: '/about', component: about, name: 'about'},
    {path: '/thank', component: thank, name: 'thank'}
];

export default new VueRouter({
    linkActiveClass: 'active',
    routes: routes
});
