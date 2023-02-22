<script>
import Service from "../../service/Service.js"
import Menu from "../../component/Menu.vue"
import { mapMutations } from "vuex"
export default {
    components: {
        Menu,
    },
    data() {
        return {
            rerender: true,
            info: {
                khoahoc: '',
                malop: '',
                namhoc: '',
                macb: "",
                tenlop: '',
                tenkhoa: ''
            },
            dataedit: {
                khoahoc: '',
                malop: '',
                namhoc: '',
                macb: "",
                tenlop: '',
                tenkhoa: ''
            },
            listLop: [],
            rerender: true
        }
    },
    methods: {
        ...mapMutations(['showToast']),
        async handleAdd() {
            let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
            this.info.macb = infoLogin.macb
            this.info.khoahoc = this.info.khoahoc.toUpperCase()
            this.info.malop = this.info.malop.toUpperCase()
            console.log(this.info)
            let res = await Service.addClass(this.info)
            if (res) {
                if (res.errCode == 0) {
                    let infoToast = {
                        type: "success",
                        mes: "Thêm Lớp Học Thành Công"
                    }
                    this.getData()
                } else {
                    let infoToast = {
                        type: "warning",
                        mes: res.mes
                    }
                    this.showToast(infoToast)
                }
            }
        },
        setDataEditModal(lop) {
            this.dataedit.khoahoc = lop.khoahoc
            this.dataedit.malop = lop.malop
            this.dataedit.namhoc = lop.namhoc
            this.dataedit.macb = lop.macb
            this.dataedit.tenlop = lop.tenlop
            this.dataedit.tenkhoa = lop.tenkhoa
        },
        async handleEditLop() {
            console.log('edit')
            let res = await Service.editLop(this.dataedit)
            if (res.errCode == 0) {
                let infoToast = {
                    type: "success",
                    mes: 'Cập Nhật Thông Tin Lớp Học Thành Công'
                }
                this.showToast(infoToast)
                this.getData()
            }
        },
        async delClass(lop) {
            let malop = lop.malop
            let res = await Service.delClass(malop)
            console.log("themToast")
            this.getData()
        },
        async getData() {
            let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
            let macb = infoLogin.macb
            let res = await Service.getAllClass(macb)
            this.listLop = res.data
            sessionStorage.setItem('listClass', JSON.stringify(res.data))
            sessionStorage.setItem('currentClass', JSON.stringify(res.data[0].malop))
        }
    },
    async beforeMount() {
        this.getData()
    }
}
</script>
    
<template >
    <div id="addNewSinnhVien">
        <div class="nav">
            <Menu></Menu>
        </div>
        <div class="right">
            <div class="content">
                <table class="table" v-if="this.rerender">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Mã Lớp</th>
                            <th scope="col">Tên Lớp</th>
                            <th scope="col">Khoa</th>
                            <th scope="col">Khóa</th>
                            <th scope="col">Năm BD</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(lop, index) in this.listLop">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ lop.malop }}</td>
                            <td>{{ lop.tenlop }}</td>
                            <td>{{ lop.tenkhoa }}</td>
                            <td>{{ lop.khoahoc }}</td>
                            <td>{{ lop.namhoc }}</td>
                            <td>
                                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#editHPModal"
                                    @click="setDataEditModal(lop)">
                                    <i class="fa-solid fa-pen-to-square btn_edit"></i>
                                </button>
                                <div class="btn" @click="delClass(lop)">
                                    <i class="fa-solid fa-trash-can btn_delete"></i>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>


                <!-- modal them hoc phan -->
                <div class="modal fade" id="themHPModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Thông Tin Lớp Học</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Nhập Tên Lớp Học:</label>
                                        <input type="text" class="form-control" id="recipient-name"
                                            v-model="this.info.tenlop">
                                    </div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Nhập Mã Lớp Học:</label>
                                        <input type="text" class="form-control" id="recipient-name"
                                            v-model="this.info.malop">
                                    </div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Khóa:</label>
                                        <input type="text" class="form-control" id="recipient-name"
                                            v-model="this.info.khoahoc">
                                    </div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Năm Bắt Đầu:</label>
                                        <input type="text" class="form-control" id="recipient-name"
                                            v-model="this.info.namhoc">
                                    </div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Tên Khoa:</label>
                                        <input type="text" class="form-control" id="recipient-name"
                                            v-model="this.info.tenkhoa">
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn yellow_bg" data-bs-dismiss="modal"
                                    @click="handleAdd()">Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button_add">
                    <button type="button" class="btn yellow_bg" data-bs-toggle="modal" data-bs-target="#themHPModal">
                        Thêm Lớp Học
                    </button>
                </div>

                <!-- modal edit hoc phan -->
                <div class="modal fade" id="editHPModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Thông Tin Lớp Học</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Nhập Tên Lớp Học:</label>
                                        <input type="text" class="form-control" id="recipient-name"
                                            v-model="this.dataedit.tenlop">
                                    </div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Nhập Mã Lớp Học:</label>
                                        <input type="text" class="form-control" id="recipient-name" disabled
                                            v-model="this.dataedit.malop">
                                    </div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Khóa:</label>
                                        <input type="text" class="form-control" id="recipient-name"
                                            v-model="this.dataedit.khoahoc">
                                    </div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Năm Bắt Đầu:</label>
                                        <input type="text" class="form-control" id="recipient-name"
                                            v-model="this.dataedit.namhoc">
                                    </div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Tên Khoa:</label>
                                        <input type="text" class="form-control" id="recipient-name"
                                            v-model="this.dataedit.tenkhoa">
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn yellow_bg" data-bs-dismiss="modal"
                                    @click="handleEditLop()">Lưu Thay Đổi</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
    
<style lang="scss" scoped>
.btn_edit {
    color: #49a24c !important;
}

.btn_delete {
    color: #d74739;
}

#addNewSinnhVien {
    display: flex;
    width: 100vw;

    .yellow_bg {
        background-color: #f8c504;
    }

    .right {
        width: 100%;
        background-color: #f0f1f3;

        .content {
            padding: 50px;

            .abc {
                display: flex;
                justify-content: space-around;

                input {
                    padding: 5px;
                    display: block;
                }
            }

            .btn_save {
                text-align: center;
                margin-top: 20px;

                button {
                    border: none;
                    padding: 10px 20px;
                    margin: 10px;
                    font-size: 15px;
                    color: #fff;
                    border-radius: 5px;
                }

                .save {
                    background-color: #f8c504;
                }
            }

        }

    }
}
</style>