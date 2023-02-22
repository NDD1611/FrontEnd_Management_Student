<script>
import Menu from "../../component/Menu.vue"
import HeadRight from "../../component/HeadRight.vue"
import { mapGetters, mapMutations } from 'vuex'
import Service from "../../service/Service"
import ContentRight from "./ContentRight.vue"
export default {
    data() {
        return {
            title: 'gdgdfgd',
            detail: '',
            listannounce: [],
            rerender: true
        }
    },
    components: {
        Menu,
        HeadRight,
        ContentRight
    },
    methods: {
        ...mapMutations(['showToast']),
        testFunction() {
            // let date = new Date()
            // console.log(date.getTime())
            // let dat = new Date(1663814434940 - 1663814034940)
            // console.log(dat.toLocaleString())
            // const date1 = new Date('7/13/2010');
            // const date2 = new Date('12/15/2010');
            // const diffTime = Math.abs(date2 - date1);
            // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60));
            // console.log(diffTime + " milliseconds");
            // console.log(diffDays + " days");
        },
        async createAnnounce() {
            let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
            let maso
            let malop
            if (infoLogin.role == 'student') {
                maso = infoLogin.masv
                malop = infoLogin.malop
            } else if (infoLogin.role == 'teacher') {
                maso = infoLogin.macb
                malop = JSON.parse(sessionStorage.getItem('currentClass'))
            }
            let date = new Date()
            let time = date.getTime()
            let data = {
                title: this.title,
                detail: this.detail,
                timepost: time,
                maso: maso,
                malop: malop
            }
            let res = await Service.createAnnounce(data)
            if (res.errCode == 0) {
                this.showToast({ type: "success", mes: "Tạo Thông Báo Thành Công" })
            }
            this.rerender = false
            this.$nextTick(() => {
                this.rerender = true
            })
        },
        changeClass() {
            this.rerender = false
            this.$nextTick(() => {
                this.rerender = true
            })
        }
    },
    beforeMount() {
    }
}
</script>
    
<template>
    <div id="Announce">
        <div class="nav">
            <Menu></Menu>
        </div>
        <div class="right">
            <HeadRight @changeClass="changeClass()"></HeadRight>
            <div class="content_right">
                <div class="form_create">
                    <div class="head_form_create">Tạo Thông Báo</div>
                    <!-- <div class="col-md-12">
                        <label for="title" class="form-label">Tiêu Đề</label>
                        <input type="text" class="form-control" id="title" v-model="this.title">
                    </div> -->
                    <div class="col-md-12">
                        <label for="detail" class="form-label">Mô Tả </label>
                        <input type="text" class="form-control" id="detail" v-model="this.detail">
                    </div>
                    <div class="col-12 btn_create">
                        <button type="submit" class="btn bg_yellow" @click="createAnnounce()">Tạo Thông Báo</button>
                    </div>
                </div>
                <div class="notice_broad">
                    <div class="head_form_create">Bảng Thông Báo</div>
                    <ContentRight v-if="this.rerender"></ContentRight>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style lang="scss" scoped>
#Announce {
    display: flex;

    .bg_yellow {
        background-color: #f8c504;
    }


    .right {

        width: 100%;
        background-color: #f0f1f3;

        .content_right {
            margin: 20px;
            display: flex;
            gap: 20px;

            .head_form_create {
                border-bottom: 1px solid #ccc;
                padding: 0 0 10px 0;
            }

            .form_create {
                padding: 20px;
                flex: 3;
                background-color: #fff;


                .btn_create {
                    padding: 10px 0;
                }
            }

            .notice_broad {
                padding: 20px;
                flex: 7;
                background-color: #fff;
                height: 80vh;
                overflow-x: scroll;

                .content_notice_broad {
                    padding: 20px;

                    .oneAnnounce {
                        border-bottom: 1px solid #ccc;
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }
}
</style>