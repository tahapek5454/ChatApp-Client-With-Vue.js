import ChatPage from '@/components/ChatPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import store from '@/utils/store'
import { createRouter, createWebHashHistory } from 'vue-router'



const routes = [
    {
            name : "ChatPage", 
            path : "/",
            component : ChatPage      
    },
    {
            name : "LoginPage", 
            path : "/login",
            component : LoginPage      
    },
    {
            name : "RegisterPage", 
            path : "/register",
            component : RegisterPage      
    }
]


const router = createRouter({
    routes : routes,
    history : createWebHashHistory()
});


router.beforeEach(async (to) => {
        if (
                !store.getters["getUser"].userName && to.name == "ChatPage"
        ) {
          return { name: 'LoginPage' }
        }
});


export default router