import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import User from '../components/User.vue'
import Work from '../components/Work.vue'
import WorkOrder from '../components/WorkOrder.vue'

const routes = [
    {
        path: '',
        name: '',
        component: User
    },
    {
        path: '/',
        name: '/',
        component: User
    },
    {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/user',
        name: 'User',
        component: User
    },
    {
        path: '/work',
        name: 'Work',
        component: Work
    },
    {
        path: '/workOrder',
        name: 'WorkOrder',
        component: WorkOrder
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router