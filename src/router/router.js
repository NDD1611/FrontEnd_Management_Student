
import { createRouter, createWebHistory } from 'vue-router'
import ListSv from "../pages/CVHT/ListSv.vue"
import AddNewSinhVien from "../pages/CVHT/AddNewSinhVien.vue"
import Home from "../pages/Home/Home.vue"
import AddFileXLSX from "../pages/CVHT/AddFileXLSX.vue"
import Updateinfo from "../pages/CVHT/Updateinfo.vue"
import ViewSv from "../component/ViewSv.vue"
import EditSv from "../component/EditSv.vue"
import Login from "../pages/Login/Login.vue"
import CreateAccountTeach from "../pages/admin/CreateAccountTeach.vue"
import ViewSvLogin from "../pages/SinhVien/ViewSvLogin.vue"
import EditSvLogin from "../pages/SinhVien/EditSvLogin.vue"
import Announce from "../pages/announce/Announce.vue"
import ChangePass from "../component/ChangePass.vue"
import AddClass from "../pages/CVHT/AddClass.vue"

const routes = [
    { path: "/", component: Home },
    { path: "/cvht/list", component: ListSv },
    { path: "/cvht/updateinfo", component: Updateinfo },
    { path: "/cvht/addSv", component: AddNewSinhVien },
    { path: "/cvht/addlist", component: AddFileXLSX },
    { path: "/cvht/viewsv", component: ViewSv },
    { path: "/cvht/editsv", component: EditSv },
    { path: "/login", component: Login },
    { path: "/admin/createaccount", component: CreateAccountTeach },
    { path: "/sv/editsv", component: EditSvLogin },
    { path: "/sv/view", component: ViewSvLogin },
    { path: "/announce", component: Announce },
    { path: "/changepass", component: ChangePass },
    { path: "/cvht/addclass", component: AddClass }

    // { path: '/:pathMatch(.*)*', component: Notfound }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;