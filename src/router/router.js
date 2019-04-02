
import App from '../components/App';

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        {
            path: '',
            redirect: '/home'
        },
        {
            path: '/home',
        },
    ]
}];
