import { createRouter, createWebHistory } from "vue-router"
import home from "@/pages/home.vue"
import teste from "@/pages/teste.vue"

const routes = [
    {
        name: "home",
        path: "/",
        component: home,
        meta: {
            requiresAuth: true,
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
            title: "Home"
        }
    },
    {
        name: "login",
        path: "/sigin",
        components: {
            default: home,
            Menu: () => import("@/components/Menu.vue")
        },
        meta: {
            requiresAuth: true,
            layout: "AppLayoutDefault",
            title: "Home"
        }
    },

]


export const router = createRouter({
    history: createWebHistory(),
    routes
})



// router.beforeEach((to, from, next) => {
//   // exemplo: pegar o token do localStorage
//   const token = localStorage.getItem("auth_token")
//   const isAuthenticated = !!token

//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next({ name: "login" })
//   } else if (to.name === "login" && isAuthenticated) {
//     // se já estiver logado, redireciona pra dashboard
//     next({ name: "home" })
//   } else {
//     next()
//   }
// })