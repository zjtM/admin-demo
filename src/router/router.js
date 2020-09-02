import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const Login = () => import('../view/login.vue')
const Home = () => import('../view/home.vue')
const Users = () => import('@/view/users.vue')

const router = new VueRouter({
    routes: [ 
        {
            path: '/',
            redirect: '/home',
        },       
        {
            path: '/login',
            //redirect: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            children:[
                {
                    path: '/users',
                    name:'Users',
                    component: Users
                }
            ]
        },
        
    ]
})

//挂载路由导航
router.beforeEach((to, from, next) => {
    //to 要跳转的路径
    // from  从那里跳转过来
    //next 是一个函数,表示放行
    if (to.path === '/login') {
        next()
    } else {
        const token = sessionStorage.getItem('token')
        if (!token) { //没有这个会进入router死循环
            next('/login')
        }else{
            next({...to, replace:true}) //使用replace不会产生历史
        }
    }
})

export default router