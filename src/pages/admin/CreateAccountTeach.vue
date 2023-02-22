<script>
import Service from '../../service/Service.js'

export default {
    data() {
        return {
            username: '',
            password: '',
            role: 'teacher',
        }
    },
    methods: {
        async createAccount() {
            let data = {
                username: this.username,
                password: this.password,
                role: this.role
            }
            await Service.createAccount(data)
        }
    },
    beforeMount() {
        let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
        if (infoLogin.role != 'admin') {
            alert("Bạn không có quyền truy cập vào trang này")
            this.$router.replace("/")
        }
    }
}
</script>
    
<template>
    <div id="admin">
        <div class="main">
            <h1>Create Account</h1>
            <label for="">Tài Khoản:</label>
            <input type="text" v-model="this.username">
            <label for="">Mật Khẩu:</label>
            <input type="text" v-model="this.password">
            <label for="">Role:</label>
            <select name="role" id="role" v-model="this.role">
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
            </select>
            <button @click="createAccount()">Tạo Tài Khoản</button>
        </div>
    </div>
</template>
    
<style lang="scss" scoped>
#admin {
    display: flex;
    align-items: center;
    justify-content: center;

    .main {
        margin-top: 200px;

        input {
            padding: 3px 0;
        }

        label {
            padding: 10px 0 5px 0;
            display: block;
        }

        button {
            margin-top: 20px;
            display: block;
            padding: 5px 10px;
        }
    }
}
</style>