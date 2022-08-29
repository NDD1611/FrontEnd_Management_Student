<script>

import Menu from "../../component/Menu.vue"
import Service from "../../service/Service.js"
export default {
    data() {
        return {
            info: {
                masv: '',
                name: '',
                date: '',
                gender: 1,
                email: '',
                address: '',
                phone: '',
                role: 'student',
                diemtb: 0.0,
                tinchi: 0,
                namePa: '',
                nameMe: '',
                phonePa: '',
                phoneMe: '',
                jobPa: '',
                jobMe: '',
                addressPa: '',
                addressMe: ''
            }
        }
    },
    components: {
        Menu,
    },
    methods: {
        async handleSave() {
            let res = await Service.createOneSv(this.info)
            if (res) {
                alert(res.mes)
            }
        },
        handleReset() {
            this.info = {
                masv: '',
                name: '',
                date: '',
                gender: 1,
                email: '',
                address: '',
                phone: '',
                role: 'student',
                diemtb: 0.0,
                tinchi: 0,
                namePa: '',
                nameMe: '',
                phonePa: '',
                phoneMe: '',
                jobPa: '',
                jobMe: '',
                addressPa: '',
                addressMe: ''
            }
        }
    }
}
</script>

<template>
    <div id="addNewSinnhVien">
        <div class="nav">
            <Menu></Menu>
        </div>
        <div class="right">
            <div class="form">
                <div class="head">
                    <div class="head_left">
                        Thông Tin Sinh Viên:
                    </div>
                    <div class="head_right">
                        <span>Nhập Danh Sách Từ File Excel: </span>
                        <router-link class="import_file" to="/cvht/addlist">Nhập</router-link>
                    </div>
                </div>
                <div class="info_student">
                    <div class="div_form">
                        <label for="masv">Mã Sinh Viên:</label>
                        <input v-model="this.info.masv" type="text" placeholder="Nhập mã sinh viên..." id="masv" />
                    </div>
                    <div class="div_form">
                        <label for="name">Tên:</label>
                        <input v-model="this.info.name" type="text" placeholder="Nhập họ và tên..." id="name" />
                    </div>
                    <div class="div_form">
                        <label for="date">Ngày Sinh:</label>
                        <input v-model="this.info.date" type="text" placeholder="dd/mm/yyyy" id="date" />
                    </div>
                    <div class="div_form">
                        <label for="gender">Giới Tính:</label>
                        <select v-model="this.info.gender" id="gender">
                            <option value="1" selected>Nam</option>
                            <option value="2">Nữ</option>
                            <option value="3">Khác</option>
                        </select>
                    </div>
                    <div class="div_form">
                        <label for="email">Email:</label>
                        <input v-model="this.info.email" type="text" placeholder="Nhập email..." id="email" />
                    </div>
                    <div class="div_form">
                        <label for="address">Địa Chỉ:</label>
                        <input v-model="this.info.address" type="text" placeholder="Nhập địa chỉ..." id="address" />
                    </div>
                    <div class="div_form">
                        <label for="phone">Số Điện Thoại: </label>
                        <input v-model="this.info.phone" type="text" placeholder="Nhập số điện thoại..." id="phone" />
                    </div>
                    <div class="div_form">
                        <label for="tb">Điểm Trung Bình Tích Lũy: </label>
                        <input v-model="this.info.diemtb" type="text" placeholder="Nhập số điện thoại..." id="tb" />
                    </div>
                    <div class="div_form">
                        <label for="tinchi">Số Tín Chỉ Đã Tích Lũy: </label>
                        <input v-model="this.info.tinchi" type="text" placeholder="Nhập số điện thoại..." id="tinchi" />
                    </div>
                </div>
                <div class="title">Thông Tin Cha Sinh Viên:</div>
                <div class="info_father">
                    <div class="div_father">
                        <label for="namePa">Tên:</label>
                        <input v-model="this.info.namePa" type="text" placeholder="Nhập Tên..." id="namePa">
                    </div>
                    <div class="div_father">
                        <label for="phonePa">Số Điện Thoại:</label>
                        <input v-model="this.info.phonePa" type="text" placeholder="Nhập Số Điện Thoại..." id="phonePa">
                    </div>
                    <div class="div_father">
                        <label for="jobPa">Nghề Nghiệp:</label>
                        <input v-model="this.info.jobPa" type="text" placeholder="Nhập Nghề Nghiệp..." id="jobPa">
                    </div>
                    <div class="div_father">
                        <label for="">Địa Chỉ Liên Lạc:</label>
                        <input v-model="this.info.addressPa" type="text" placeholder="Nhập Địa Chỉ..." id="">
                    </div>
                </div>

                <div class="title">Thông Tin Mẹ Sinh Viên:</div>
                <div class="info_mother">
                    <div class="div_mother">
                        <label for="nameMe">Tên:</label>
                        <input v-model="this.info.nameMe" type="text" placeholder="Nhập Tên..." id="namee">
                    </div>
                    <div class="div_mother">
                        <label for="phoneMe">Số Điện Thoại:</label>
                        <input v-model="this.info.phoneMe" type="text" placeholder="Nhập Số Điện Thoại..." id="phoneMe">
                    </div>
                    <div class="div_mother">
                        <label for="jobMe">Nghề Nghiệp:</label>
                        <input v-model="this.info.jobMe" type="text" placeholder="Nhập Nghề Nghiệp..." id="jobMe">
                    </div>
                    <div class="div_mother">
                        <label for="">Địa Chỉ Liên Lạc:</label>
                        <input v-model="this.info.addressMe" type="text" placeholder="Nhập Địa Chỉ..." id="">
                    </div>
                </div>
                <div class="submit">
                    <button class="save" @click="handleSave()">Lưu</button>
                    <button class="reset" @click="handleReset()">Hủy Bỏ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#addNewSinnhVien {
    display: flex;
    width: 100vw;

    .right {
        width: 100%;
        background-color: #f0f1f3;

        .form {
            background-color: #fff;
            margin: 20px;

            .head {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #ccc;
                padding: 20px;

                .head_right {
                    a {
                        margin-left: 10px;
                        padding: 10px 20px;
                        text-decoration: none;
                        color: #fff;
                        background-color: #042954;
                    }
                }
            }

            .title {
                padding: 20px 10px;
                border-bottom: 1px solid #ccc;
                margin-bottom: 15px;
                position: relative;

                // .import_file {
                //     position: absolute;
                //     right: 30px;
                //     top: 10px;
                //     text-decoration: none;
                //     color: #fff;
                //     font-size: 20px;
                //     padding: 10px 20px;
                //     background-color: #f8c504;
                // }
            }

            .info_student {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                padding: 0 20px 20px 20px;


                .div_form {
                    width: 30%;

                    select {
                        width: 80%;
                        padding: 10px;
                    }

                    label {
                        display: block;
                        padding: 10px 0;
                    }

                    input {
                        width: 100%;
                        padding: 10px;
                    }
                }
            }

            .info_father {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                padding: 0 20px 20px 20px;


                .div_father {
                    width: 24%;

                    label {
                        display: block;
                        padding: 10px 0;
                    }

                    input {
                        width: 100%;
                        padding: 10px;
                    }
                }
            }

            .info_mother {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                padding: 0 20px 20px 20px;


                .div_mother {
                    width: 24%;

                    label {
                        display: block;
                        padding: 10px 0;
                    }

                    input {
                        width: 100%;
                        padding: 10px;
                    }
                }
            }

            .submit {
                padding: 20px;

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

                .reset {
                    background-color: #051f3e;
                }
            }
        }
    }
}
</style>