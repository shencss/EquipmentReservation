
import App from '../components/App';
import Schedule from '../components/Schedule'
import Statistics from '../components/Statistics'
import Approval from '../components/Approval'
import Management from '../components/Management'
import ApprovalList from '../components/ApprovalList'
import ApprovalDetail from '../components/ApprovalDetail'
import Test from '../components/Test'
import Arrangement from '../components/Arrangement'

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
            component: Approval,
            redirect: '/approval/list',
            children: [
                {
                    name: 'list',
                    path: 'list',
                    component: ApprovalList
                },
                {
                    name: 'detail',
                    path: 'detail',
                    component: ApprovalDetail
                }
            ]
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
            name: 'test',
            path: '/test',
            component: Test
        },
        {
            name: 'arrangement',
            path: '/arrangement',
            component: Arrangement
        },
    ]
}];
