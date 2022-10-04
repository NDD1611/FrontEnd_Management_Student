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
            info: {
                khoahoc: '',
                malop: '',
                namhoc: '',
                macb: ""
            }
        }
    },
    methods: {
        ...mapMutations(['showToast']),
        async handleAdd() {
            let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
            this.info.macb = infoLogin.macb
            let res = await Service.addClass(this.info)
            if (res) {
                if (res.errCode == 0) {
                    let infoToast = {
                        type: "success",
                        mes: "Thêm Lớp Học Thành Công"
                    }
                    this.showToast(infoToast)
                    let listClass = JSON.parse(sessionStorage.getItem('listClass'))
                    if (listClass) {
                        listClass.push(this.info)
                        sessionStorage.setItem('listClass', JSON.stringify(listClass))
                    } else {
                        let currentClass = this.info.malop
                        let newlist = []
                        newlist.push(this.info)
                        sessionStorage.setItem('currentClass', JSON.stringify(currentClass))
                        sessionStorage.setItem('listClass', JSON.stringify(newlist))
                    }
                } else {
                    let infoToast = {
                        type: "warning",
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
    <div id="addNewSinnhVien">
        <div class="nav">
            <Menu></Menu>
        </div>
        <div class="right">
            <div class="content">
                <div class="abc">
                    <div>
                        <label for="">Nhập Tên Lớp:</label>
                        <input v-model="this.info.malop" type="text" placeholder="EX: DI20Z6A1">
                    </div>
                    <div>
                        <label for="">Nhập Tên Khóa Học:</label>
                        <input v-model="this.info.khoahoc" type="text" placeholder="Ex: K46">
                    </div>
                    <div>
                        <label for="">Nhập Năm Bắt Đầu:</label>
                        <input v-model="this.info.namhoc" type="text" placeholder="EX: 2020">
                    </div>
                </div>
                <div class="btn_save">
                    <button class="save" @click="handleAdd()">Thêm</button>
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