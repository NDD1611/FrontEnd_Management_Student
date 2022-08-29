
import { createRouter, createWebHistory } from 'vue-router'
import ListSv from "../pages/CVHT/ListSv.vue"
import PageSV from "../pages/SinhVien/PageSV.vue"
import AddNewSinhVien from "../pages/CVHT/AddNewSinhVien.vue"
import Home from "../pages/Home/Home.vue"
import AddFileXLSX from "../pages/CVHT/AddFileXLSX.vue"

const routes = [
    { path: "/", component: Home },
    { path: "/cvht/list", component: ListSv },
    { path: "/sinhvien", component: PageSV },
    { path: "/cvht/addSv", component: AddNewSinhVien },
    { path: "/cvht/addlist", component: AddFileXLSX }

    // { path: '/:pathMatch(.*)*', component: Notfound }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;