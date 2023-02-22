<script>
import Menu from "../../component/Menu.vue"
import * as XLSX from 'xlsx/xlsx.mjs';
import Service from "../../service/Service.js"
import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            dataFile: {},
            currentClass: '',
            listClass: []
        }
    },
    components: {
        Menu
    },
    created() {
        this.listClass = JSON.parse(sessionStorage.getItem('listClass'))
        this.currentClass = this.listClass[0].malop
    },
    methods: {
        ...mapMutations(['showToast']),
        onChange(event) {
            this.file = event.target.files ? event.target.files[0] : null;
            if (this.file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    /* Parse data */
                    const bstr = e.target.result;
                    const wb = XLSX.read(bstr, { type: 'binary' });
                    /* Get first worksheet */
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    /* Convert array of arrays */
                    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                    this.dataFile = data;
                }

                reader.readAsBinaryString(this.file);
            }
        },
        async handleClickSubmitFile() {
            try {
                let malop = this.currentClass
                let check = 1
                // console.log(malop)
                if (this.dataFile.length) {
                    // console.log(this.dataFile)
                    let headFile = this.dataFile[0];
                    // console.log(headFile)
                    for (let i = 1; i < this.dataFile.length; i++) {
                        let rowFile = this.dataFile[i]
                        let svObj = {
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
                            addressMe: '',
                            malop: ''
                        }
                        for (let j = 0; j < headFile.length; j++) {
                            svObj[headFile[j]] = rowFile[j];
                        }
                        svObj.malop = malop
                        if (svObj.masv) {
                            let result = await Service.createOneSv(svObj)
                            console.log(result)
                            if (result.errCode != 0) {
                                check = 0
                            }
                        }
                    }
                }
                if (check == 1) {
                    let infoToast = {
                        type: "success",
                        mes: "Thêm Danh Sách Thành Công"
                    }
                    this.showToast(infoToast)
                } else {
                    let infoToast = {
                        type: "Thất bại",
                        mes: "Thêm Danh Sách thất bại"
                    }
                    this.showToast(infoToast)
                }
            } catch (err) {
                let infoToast = {
                    type: "error",
                    mes: "Thêm Danh Sách thất bại"
                }
                this.showToast(infoToast)
                console.log("error AddFileXLSX", err)
            }
        }
    }
}
</script>

<template>
    <div id="AddFile">
        <div class="nav">
            <Menu></Menu>
        </div>
        <div class="right">
            <div class="container">
                <div class="head">
                    NHẬP SINH VIÊN TỪ FILE EXCEL
                </div>
                <div class="content">
                    <div class="title">Xin hãy chọn file có đúng các trường bên dưới: </div>
                    <div class="table">
                        <table>
                            <tr>
                                <th>masv</th>
                                <th>name</th>
                                <th>date</th>
                                <th>gender</th>
                                <th>phone</th>
                                <th>email</th>
                                <th>address</th>
                                <th>diemtb</th>
                                <th>tinchi</th>
                            </tr>
                            <!-- <tr>
                                <th>masv</th>
                                <th>name</th>
                                <th>date</th>
                                <th>gender</th>
                                <th>phone</th>
                                <th>email</th>
                                <th>address</th>
                                <th>diemtb</th>
                                <th>tinchi</th>
                            </tr> -->
                        </table>
                    </div>
                    <div class="foot">
                        <label for="import_file">Chọn FILE:</label>
                        <input type="file" id="import_file"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            @change="(event) => { onChange(event) }" />
                        <div class="malop">
                            <label for="malop">Chọn Lớp Muốn Thêm Sinh Viên Vào::</label>
                            <select v-model="this.currentClass" id="malop">
                                <option v-for="lop in this.listClass" :value="lop.malop" selected>{{ lop.malop }}
                                </option>
                            </select>
                        </div>
                        <div class="btn">
                            <button @click="handleClickSubmitFile()">Tiến Hành Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#AddFile {
    display: flex;
    width: 100vw;

    .right {
        width: 100%;
        height: 100vh;
        background-color: #fff;

        .container {
            padding: 30px;
            margin: 20px;
            height: 100%;
            background-color: #f0f1f3;

            .head {
                width: 100%;
                display: flex;
                justify-content: center;
                padding-bottom: 50px;
                font-size: 30px;
                color: #f8c504;
            }

            .content {
                .title {
                    padding: 10px 0;
                }

                .table {
                    th {
                        border: 1px solid #ccc;
                        padding: 5px;
                    }
                }

                .foot {
                    padding: 10px 0;

                    input {
                        padding: 5px;
                        margin-left: 10px;
                    }

                    .btn {
                        padding: 20px;
                        display: flex;
                        justify-content: center;

                        button {
                            padding: 10px 20px;
                            border: none;
                            background-color: #042954;
                            border-radius: 5px;
                            font-size: 15px;
                            color: #fff;
                        }
                    }

                }
            }

        }
    }
}
</style>