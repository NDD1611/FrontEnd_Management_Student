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
            console.log("login")
            let res = await Services.Login(info)
            console.log(res)
            if (res) {
                if (res.errCode == 0) {
                    sessionStorage.setItem('infoLogin', JSON.stringify(res.data))
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
                                        <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                            <button class="btn btn-primary" @click="handleClickLogin()">Login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>
    
<style lang="css" scoped>
@import "../css/styles.css";
</style>