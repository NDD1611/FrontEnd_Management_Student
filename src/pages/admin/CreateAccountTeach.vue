<script>
import Service from '../../service/Service.js'

export default {
    data() {
        return {
            name: '',
            username: '',
            password: '',
            role: 'admin',
            malop: ''
        }
    },
    methods: {
        async createAccount() {
            let data = {
                name: this.name,
                username: this.username,
                password: this.password,
                role: this.role,
                malop: this.malop.toUpperCase()
            }
            await Service.createAccount(data)
        }
    }
}
</script>
    
<template>
    <div id="admin">
        <div class="main">
            <h1>Create Account</h1>
            <label for="">Họ Và Tên:</label>
            <input type="text" v-model="this.name">
            <label for="">Tài Khoản:</label>
            <input type="text" v-model="this.username">
            <label for="">Mật Khẩu:</label>
            <input type="text" v-model="this.password">
            <label for="">Role:</label>
            <select name="role" id="role" v-model="this.role">
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
            </select>

            <label for="">Mã Lớp:</label>
            <input type="text" v-model="this.malop">
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