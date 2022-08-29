import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from "./router/router.js"
import "@fortawesome/fontawesome-free/css/all.min.css"

const store = createStore({
    state() {
        return {
            isShowDropDownCVHT: false,
            isShowText: true,
            currentMenu: "",
        }
    },
    mutations: {
        setIsShowDropDownCVHT(state, className) {
            if (className == 'drop_down_cvht') {
                state.isShowDropDownCVHT = !state.isShowDropDownCVHT
            }
        },
        closeMenu(state) {
            state.isShowText = false
            state.isShowDropDownCVHT = false
        },
        openMenu(state) {
            state.isShowText = true
        },
        setCurrentMenu(state, className) {
            state.currentMenu = className;
        }
    },
    getters: {
        isShowDropDownCVHT: function (state) {
            return state.isShowDropDownCVHT
        },
        isShowText: function (state) {
            return state.isShowText
        },
        getCurrentMenu: function (state) {
            return state.currentMenu
        }
    }
})

const app = createApp(App)

// Install the store instance as a plugin
app.use(store)
app.use(router)
app.mount('#app')