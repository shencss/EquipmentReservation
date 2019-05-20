
import App from '../components/App';
import Schedule from '../components/Schedule'
import Statistics from '../components/Statistics'
import Approve from '../components/Approve'
import Management from '../components/Management'
import Arrangement from '../components/Arrangement'
import Usage from '../components/Usage'

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
            name: 'approve',
            path: '/approve',
            component: Approve,
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
        {
            name: 'arrangement',
            path: '/arrangement',
            component: Arrangement
        },
        {
            name: 'usage',
            path: '/usage',
            component: Usage
        },
    ]
}];
