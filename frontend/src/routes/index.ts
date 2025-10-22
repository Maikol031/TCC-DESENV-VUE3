import { createRouter, createWebHistory } from "vue-router"
import home from "@/pages/home.vue"
import teste from "@/pages/teste.vue"
import login from "@/pages/login.vue"

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
            default: teste,
            Menu: () => import("@/components/Menu.vue")
        },
        meta: {
            requiresAuth: true,
            layout: "AppLayoutDefault",
            title: "Registro"
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