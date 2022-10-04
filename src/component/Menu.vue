<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            isShowChangePass: false
        }
    },
    computed: {
        ...mapGetters(['isShowDropDownCVHT', 'isShowDropDownSV', 'isShowDropDownAccount', 'isShowText', 'getCurrentMenu'])
    },
    methods: {
        ...mapMutations(["showToast", 'setIsShowDropDownCVHT', 'setIsShowDropDownSV', 'setIsShowDropDownAccount', 'closeMenu', 'openMenu', 'setCurrentMenu', "setDataEditSv", "setDataViewSv"]),
        openClick() {

            this.openMenu()
            let menu = document.getElementById("Menu")
            let nav = document.querySelector(".nav_back")
            if (menu) {
                menu.classList.add("openMenu")
                menu.classList.remove("closeMenu")
                nav.classList.add("openNav")
                nav.classList.remove("closeNav")
            }
        },
        closeClick() {
            this.closeMenu()
            let menu = document.getElementById("Menu")
            let nav = document.querySelector(".nav_back")
            if (menu) {
                menu.classList.remove("openMenu")
                menu.classList.add("closeMenu")
                nav.classList.remove("openNav")
                nav.classList.add("closeNav")
            }
        },
        clickCurrentMenu(className) {
            this.setCurrentMenu(className)
        },
        handleClickCVHT() {
            let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
            if (infoLogin) {
                if (infoLogin.role === 'teacher' || infoLogin.role === 'admin') {
                    this.setIsShowDropDownCVHT('drop_down_cvht')
                } else {
                    let infoToast = {
                        type: "warning",
                        mes: "Bạn Không có quyền truy cập vào đây"
                    }
                    this.showToast(infoToast)
                    // alert("Bạn Không có quyền truy cập vào đây")
                }
            } else {
                alert("Bạn chưa đăng nhập. Vui lòng đăng nhập")
                this.$router.replace({ path: "/login" })
            }
        },
        handleClickSV() {
            let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
            if (infoLogin) {
                if (infoLogin.role === 'student') {
                    this.setIsShowDropDownSV('drop_down_sv')
                } else {
                    let infoToast = {
                        type: "warning",
                        mes: "Bạn Không có quyền truy cập vào đây"
                    }
                    this.showToast(infoToast)
                    // alert("Bạn Không có quyền truy cập vào đây")
                }
            } else {
                alert("Bạn chưa đăng nhập. Vui lòng đăng nhập")
                this.$router.replace({ path: "/login" })
            }
        },
        handleClickAccount() {
            this.setIsShowDropDownAccount('drop_down_account')
        },
        clickUpdateSv(str) {
            let infoLogin = JSON.parse(sessionStorage.getItem("infoLogin"))
            // console.log(str, infoLogin)
            this.setDataEditSv(infoLogin)
        },
        clickViewSv(str) {
            let infoLogin = JSON.parse(sessionStorage.getItem("infoLogin"))
            this.setDataViewSv(infoLogin)
        },
        logOut() {
            sessionStorage.clear()
            this.$router.replace('/login')
        },
        changePassword() {
            this.$router.replace("/changepass")
        }
    },
    mounted() {
        // console.log(this.getCurrentMenu)
    }

}
</script>
<!-- :style="{ width: '50px' }" -->
 <!-- :class="this.isShowText == false ? 'closeMenu' : 'openMenu'" -->
<template>
    <div class="nav_back"></div>
    <div id="Menu">
        <div :class="this.isShowText == false ? 'centerText' : 'head'" id="SHOWMENU">
            <div class="left" v-if="this.isShowText">MENU</div>
            <div class="right">
                <div class="openMenu" v-if="!this.isShowText" @click="openClick()">
                    <i class="fa-solid fa-bars"></i>
                </div>
                <div class="closeMenu" @click="closeClick()" v-if="this.isShowText">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
        </div>
        <div class="borderUnder" :class="this.isShowText == false ? 'justify_content_center' : ''">
            <i class="fa-solid fa-house"></i>
            <router-link to="/" class="home_js hover_color" @click="clickCurrentMenu('home_js')">
                <div v-if="this.isShowText">
                    Trang Chủ
                </div>
            </router-link>
        </div>
        <div class="borderUnder cvht_js hover_color" :class="this.isShowText == false ? 'justify_content_center' : ''"
            @click="handleClickCVHT()">
            <i class="fa-solid fa-user-tie"></i>
            <div v-if="this.isShowText">
                Cố Vấn
            </div>
            <i class="fa-solid fa-angle-down iconRight" v-if="this.isShowText"></i>
        </div>

        <div class="drop_down_cvht dropDown" v-if="this.isShowDropDownCVHT">
            <div class="link_to">
                <router-link to="/cvht/list" class="listSv_js hover_color" @click="clickCurrentMenu('listSv_js')">
                    <i class="fa-solid fa-chevron-right"></i>
                    Thông tin
                </router-link>
            </div>
            <div class="link_to">
                <router-link to="/cvht/updateinfo" class="listSv_js hover_color" @click="clickCurrentMenu('listSv_js')">
                    <i class="fa-solid fa-chevron-right"></i>
                    Cập nhật thông tin
                </router-link>
            </div>
            <div class="link_to">
                <router-link to="/cvht/addclass" class="listSv_js hover_color" @click="clickCurrentMenu('listSv_js')">
                    <i class="fa-solid fa-chevron-right"></i>
                    Thêm Lớp Học
                </router-link>
            </div>
            <div class="link_to">
                <router-link to="/cvht/list" class="listSv_js hover_color" @click="clickCurrentMenu('listSv_js')">
                    <i class="fa-solid fa-chevron-right"></i>
                    Danh Sách Sinh Viên
                </router-link>
            </div>
            <div class="link_to">
                <router-link to="/cvht/addSv" class="addnew_js hover_color" @click="clickCurrentMenu('addnew_js')">
                    <i class="fa-solid fa-chevron-right"></i>
                    Thêm Mới Sinh Viên
                </router-link>
            </div>
        </div>


        <div class="borderUnder hover_color" :class="this.isShowText == false ? 'justify_content_center' : ''"
            @click="handleClickSV('drop_down_sv')">
            <i class="fa-solid fa-user-tie"></i>
            <div v-if="this.isShowText">
                Sinh Viên
            </div>
            <i class="fa-solid fa-angle-down iconRight" v-if="this.isShowText"></i>
        </div>

        <div class="drop_down_cvht dropDown" v-if="this.isShowDropDownSV">
            <div class="link_to hover_color">
                <router-link to="/sv/view" class="listSv_js hover_color" @click="clickViewSv('listSv_js')">
                    <i class="fa-solid fa-chevron-right"></i>
                    Thông Tin
                </router-link>
            </div>
            <div class="link_to hover_color">
                <router-link to="/sv/editsv" class="addnew_js hover_color" @click="clickUpdateSv('addnew_js')">
                    <i class="fa-solid fa-chevron-right"></i>
                    Cập Nhật Thông Tin
                </router-link>
            </div>
        </div>


        <!-- <div class="borderUnder" :class="this.isShowText == false ? 'justify_content_center' : ''"> -->
        <router-link to="/announce" class="borderUnder underline_node hover_color"
            :class="this.isShowText == false ? 'justify_content_center' : ''">
            <i class="fa-solid fa-bullhorn"></i>
            <div v-if="this.isShowText">
                Thông Báo
            </div>
        </router-link>
        <!-- </div> -->

        <div class="borderUnder hover_color" :class="this.isShowText == false ? 'justify_content_center' : ''"
            @click="handleClickAccount('drop_down_account')">
            <i class="fa-solid fa-gear"></i>
            <div v-if="this.isShowText">
                Tài Khoản
            </div>
            <i class="fa-solid fa-angle-down iconRight" v-if="this.isShowText"></i>
        </div>

        <div class="drop_down_cvht dropDown" v-if="this.isShowDropDownAccount">
            <div class="link_to">
                <div class="listSv_js hover_color" @click="changePassword()">
                    <i class="fa-solid fa-chevron-right"></i>
                    Đổi mật khẩu
                </div>
            </div>
            <div class="link_to">
                <div class="addnew_js hover_color" @click="logOut()">
                    <i class="fa-solid fa-chevron-right"></i>
                    Đăng Xuất
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.nav_back {
    width: 250px;
}

.closeNav {
    text-align: center;
    animation: closeNav 0.3s linear forwards;
}

.openNav {
    text-align: center;
    animation: openNav 0.3s linear forwards;
}

@keyframes closeNav {
    from {
        width: 250px;
    }

    to {
        width: 50px;
    }
}

@keyframes openNav {
    from {
        width: 50px;
    }

    to {
        width: 250px;
    }
}

#Menu {

    .underline_node {
        text-decoration: none;
    }

    width: 250px;
    background-color: #042954;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

    .hover_color {
        cursor: pointer;

        &:hover {
            color: #fdc500 !important;
        }
    }

    .centerText {
        // display: flex;
        // align-items: center;
        // justify-content: center;
        height: 50px;
        width: 100%;
        background-color: #fdc500;
        color: #fff;
        align-items: center;
        padding: 0 10px;
        font-size: 25px;

        &:hover {
            background-color: rgb(227, 202, 8);
        }
    }

    &.closeMenu {
        animation: closeMenu 0.3s linear forwards;
    }

    &.openMenu {
        width: 100%;
        height: 100%;
        text-align: center;
        animation: openMenu 0.3s linear forwards;
    }


    .dropDown {
        padding: 10px 0 10px 20px;
        align-items: center;
        border-bottom: 1px solid #ccc;
        background-color: #042954;
        color: #fff;
        font-size: 15px;

        .link_to {
            padding: 5px;

            a {
                text-decoration: none;
                color: #fff;
            }
        }

        i {
            padding: 5px;
            font-size: 10px;
            color: #fdc500;
        }

    }

    .borderUnder {
        cursor: pointer;
        height: 40px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        background-color: #042954;
        color: #fff;
        position: relative;

        i {
            padding: 10px;
            color: #fdc500;
        }

        a {
            color: #fff;
            text-decoration: none;
        }

        .iconRight {
            position: absolute;
            right: 10px;
        }
    }

    .justify_content_center {
        justify-content: center;
    }

    .head {
        height: 50px;
        background-color: #fdc500;
        display: flex;
        color: #fff;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        font-size: 25px;

        .right {
            padding: 8px;
            cursor: pointer;

            .openMenu {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5px 8px;

                &:hover {
                    background-color: #ccc;
                }
            }

            .closeMenu {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5px 8px;

                &:hover {
                    background-color: #ccc;
                }
            }
        }
    }

    @keyframes closeMenu {
        from {
            width: 250px;
        }

        to {
            width: 50px;
        }
    }

    @keyframes openMenu {
        from {
            width: 50px;
            opacity: 0;
        }

        to {
            width: 250px;
            opacity: 1;
        }
    }

}
</style>