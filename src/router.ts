import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainRoutes from '@/modules/main/routes'
const routes: Array<RouteRecordRaw> = [
    ...MainRoutes,
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        meta: {
            layout: 'default',
        },
        component: () => import('@/modules/PError.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async () => {
    // Navigation guard here
})

export default router
