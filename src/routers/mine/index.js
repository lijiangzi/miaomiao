export default {
    path: "/mine",
    component: () => import('@/views/Mine'),
    children: [
        {
            path: 'login',
            component: () => import('@/components/Login')
        },
        {
            path: 'center',
            component: () => import('@/views/Mine/center.vue')
        },
        {
            path: 'register',
            component: () => import('@/components/Register')
        },
        {
            path: 'findPassword',
            component: () => import('@/components/FindPassword')
        },{
            path: '/mine',
            redirect: 'center'

        }
    ]
}