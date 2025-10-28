import { createRouter, createWebHistory } from "vue-router"
import gerenciarPontos from "@/pages/gerenciarPontos.vue"
import registerUser from "@/pages/registerUser.vue"
import login from "@/pages/login.vue"
import home from "@/pages/home.vue"

const routes = [
    {
        name: "home",
        path: "/",
        component: home,
        meta: {
            requiresAuth: false,
            layout: "AppLayoutDefault",
            title: "Home"
        }
    },
    {
        name: "register",
        path: "/register",
        components: {
            default: gerenciarPontos,
            Menu: () => import("@/components/Menu.vue")
        },
        meta: {
            requiresAuth: true,
            layout: "AppLayoutDefault",
            title: "Gerenciar Pontos De Coleta"
        }
    },
    {
        name: "login",
        path: "/login",
        component: login,
        meta: {
            requiresAuth: false,
            layout: "AppLayoutBlank",
            title: "Login"
        }
    },
    {
        name: "registeruser",
        path: "/newaccount",
        component: registerUser,
        meta: {
            requiresAuth: false,
            layout: "AppLayoutBlank",
            title: "NewAcount"
        }
    }
]


export const router = createRouter({
    history: createWebHistory(),
    routes
})



router.beforeEach((to, _from, next) => {
    const token = localStorage.getItem('token')
    const isAuthenticated = !!token

    if (to.meta.requiresAuth && !isAuthenticated) {
        localStorage.setItem('intendedRoute', to.fullPath)
        return next({ 
            name: 'login',
            query: { redirect: to.fullPath }
        })
    }

    if (to.name === 'login' && isAuthenticated) {
        return next({ name: 'home' })
    }

    next()
})