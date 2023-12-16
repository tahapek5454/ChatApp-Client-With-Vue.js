import ChatPage from '@/components/ChatPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
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


export default router