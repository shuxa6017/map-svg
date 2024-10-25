import type { RouteRecordRaw } from 'vue-router'

const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: '/',
        name: 'PMain',
        meta: {
            layout: 'default',
        },
        component: () => import('@/modules/main/views/PIndex.vue'),
    },
    {
        path: '/ymap',
        name: 'PYMap',
        meta: {
            layout: 'default',
        },
        component: () => import('@/modules/main/views/PYMap.vue')
    }
]

export default routes
