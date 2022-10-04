



import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            isShowDropDownCVHT: false,
            isShowDropDownSV: false,
            isShowDropDownAccount: false,
            isShowText: true,
            indexSetTimeOut: 0,
            isShowToast: false,
            currentMenu: "",
            dataViewSv: {},
            dataEditsv: {}
        }
    },
    mutations: {
        showToast(state, info) {
            let delay = 5000
            let title
            let icons = {
                success: 'fas fa-check-circle',
                info: 'fas fa-info-circle',
                warning: 'fas fa-exclamation-circle',
                error: 'fas fa-exclamation-circle',
            };
            let icon
            if (info.type == "success") {
                title = "Success"
                icon = "fas fa-check-circle"
            } else if (info.type == "error") {
                title = "Error"
                icon = "fas fa-exclamation-circle"
            } else if (info.type == "warning") {
                title = "Warning"
                icon = "fas fa-exclamation-circle"
            }
            let toast = document.getElementById("toast_message")
            let child = document.createElement("div")
            child.classList.add("toast", `toast--${info.type}`)
            child.style.animation = `showtoast ease .5s, hidetoast linear 1s ${delay / 1000}s forwards`;
            child.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${info.mes}</p>
            </div>
            <div class="toast__close">
                <i class="far fa-times-circle"></i>
            </div>
            `;

            toast.appendChild(child)
            state.indexSetTimeOut = setTimeout(() => {
                toast.removeChild(child)
            }, delay + 1000);
        },
        closeToast(state) {
            state.isShowToast = false
        },
        resetDropDown(state) {
            state.isShowDropDownCVHT = false
            state.isShowDropDownSV = false
            state.isShowDropDownAccount = false
        },
        setIsShowDropDownCVHT(state, className) {
            if (className == 'drop_down_cvht') {
                state.isShowDropDownCVHT = !state.isShowDropDownCVHT
            }
        },
        setIsShowDropDownSV(state, className) {
            if (className == 'drop_down_sv') {
                state.isShowDropDownSV = !state.isShowDropDownSV
            }
        },
        setIsShowDropDownAccount(state, className) {
            if (className == 'drop_down_account') {
                state.isShowDropDownAccount = !state.isShowDropDownAccount
            }
        },
        closeMenu(state) {
            state.isShowText = false
            state.isShowDropDownCVHT = false
            state.isShowDropDownSV = false
            state.isShowDropDownAccount = false
        },
        openMenu(state) {
            state.isShowText = true
        },
        setCurrentMenu(state, className) {
            state.currentMenu = className;
        },
        setDataViewSv(state, sv) {
            // console.log("mutation", sv)
            state.dataViewSv = sv
        },
        setDataEditSv(state, sv) {
            state.dataEditsv = sv;
        },
    },
    getters: {
        isShowToast: function (state) {
            return state.isShowToast
        },
        isShowDropDownCVHT: function (state) {
            return state.isShowDropDownCVHT
        },
        isShowDropDownSV: function (state) {
            return state.isShowDropDownSV
        },
        isShowDropDownAccount: function (state) {
            return state.isShowDropDownAccount
        },
        isShowText: function (state) {
            return state.isShowText
        },
        getCurrentMenu: function (state) {
            return state.currentMenu
        },
        getDataViewSv: (state) => {
            return state.dataViewSv
        },
        getDataEditSv: (state) => {
            return state.dataEditsv
        }
    }
})

export default store;