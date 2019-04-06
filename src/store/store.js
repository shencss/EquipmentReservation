import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        navName: '设备列表'
    },
    mutations: {
        switchNav(state, itemName) {
            switch(itemName) {
                case 'home':
                    state.navName = '设备列表';
                    break;
                case 'reservation':
                    state.navName = '预约中心';
                    break;
                case 'mine':
                    state.navName = '个人信息';
                    break;
                default:
                    state.navName = '设备预约';
            }
        }
    }
});