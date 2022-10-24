<script>

import Menu from "../../component/Menu.vue"
import HeadContent from "../../component/HeadContent.vue";
import Service from "../../service/Service.js"
import HeadRight from "../../component/HeadRight.vue"
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            lists: [],
            coData: false,
            currentClass: ''
        }
    },
    components: {
        Menu,
        HeadContent,
        HeadRight
    },
    emits() {

    },
    async created() {
        this.listClass = JSON.parse(sessionStorage.getItem('listClass'))
        let current = JSON.parse(sessionStorage.getItem('currentClass'))
        if (current) {
            this.currentClass = current
        } else {
            this.currentClass = this.listClass.malop
        }
        let res = await Service.getAllStudentLop(this.currentClass)
        if (res.data.length != 0) {
            this.coData = true
        } else {
            this.coData = false
        }
        this.lists = res.data;
        // console.log(this.lists)
        for (let sv of this.lists) {
            if (sv.gender == 1) {
                sv.gender = "Nam"
            } else if (sv.gender == 2) {
                sv.gender = "Nữ"
            } else {
                sv.gender = "Khác"
            }
        }
    },
    methods: {
        ...mapMutations(['showToast', 'setDataViewSv', 'setDataEditSv']),
        handleClickViewSV: function (sv) {
            this.setDataViewSv(sv)
            this.$router.push("viewsv")
        },
        handleClickEditSv(sv) {
            this.setDataEditSv(sv)
            this.$router.push("editsv")
        },
        async handleDeleteSv(sv, index) {
            // console.log(index, sv)
            let res = await Service.deleteSv({ id: sv._id, masv: sv.masv })
            if (res) {
                if (res.errCode == 0) {
                    this.showToast({ type: 'success', mes: 'Xóa sinh viên thành công' })
                }
                for (let i = index; i < this.lists.length - 1; i++) {
                    this.lists[i] = this.lists[i + 1]
                }
                this.lists.length--
            }
        },
        async emitChange(malop) {
            this.currentClass = malop
            let res = await Service.getAllStudentLop(this.currentClass)
            if (res.data.length != 0) {
                this.coData = true
            } else (
                this.coData = false
            )
            this.lists = res.data;
            for (let sv of this.lists) {
                if (sv.gender == 1) {
                    sv.gender = "Nam"
                } else if (sv.gender == 2) {
                    sv.gender = "Nữ"
                } else {
                    sv.gender = "Khác"
                }
            }
        },
        xemDiemSV(sv) {
            let masv = sv.masv
            console.log(masv)
            sessionStorage.setItem('masvDiemHK', JSON.stringify(masv))
            this.$router.replace({ path: "/sv/capnhatdiem" })
        }
    }
}
</script>

<template>
    <div id="ListStudent">
        <div class="nav">
            <Menu></Menu>
        </div>
        <div class="right">
            <HeadRight @changeClass="emitChange"></HeadRight>
            <div class="content align_center" v-if="!this.coData">
                Không Có Dữ Liệu
            </div>
            <div class="content" v-if="this.coData">
                <div class="header_right">Danh Sách Sinh Viên Lớp {{this.lists[0].malop}}</div>
                <table class="table">
                    <thead>
                        <th scope="col" class="text-center">STT</th>
                        <th scope="col" class="text-center">MSSV</th>
                        <th scope="col" class="text-center">Tên</th>
                        <th scope="col" class="text-center">Giới Tính</th>
                        <th scope="col" class="text-center">Ngày Sinh</th>
                        <th scope="col" class="text-center">Địa Chỉ</th>
                        <th scope="col" class="text-center">Điểm TB</th>
                        <th scope="col" class="text-center">Tín Chỉ</th>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="(sv, index) in this.lists" :class="index % 2 == 0 ? 'black' : 'white'">
                            <td class="text-center">{{ index+1 }}</td>
                            <td class="text-center">{{ sv.masv }}</td>
                            <td class="text-center">{{ sv.name }}</td>
                            <td class="text-center">{{ sv.gender }}</td>
                            <td class="text-center">{{ sv.date }}</td>
                            <td class="text-center">{{ sv.address }}</td>
                            <td class="text-center">{{ sv.diemtb }}</td>
                            <td class="text-center">{{ sv.tinchi }}</td>
                            <td class="column_8">
                                <div class="btns">
                                    <div class="btn" @click="handleClickViewSV(sv)">
                                        <i class="fa-solid fa-eye btn_eye"></i>
                                    </div>
                                    <div class="btn" @click="handleClickEditSv(sv)">
                                        <i class="fa-solid fa-pen-to-square btn_edit"></i>
                                    </div>
                                    <div class="btn" @click="handleDeleteSv(sv, index)">
                                        <i class="fa-solid fa-trash-can btn_delete"></i>
                                    </div>
                                    <div class="btn" @click="xemDiemSV(sv)">
                                        <i class="fa-solid fa-square-poll-horizontal"></i>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#ListStudent {
    display: flex;
    width: 100vw;

    .right {
        width: 100%;

        .align_center {
            display: flex;
            justify-content: center;
        }

        .content {
            background-color: #f0f1f3;
            margin: 20px;

            .header_right {
                padding: 10px;
                font-size: 20px;
            }

            table {
                .column_8 {
                    width: 250px;

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
                }

            }
        }
    }
}
</style>