   
<script>
import Service from "../../service/Service"
import Menu from "../../component/Menu.vue"
import { mapMutations } from 'vuex'
export default {
    components: {
        Menu,
    },
    data() {
        return {
            info: {
                macb: '',
                name: '',
                date: '',
                gender: 1,
                email: '',
                address: '',
                phone: '',
                role: ''
            }
        }
    },
    beforeMount() {
        this.info = JSON.parse(sessionStorage.getItem('infoLogin'))
        if (!this.info.gender) {
            this.info.gender = 1;
        }
    },
    methods: {
        ...mapMutations(["showToast"]),
        async clickSave() {
            let res = await Service.updateInfoCVHT(this.info)
            if (res) {
                if (res.errCode == 0) {
                    let infoToast = {
                        type: "success",
                        mes: "Cập Nhật Thông  Tin Thành Công"
                    }
                    this.showToast(infoToast)
                }
            }
            sessionStorage.setItem("infoLogin", JSON.stringify(this.info))
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
                        Cập Nhật Thông Tin Giảng Viên:
                    </div>
                </div>
                <div class="info_student">
                    <div class="div_form">
                        <label for="masv">Mã Số:</label>
                        <input v-model="this.info.macb" type="text" placeholder="Nhập mã cán bộ..." id="masv"
                            disabled />
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
                </div>
                <div class="submit">
                    <button class="save" @click="clickSave()">Lưu Thay Đổi</button>
                    <button class="reset">Hủy Bỏ</button>
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
