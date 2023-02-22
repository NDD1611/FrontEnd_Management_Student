<script>
import Service from "../../service/Service"
import Menu from "../../component/Menu.vue"

export default {
    data() {
        return {
            listHD: [],
            tenHD: '',
            namThamGia: '',
            hocKiThamGia: 1,
            rerender: true,
            dataEditModal: {},
            showButton: true
        }
    },
    components: {
        Menu
    },
    created() {
        let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
        if (infoLogin.role == 'student') {
            sessionStorage.setItem('addHD', JSON.stringify(infoLogin.masv))
            this.showButton = false
        }
        this.getHD()
    },
    methods: {
        async getHD() {
            let masv = JSON.parse(sessionStorage.getItem('addHD'))
            let res = await Service.getHD(masv)
            this.listHD = res.data
        },
        async handleAddHD() {
            let masv = JSON.parse(sessionStorage.getItem('addHD'))
            let data_pos = {
                masv: masv,
                tenHD: this.tenHD,
                namhoc: this.namThamGia,
                hocki: this.hocKiThamGia,
            }
            let res = await Service.addHD(data_pos)
            this.getHD()
            console.log("themToast")
        },
        setDataEditModal(hd) {
            this.dataEditModal = hd
        },
        async handleEditHD() {
            let res = await Service.editHD(this.dataEditModal)
            console.log("themToast")
        },
        async delHD(hd) {
            let res = await Service.delHD(hd)
            this.getHD()
            console.log("themToast")
        }
    }
}
</script>

<template>
    <div id="HoatDong">
        <div class="nav">
            <Menu></Menu>
        </div>
        <div class="right">
            <div class="listHD">
                <table class="table" v-if="this.rerender">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên hoạt động</th>
                            <th scope="col">Năm tham gia</th>
                            <th scope="col">Học kì tham gia</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(hd, index) in this.listHD">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ hd.tenHD }}</td>
                            <td>{{ hd.namhoc }}</td>
                            <td>{{ hd.hocki }}</td>
                            <td v-if="this.showButton">
                                <button type="button" class="btn hover_brown" data-bs-toggle="modal"
                                    data-bs-target="#editHPModal" @click="setDataEditModal(hd)">
                                    <i class="fa-solid fa-pen-to-square btn_edit"></i>
                                </button>
                                <button class="btn hover_brown" @click="delHD(hd)">
                                    <i class="fa-solid fa-trash-can btn_delete"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="text-center" v-if="this.showButton">
                <button type="button" class="btn yellow_bg" data-bs-toggle="modal" data-bs-target="#addHDModal">
                    Thêm mới hoạt động
                </button>
            </div>


            <!-- modal them hoat dong ngoai khoa -->
            <div class="modal fade" id="addHDModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Thông Tin Hoạt Động</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Tên hoạt động:</label>
                                    <input type="text" class="form-control" id="recipient-name" v-model="this.tenHD">
                                </div>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Năm tham gia:</label>
                                    <input type="number" class="form-control" id="recipient-name"
                                        v-model="this.namThamGia">
                                </div>
                                <div class="HocKi">
                                    <label for="hocki">Học kì tham gia:</label>
                                    <select v-model="this.hocKiThamGia" id="hocki">
                                        <option value="1" selected>1</option>
                                        <option value="2">2</option>
                                        <option value="3">Hè</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn yellow_bg" data-bs-dismiss="modal"
                                @click="handleAddHD()">Thêm</button>
                        </div>
                    </div>
                </div>
            </div>


            <!-- modal edit hoat dong ngoai khoa -->
            <div class="modal fade" id="editHPModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Thông Tin Hoạt Động</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Tên hoạt động:</label>
                                    <input type="text" class="form-control" id="recipient-name"
                                        v-model="this.dataEditModal.tenHD">
                                </div>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Năm tham gia:</label>
                                    <input type="number" class="form-control" id="recipient-name"
                                        v-model="this.dataEditModal.namhoc">
                                </div>
                                <div class="HocKi">
                                    <label for="hocki">Học kì tham gia:</label>
                                    <select v-model="this.dataEditModal.hocki" id="hocki">
                                        <option value="1" selected>1</option>
                                        <option value="2">2</option>
                                        <option value="3">Hè</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn yellow_bg" data-bs-dismiss="modal"
                                @click="handleEditHD()">Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
#HoatDong {

    display: flex;
    width: 100vw;

    .right {
        padding-top: 50px;
        width: 100%;
    }

    .hover_brown {
        &:hover {
            background-color: #ccc;
        }
    }


    .btn_edit {
        color: #49a24c !important;
    }

    .btn_delete {
        color: #d74739;
    }

    .yellow_bg {
        background-color: #f8c504;
    }

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

    .HocKi {
        label {
            padding: 0 10px !important;
        }
    }
}
</style>