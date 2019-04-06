
import App from '../components/App';
import Home from '../components/Home'
import Reservation from '../components/Reservation'
import Mine from '../components/Mine'

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
            name: 'mine',
            path: '/mine',
            component: Mine
        },
    ]
}];
