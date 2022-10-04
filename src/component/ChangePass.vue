<script>

import Servic from '../service/Service.js'

export default {
    data() {
        return {
            eye1: false,
            eye2: false,
            eye3: false,
            passOld: '',
            passNew: '',
            passConfirm: ''
        }
    },
    methods: {
        handleChangeEye(str) {
            switch (str) {
                case 'eye1': this.eye1 = !this.eye1
                    break
                case 'eye2': this.eye2 = !this.eye2
                    break
                case 'eye3': this.eye3 = !this.eye3
                    break
            }
        },
        async clickChange() {
            let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
            let info = {
                username: infoLogin.username,
                passOld: this.passOld,
                passNew: this.passNew,
                passConfirm: this.passConfirm
            }
            if (info.passNew == info.passConfirm) {
                let res = await Servic.changePass(info)
                if (res) {
                    alert(res.mes)
                }
            } else {
                alert("Xác nhận mật khẩu không chính xác")
            }
        },
        returnHome() {
            this.$router.replace("/")
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
            <button @click="returnHome()">Home</button>
            <div class="form_login">
                <div class="title">Thay Đổi Mật Khẩu:</div>
                <div class="password">
                    <label for="">Mật Khẩu Cũ:</label>
                    <input :type="eye1==true?'text':'password'" v-model="this.passOld">
                    <i :class="eye1 == true ? 'fa-solid fa-eye' :'fa-solid fa-eye-slash'"
                        @click="handleChangeEye('eye1')"></i>
                </div>
                <div class="password">
                    <label for="">Mật Khẩu Mới:</label>
                    <input :type="eye2==true?'text':'password'" v-model="this.passNew">
                    <i :class="eye2 == true ? 'fa-solid fa-eye' :'fa-solid fa-eye-slash'"
                        @click="handleChangeEye('eye2')"></i>
                </div>
                <div class="password">
                    <label for="">Xác Nhận Mật Khẩu Mới:</label>
                    <input :type="eye3==true?'text':'password'" v-model="this.passConfirm">
                    <i :class="eye3 == true ? 'fa-solid fa-eye' :'fa-solid fa-eye-slash'"
                        @click="handleChangeEye('eye3')"></i>
                </div>
                <div class="login">
                    <button @click="clickChange()">Lưu Thay Đổi</button>
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