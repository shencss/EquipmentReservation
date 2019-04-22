
import App from '../components/App';
import Schedule from '../components/Schedule'
import Statistics from '../components/Statistics'
import Approval from '../components/Approval'
import Management from '../components/Management'

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        {
            path: '',
            redirect: '/schedule'
        },
        {
            name: 'schedule',
            path: '/schedule',
            component: Schedule
        },
        {
            name: 'approval',
            path: '/approval',
            component: Approval
        },
        {
            name: 'statistics',
            path: '/statistics',
            component: Statistics
        },
        {
            name: 'management',
            path: '/management',
            component: Management
        },
    ]
}];
