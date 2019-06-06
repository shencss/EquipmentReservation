import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            userId: '',
            userName: ''
        }
    },
    mutations: {
        INIT_USER(state, user) {
            state.user.userId = user.userID
            state.user.userName = user.userName
        }
    }
});