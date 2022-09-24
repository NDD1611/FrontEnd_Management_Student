<script>

import { mapMutations } from 'vuex'
import Services from "../../service/Service.js"

export default {
    data() {
        return {
            eye: false,
            masv: '',
            password: ''
        }
    },
    methods: {
        ...mapMutations(['resetDropDown']),
        handleChangeEye() {
            this.eye = !this.eye
        },
        async handleClickLogin() {
            this.resetDropDown()
            let info = {
                masv: this.masv,
                password: this.password
            }
            let res = await Services.Login(info)
            console.log(res)
            if (res) {
                if (res.errCode == 0) {
                    sessionStorage.setItem('infoLogin', JSON.stringify(res.data))
                    alert("Login Success")
                    this.$router.replace({ path: "/" })
                } else {
                    alert(res.mes)
                }
            }
        }
    }
}
</script>
    
<template>
    <div id="Login">
        <div class="header">
            <div>Hệ Thống Quản Lý Sinh Viên</div>
        </div>
        <div class="main">
            <div class="form_login">
                <div class="title">Đăng Nhập</div>
                <div class="username">
                    <label for="">Mã Sinh Viên:</label>
                    <input type="text" v-model="this.masv">
                </div>
                <div class="password">
                    <label for="">Mật Khẩu:</label>
                    <input :type="eye==true?'text':'password'" v-model="this.password">
                    <i :class="eye == true ? 'fa-solid fa-eye' :'fa-solid fa-eye-slash'" @click="handleChangeEye()"></i>
                </div>
                <div class="login">
                    <button @click="handleClickLogin()">Đăng Nhập</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style lang="scss" scoped>
#Login {
    height: 90vh;

    .main {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .form_login {
            // border: 1px solid red;
            width: 300px;

            .title {
                font-size: 40px;
            }

            label {
                display: block;
                padding-top: 20px;
                padding-bottom: 10px;
            }

            input {
                width: 100%;
                padding: 5px;
            }

            .login {
                margin: 20px;
                display: flex;
                align-items: center;
                justify-content: center;

                button {
                    background-color: #042954;
                    color: white;
                    padding: 10px 15px;
                    border: none;
                    font-size: 20px;
                    border-radius: 5px;

                }
            }

            .password {
                position: relative;

                i {

                    position: absolute;
                    right: 10px;
                    bottom: 6px;
                }
            }
        }

    }
}
</style>