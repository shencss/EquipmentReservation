
import App from '../components/App';
import Mine from '../components/Mine'
import Reservation from '../components/Reservation'
import Reserve from '../components/Reserve'

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        {
            path: '',
            redirect: '/reservation'
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
        {
            name: 'reserve',
            path: '/reserve',
            component: Reserve
        }
    ]
}];
