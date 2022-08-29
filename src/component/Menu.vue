<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
        }
    },
    methods: {
        ...mapMutations(['setIsShowDropDownCVHT', 'closeMenu', 'openMenu', 'setCurrentMenu']),
        openClick() {
            this.openMenu()
            let menu = document.getElementById("Menu")
            if (menu) {
                menu.classList.add("openMenu")
                menu.classList.remove("closeMenu")
            }
        },
        closeClick() {
            this.closeMenu()
            let menu = document.getElementById("Menu")
            if (menu) {
                menu.classList.remove("openMenu")
                menu.classList.add("closeMenu")
            }
        },
        clickCurrentMenu(className) {
            this.setCurrentMenu(className)
        }
    },
    computed: {
        ...mapGetters(['isShowDropDownCVHT', 'isShowText', 'getCurrentMenu'])
    },
    mounted() {
        console.log(this.getCurrentMenu)
    }

}
</script>
<!-- :style="{ width: '50px' }" -->
 <!-- :class="this.isShowText == false ? 'closeMenu' : 'openMenu'" -->
<template>
    <div id="Menu">
        <div :class="this.isShowText == false ? 'centerText' : 'head'">
            <div class="left" v-if="this.isShowText">MENU</div>
            <div class="right">
                <div class="openMenu" @click="() => { openClick() }" v-if="!this.isShowText">
                    <i class="fa-solid fa-bars"></i>
                </div>
                <div class="closeMenu" @click="() => { closeClick() }" v-if="this.isShowText">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
        </div>
        <div class="borderUnder" :class="this.isShowText == false ? 'justify_content_center' : ''">
            <i class="fa-solid fa-house"></i>
            <router-link to="/" class="home_js" @click="clickCurrentMenu('home_js')">
                <div v-if="this.isShowText">
                    Trang Chủ
                </div>
            </router-link>
        </div>
        <div class="borderUnder cvht_js" :class="this.isShowText == false ? 'justify_content_center' : ''"
            @click="setIsShowDropDownCVHT('drop_down_cvht')">
            <i class="fa-solid fa-user-tie"></i>
            <div v-if="this.isShowText">
                Cố Vấn
            </div>
            <i class="fa-solid fa-angle-down iconRight" v-if="this.isShowText"></i>
        </div>
        <div class="drop_down_cvht dropDown" v-if="this.isShowDropDownCVHT">
            <div class="link_to">
                <router-link to="/cvht/list" class="listSv_js" @click="clickCurrentMenu('listSv_js')">
                    <i class="fa-solid fa-chevron-right"></i>
                    Danh Sách Sinh Viên
                </router-link>
            </div>
            <div class="link_to">
                <router-link to="/cvht/addSv" class="addnew_js" @click="clickCurrentMenu('addnew_js')">
                    <i class="fa-solid fa-chevron-right"></i>
                    Thêm Mới Sinh Viên
                </router-link>
            </div>
        </div>
        <div class="borderUnder" :class="this.isShowText == false ? 'justify_content_center' : ''">
            <i class="fa-solid fa-user-tie"></i>
            <div v-if="this.isShowText">
                Sinh Viên
            </div>
            <i class="fa-solid fa-angle-down iconRight" v-if="this.isShowText"></i>
        </div>
        <div class="borderUnder" :class="this.isShowText == false ? 'justify_content_center' : ''">
            <i class="fa-solid fa-bullhorn"></i>
            <div v-if="this.isShowText">
                Thông Báo
            </div>
        </div>
        <div class="borderUnder" :class="this.isShowText == false ? 'justify_content_center' : ''">
            <i class="fa-solid fa-gear"></i>
            <div v-if="this.isShowText">
                Tài Khoản
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#Menu {

    width: 250px;
    background-color: #042954;
    height: 100%;

    .centerText {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
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
        text-align: center;
        animation: closeMenu 0.3s linear forwards;
    }

    &.openMenu {
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