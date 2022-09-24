



import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            isShowDropDownCVHT: false,
            isShowDropDownSV: false,
            isShowDropDownAccount: false,
            isShowText: true,
            currentMenu: "",
            dataViewSv: {},
            dataEditsv: {}
        }
    },
    mutations: {
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