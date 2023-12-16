import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";


const store = createStore({
    state : {
        user : {
            email: null as string | null,
            userName: null  as string  | null,
            password: null as string | null
        }
    },
    getters: {
        getUser : state => state.user
    },
    mutations: {
        setUser(state, payload){
            state.user = payload
        }
    },
    plugins : [createPersistedState()]
})


export default store;