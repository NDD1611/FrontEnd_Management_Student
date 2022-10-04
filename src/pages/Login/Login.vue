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
        ...mapMutations(['resetDropDown', 'showToast']),
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
                    // alert("Login Success")
                    let infoToast = {
                        type: "success",
                        mes: "Bạn Đã Đăng Nhập Thành Công"
                    }
                    this.showToast(infoToast)
                    if (res.data.role == 'admin') {
                        this.$router.replace({ path: "/admin/createaccount" })
                    } else {
                        this.$router.replace({ path: "/" })
                    }
                } else {
                    // alert(res.mes)
                    let infoToast = {
                        type: "error",
                        mes: res.mes
                    }
                    this.showToast(infoToast)
                }
            }
        }
    }
}
</script>
    
<template>
    <!-- <div id="Login">
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
    </div> -->

    <div class="bg_main_color">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header">
                                        <h3 class="text-center font-weight-light my-4">Login</h3>
                                    </div>
                                    <div class="card-body">
                                        <!-- <form> -->
                                        <div class="form-floating mb-3">
                                            <input class="form-control" id="inputEmail" type="email"
                                                placeholder="name@example.com" v-model="this.masv" />
                                            <label for="inputEmail">Username</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input class="form-control" id="inputPassword" type="password"
                                                placeholder="Password" v-model="this.password" />
                                            <label for="inputPassword">Password</label>
                                        </div>
                                        <!-- <div class="form-check mb-3">
                                                <input class="form-check-input" id="inputRememberPassword"
                                                    type="checkbox" value="" />
                                                <label class="form-check-label" for="inputRememberPassword">Remember
                                                    Password</label>
                                            </div> -->
                                        <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                            <!-- <a class="small" href="password.html">Forgot Password?</a> -->
                                            <button class="btn btn-primary" @click="handleClickLogin()">Login</button>
                                        </div>
                                        <!-- </form> -->
                                    </div>
                                    <!-- <div class="card-footer text-center py-3">
                                        <div class="small"><a href="register.html">Need an account? Sign up!</a></div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <!-- <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2022</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div> -->
        </div>
    </div>
</template>
    
<!-- <style lang="scss" scoped>
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
</style> -->
<style lang="css" scoped>
@import "../css/styles.css"
</style>