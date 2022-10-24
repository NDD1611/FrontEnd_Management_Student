<script>

import { mapGetters, mapMutations } from 'vuex'
import Service from "../../service/Service.js"
import Menu from "../../component/Menu.vue"
export default {
    data() {
        return {
            infoLogin: {},
            arrayYear: [],
            currentYear: '',
            currentHocKi: 1,
            mahp: '',
            tenhp: '',
            sotc: '',
            diemhp: '',
            nhomhp: '',
            dieukienhp: false,
            listHP: [],
            // listFullHP: [],
            rerender: true,
            tinchiHK: 0,
            tinchiTL: 0,
            diemHK: 0,
            diemTL: 0,
            isShowTable: true,
            name: '',
            masv: '',
            diemRL: '',
            showDRL: '',
            hideHK3: true
        }
    },
    components: {
        Menu
    },
    async beforeMount() {

        let masv = JSON.parse(sessionStorage.getItem("masvDiemHK"))
        let infoSV = await Service.getFullInfoSv(masv)
        let infoLogin = infoSV.data
        this.name = infoLogin.name
        this.masv = masv
        this.infoLogin = infoLogin
        const date = new Date()
        let year = date.getFullYear()
        let namBD = parseInt(infoLogin.namhoc)
        for (let i = namBD; i <= year; i++) {
            this.arrayYear.push(i)
        }
        // this.currentYear = this.arrayYear.length - 1
        this.currentYear = 0


        this.getDiemHP()
        this.caculatorFive()
        this.getDiemRL()
    },
    methods: {
        ...mapMutations(['showToast']),
        async getDiemHP() {               // lay diem hoc phan theo hoc ki va nam hoc
            let masv = JSON.parse(sessionStorage.getItem("masvDiemHK"))
            let infoSV = await Service.getFullInfoSv(masv)
            let infoLogin = infoSV.data
            let data = {
                namhoc: this.arrayYear[this.currentYear],
                hocki: this.currentHocKi,
                masv: infoLogin.masv
            }
            let res = await Service.getDiemHP(data)
            if (res.length == 0) {
                this.isShowTable = false
            } else {
                this.isShowTable = true
            }
            this.listHP = res
        },
        async caculatorFive() {
            this.tinchiHK = 0
            this.tinchiTL = 0
            this.diemHK = 0
            this.diemTL = 0
            let arrYear = this.arrayYear
            let curYear = this.arrayYear[this.currentYear]
            let curHK = parseInt(this.currentHocKi)
            let masv = this.infoLogin.masv
            let fullHP = await Service.getFullHP(masv)
            let tongdiem = 0
            for (let hp of fullHP) {
                let diem4
                if (hp.diemchu == 'A') {
                    diem4 = 4.0
                } else if (hp.diemchu == "B+") {
                    diem4 = 3.5
                } else if (hp.diemchu == "B") {
                    diem4 = 3.0
                } else if (hp.diemchu == "C+") {
                    diem4 = 2.5
                } else if (hp.diemchu == "C") {
                    diem4 = 2.0
                } else if (hp.diemchu == "D+") {
                    diem4 = 1.5
                } else if (hp.diemchu == "D") {
                    diem4 = 1
                } else if (hp.diemchu == "F") {
                    diem4 = 0
                }
                if (hp.namhoc == curYear && hp.hocki == curHK) {
                    this.tinchiHK = this.tinchiHK + hp.sotc
                    tongdiem = tongdiem + hp.sotc * diem4
                }
            }
            this.diemHK = (tongdiem / this.tinchiHK).toFixed(2)

            let tongtc = 0
            tongdiem = 0
            for (let hp of fullHP) {
                let diem4
                if (hp.diemchu == 'A') {
                    diem4 = 4.0
                } else if (hp.diemchu == "B+") {
                    diem4 = 3.5
                } else if (hp.diemchu == "B") {
                    diem4 = 3.0
                } else if (hp.diemchu == "C+") {
                    diem4 = 2.5
                } else if (hp.diemchu == "C") {
                    diem4 = 2.0
                } else if (hp.diemchu == "D+") {
                    diem4 = 1.5
                } else if (hp.diemchu == "D") {
                    diem4 = 1
                } else if (hp.diemchu == "F") {
                    diem4 = 0
                }

                if (hp.namhoc < curYear) {
                    if (hp.diemchu != 'F' && hp.dieukien == false) {
                        tongtc += hp.sotc
                        tongdiem += hp.sotc * diem4
                    }
                    if (hp.diemhp >= 4) {
                        this.tinchiTL += hp.sotc
                    }
                }
                if (hp.namhoc == curYear && hp.hocki <= curHK) {
                    if (hp.diemchu != 'F' && hp.dieukien == false) {
                        tongtc += hp.sotc
                        tongdiem += hp.sotc * diem4
                    }
                    if (hp.diemhp >= 4) {
                        this.tinchiTL += hp.sotc
                    }
                }
            }
            this.diemTL = (tongdiem / tongtc).toFixed(2)
        },
        async handleAddHP() {
            let namhoc = this.arrayYear[this.currentYear]
            let diemchu
            let diemso = parseFloat(this.diemhp)
            let tichluy = true
            if (diemso >= 9) {
                diemchu = "A"
            } else if (diemso < 9 && diemso >= 8) {
                diemchu = "B+"
            } else if (diemso < 8 && diemso >= 7) {
                diemchu = "B"
            } else if (diemso < 7 && diemso >= 6.5) {
                diemchu = "C+"
            } else if (diemso < 6.5 && diemso >= 5.5) {
                diemchu = "C"
            } else if (diemso < 5.5 && diemso >= 5) {
                diemchu = "D+"
            } else if (diemso < 5 && diemso >= 4) {
                diemchu = "D"
            } else {
                diemchu = "F"
                tichluy = false
            }
            let data = {
                masv: this.infoLogin.masv,
                namhoc: namhoc,
                hocki: parseInt(this.currentHocKi),
                mahp: this.mahp.toUpperCase(),
                tenhp: this.tenhp,
                sotc: parseInt(this.sotc),
                nhomhp: this.nhomhp.toUpperCase(),
                diemhp: parseFloat(this.diemhp),
                diemchu: diemchu,
                tichluy: tichluy,
                dieukien: this.dieukienhp
            }
            let res = await Service.themHocPhan(data)
            if (res) {
                if (res.errCode == 0) {
                    let info = {
                        type: 'success',
                        mes: 'Thêm Học Phần Thành Công'
                    }
                    this.showToast(info)
                } else {
                    let info = {
                        type: 'warning',
                        mes: res.mes
                    }
                    this.showToast(info)
                }
            }

            this.mahp = ''
            this.tenhp = ''
            this.sotc = ''
            this.diemhp = ''
            this.nhomhp = ''
            this.dieukienhp = false
            this.getDiemHP()
            let fullinfo = await Service.getFullInfoSv(this.infoLogin.masv)
            sessionStorage.setItem("infoLogin", JSON.stringify(fullinfo.data))
            this.caculatorFive()
        },
        handleClickEditHP(hp) {
            console.log(hp)
        },
        async handleDeleteHP(hp) {
            let res = await Service.deleteHP(hp)
            this.getDiemHP()
            let fullinfo = await Service.getFullInfoSv(this.infoLogin.masv)
            sessionStorage.setItem("infoLogin", JSON.stringify(fullinfo.data))
            this.rerender = false
            this.$nextTick(() => {
                this.rerender = true
            })
        },
        handleClickLK() {
            this.getDiemHP()
            this.caculatorFive()
            this.getDiemRL()
            if (this.currentHocKi == 3) {
                this.hideHK3 = false
            } else {
                this.hideHK3 = true
            }
            this.rerender = false
            this.$nextTick(() => {
                this.rerender = true
            })
        },
        async handleAddDRL() {
            console.log(this.diemRL)
            let data = {
                diemRL: this.diemRL,
                masv: this.masv,
                namhoc: this.arrayYear[this.currentYear],
                hocki: parseInt(this.currentHocKi),
            }
            let res = await Service.addDRL(data)
            if (res) {
                if (res.errCode == 0) {
                    let info = {
                        type: 'success',
                        mes: 'Cập Nhật Điểm Rèn Luyện Thành Công'
                    }
                    this.showToast(info)
                }
            }
            this.getDiemRL()
        },
        async getDiemRL() {
            let data = {
                masv: this.masv,
                namhoc: this.arrayYear[this.currentYear],
                hocki: parseInt(this.currentHocKi)
            }
            let res = await Service.getDiemRL(data)
            console.log(res)
            if (res) {
                if (res.data) {
                    this.showDRL = res.data.diemRL
                } else {
                    this.showDRL = ''
                }
            }
            if (this.currentHocKi == 3) {
                this.showDRL = ''
            }
        }
    }
}
</script>

<template>
    <div id="CapNhatDiem">
        <div class="nav">
            <Menu></Menu>
        </div>
        <div class="right">
            <div class="content_right">
                <div class="head">
                    Xem Điểm Học Kỳ <span> {{this.name}} - {{this.masv}} </span>
                </div>
                <div class="two_select">
                    <div class="select_left">
                        Năm Học
                        <select name="nam" id="choose_nam" v-model="this.currentYear">
                            <option v-for="year, index in this.arrayYear" :value="index">
                                {{year}} - {{year+1}}
                            </option>
                        </select>
                    </div>
                    <div class="select_right">
                        Học Kì
                        <select name="hocki" id="choose_hocki" v-model="this.currentHocKi">
                            <option value="1">1 </option>
                            <option value="2">2 </option>
                            <option value="3">Hè </option>
                        </select>
                    </div>
                    <div>
                        <button type="button" class="btn lietke" @click="handleClickLK()">Liệt Kê</button>
                    </div>
                </div>
                <div v-if="!this.isShowTable" class="text-center p-5">
                    <h1>Không có dữ liệu</h1>
                </div>
                <div v-if="this.isShowTable">
                    <table class="table" v-if="this.rerender">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Mã HP</th>
                                <th scope="col">Tên HP</th>
                                <th scope="col">Điều Kiện</th>
                                <th scope="col">Nhóm</th>
                                <th scope="col">Tín Chỉ</th>
                                <th scope="col">Điểm Chữ</th>
                                <th scope="col">Điểm Số</th>
                                <th scope="col">Tích Lũy</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr v-for="(hp, index) in this.listHP">
                                <th scope="row">{{index+1}}</th>
                                <td>{{hp.mahp}}</td>
                                <td>{{hp.tenhp}}</td>
                                <td class="text-center">{{hp.dieukien ? "x" : ''}}</td>
                                <td class="text-center">{{hp.nhomhp}}</td>
                                <td class="text-center">{{hp.sotc}}</td>
                                <td class="text-center">{{hp.diemchu}}</td>
                                <td class="text-center">{{hp.diemhp}}</td>
                                <td class="text-center">{{hp.tichluy ? "*" : ''}}</td>
                                <td>
                                    <div class="btns">
                                        <!-- <div class="btn" @click="handleClickEditHP(hp)">
                                        <i class="fa-solid fa-pen-to-square btn_edit"></i>
                                    </div> -->
                                        <div class="btn" @click="handleDeleteHP(hp)">
                                            <i class="fa-solid fa-trash-can btn_delete"></i>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <!-- modal them hoc phan -->
                <div class="modal fade" id="themHPModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Thông Tin Học Phần</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Mã Học Phần:</label>
                                        <input type="text" class="form-control" id="recipient-name" v-model="this.mahp">
                                    </div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Tên Học Phần:</label>
                                        <input type="text" class="form-control" id="recipient-name"
                                            v-model="this.tenhp">
                                    </div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Số Tín Chỉ Học Phần:</label>
                                        <input type="number" class="form-control" id="recipient-name"
                                            v-model="this.sotc">
                                    </div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Điểm Học Phần:</label>
                                        <input type="text" class="form-control" id="recipient-name"
                                            v-model="this.diemhp">
                                    </div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Nhóm Học Phần:</label>
                                        <input type="text" class="form-control" id="recipient-name"
                                            v-model="this.nhomhp">
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value=""
                                            v-model="this.dieukienhp" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Là học phần điều kiện
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn yellow_bg" data-bs-dismiss="modal"
                                    @click="handleAddHP()">Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- modal cap nhat diem ren luyen -->
                <div class="modal fade" id="capnhatdiemrenluyenModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Thông Tin Học Phần</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Điểm rèn luyện:</label>
                                        <input type="number" class="form-control" id="recipient-name"
                                            v-model="this.diemRL">
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn yellow_bg" data-bs-dismiss="modal"
                                    @click="handleAddDRL()">Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer" v-if="this.isShowTable">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>Tổng số tín chỉ tích lũy học kỳ</td>
                                <td class="set_width">{{this.tinchiHK}}</td>
                                <td>Ðiểm trung bình học kỳ</td>
                                <td class="set_width">{{this.diemHK}}</td>
                            </tr>
                            <tr>
                                <td>Tổng số tín chỉ tích lũy</td>
                                <td class="set_width">{{this.tinchiTL}}</td>
                                <td>Ðiểm trung bình tích lũy</td>
                                <td class="set_width">{{this.diemTL}}</td>
                            </tr>
                            <tr v-if="this.hideHK3">
                                <td></td>
                                <td></td>
                                <td>Ðiểm rèn luyện</td>
                                <td class="set_width">{{this.showDRL}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_add">
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#themHPModal">
                        Thêm môn học vào học kì
                        {{this.currentHocKi == 3 ? "Hè" :
                        this.currentHocKi}} năm học
                        {{this.arrayYear[this.currentYear]}} -
                        {{this.arrayYear[this.currentYear]+1}}
                    </button>
                    <button v-if="this.hideHK3" type="button" class="btn" data-bs-toggle="modal"
                        data-bs-target="#capnhatdiemrenluyenModal">
                        Cập nhật điểm rèn luyện cho học kì {{ this.currentHocKi == 3 ? "Hè" :
                        this.currentHocKi}} năm học
                        {{this.arrayYear[this.currentYear]}} -
                        {{this.arrayYear[this.currentYear]+1}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#CapNhatDiem {
    display: flex;
    width: 100vw;

    .btns {
        height: 100%;
        justify-content: center;
        display: flex;

        .btn {
            cursor: pointer;
            display: flex;
            justify-content: center;
            padding: 5px;
            margin: 0 5px;

            &:hover {
                background-color: #ccc;
            }


            .btn_edit {
                color: #49a24c !important;
            }

            .btn_delete {
                color: #d74739;
            }
        }

    }

    .yellow_bg {
        background-color: #f8c504;
    }

    .right {
        width: 100%;
        background-color: #f0f1f3;

        .content_right {
            padding: 20px;
            background-color: #fff;

            .footer {
                padding: 20px 100px;

                td {
                    border: none;
                }

                .set_width {
                    width: 300px;
                }

            }

            .button_add {
                display: flex;
                justify-content: center;
                gap: 50px;

                button {
                    border: none;
                    border-radius: 5px;
                    padding: 10px;
                    background-color: #f8c504;
                }
            }

            .head {
                padding: 10px 0;
                background-color: #042954;
                color: #fff;
                font-size: 20px;
                border-radius: 5px;
                text-align: center;
            }

            .two_select {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 40px;
                margin: 20px 0;

                .lietke {
                    background-color: #042954;
                    color: #fff;
                }
            }
        }
    }
}
</style>