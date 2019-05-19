
import App from '../components/App';
import Home from '../components/Home'
import Reservation from '../components/Reservation'
import Reserve from '../components/Reserve'

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        {
            path: '',
            redirect: '/home'
        },
        {
            name: 'home',
            path: '/home',
            component: Home
        },
        {
            name: 'reservation',
            path: '/reservation',
            component: Reservation
        }, 
        {
            name: 'reserve',
            path: '/reserve',
            component: Reserve
        }
    ]
}];
