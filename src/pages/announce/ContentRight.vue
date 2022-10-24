<script>
import Menu from "../../component/Menu.vue"
import HeadRight from "../../component/HeadRight.vue"
import { mapGetters, mapMutations } from 'vuex'
import Service from "../../service/Service"
export default {
    data() {
        return {
            title: '',
            detail: '',
            listannounce: [],
            role: ''
        }
    },
    components: {
        Menu,
        HeadRight
    },
    methods: {
        ...mapMutations(['showToast']),
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
        },
        async getData() {
            let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
            let malop
            if (infoLogin.role == 'student') {
                malop = infoLogin.malop
            } else if (infoLogin.role == 'teacher') {
                malop = JSON.parse(sessionStorage.getItem('currentClass'))
            }
            let res2 = await Service.getInfoCVHTFromMaLop(malop)
            let infoCV = res2.data
            let res = await Service.getAllAnnounce(malop)
            let listAn = res.data
            let res1 = await Service.getAllStudentLop(malop)
            let listSv = res1.data
            let monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            for (let i = 0; i < listAn.length; i++) {
                let announce = listAn[i]
                let str = parseInt(announce.timepost)
                let date1 = new Date(str)
                let day = date1.getDate()
                let month = monthNames[date1.getMonth()]
                let year = date1.getFullYear()
                let newDate = `${day} ${month}, ${year}`
                listAn[i].date = newDate
                for (let j = 0; j < listSv.length; j++) {
                    let sv = listSv[j]
                    if (announce.maso == sv.masv) {
                        listAn[i].name = sv.name
                        listAn[i].isStu = true
                    }
                }

                console.log(announce.maso)
                if (announce.maso == infoCV.macb) {
                    announce.name = infoCV.name
                    announce.isCV = true
                }
            }
            this.listannounce = listAn
        }
    },
    beforeMount() {
        this.getData()
    }
}
</script>
    
<template>
    <div class="content_notice_broad">
        <div class="oneAnnounce" v-for="(announce, index ) in this.listannounce">
            <h6>{{announce.date}}</h6>
            <h6 class="name">{{announce.name}}
                <span class="cvht_check" v-if="announce.isCV">
                    CVHT
                    <i v-if="announce.isCV ? true : false" class="fa-solid fa-check"></i>
                </span>
                <span v-if="announce.isStu">- {{announce.maso}}</span>
            </h6>
            <p class="detail">{{announce.detail}}</p>
        </div>
    </div>
</template>
    
<style lang="scss" scoped>
.notice_broad {
    padding: 20px;
    flex: 7;
    background-color: #fff;
    height: 100vh;
    overflow-x: scroll;

    .cvht_check {
        background-color: blue;
        padding: 3px;
        border-radius: 5px;
        color: #fff
    }

    .content_notice_broad {
        padding: 20px;

        .oneAnnounce {
            border-bottom: 1px solid #ccc;
            margin-bottom: 20px;

            .name {
                margin: 5px;
            }
        }
    }
}
</style>