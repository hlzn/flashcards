import { createRouter, createWebHistory } from 'vue-router'
import RegularWords from './views/RegularWords.vue'
import Verbs from './views/Verbs.vue'
import Empty from './views/Empty.vue'


const routes = [
    { path: '/', component: Empty },
    { path: '/regular-words', component: RegularWords },
    { path: '/verbs', component: Verbs },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router