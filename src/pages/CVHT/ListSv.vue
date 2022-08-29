<script>

import Menu from "../../component/Menu.vue"
import HeadContent from "../../component/HeadContent.vue";
import Service from "../../service/Service.js"
export default {
    data() {
        return {
            lists: []
        }
    },
    components: {
        Menu,
        HeadContent
    },
    async created() {
        let res = await Service.getAllStudent()
        this.lists = res.data;
        console.log("create", this.lists)
    },
    mounted() {
    }
}
</script>

<template>
    <div id="ListStudent">
        <div class="nav">
            <Menu></Menu>
        </div>
        <div class="right">
            <!-- <HeadContent></HeadContent> -->
            <div class="content">
                <table>
                    <thead>
                        <th class="column_1">MSSV</th>
                        <th class="column_2">Tên</th>
                        <th class="column_3">Giới Tính</th>
                        <th class="column_4">Ngày Sinh</th>
                        <th class="column_5">Địa Chỉ</th>
                        <th class="column_6">Điểm TB</th>
                        <th class="column_7">Tín Chỉ</th>
                        <th class="column_8">Button</th>
                    </thead>
                    <tbody>
                        <tr v-for="(sv, index) in this.lists" :class="index % 2 == 0 ? 'black' : 'white'">
                            <td class="column_1">{{ sv.masv }}</td>
                            <td class="column_2">{{ sv.name }}</td>
                            <td class="column_3">{{ sv.gender }}</td>
                            <td class="column_4">{{ sv.date }}</td>
                            <td class="column_5">{{ sv.address }}</td>
                            <td class="column_6">{{ sv.diemtb }}</td>
                            <td class="column_7">{{ sv.tinchi }}</td>
                            <td class="column_8 ">
                                <div class="btns">
                                    <div class="btn">
                                        <i class="fa-solid fa-eye btn_eye"></i>
                                    </div>
                                    <div class="btn">
                                        <i class="fa-solid fa-pen-to-square btn_edit"></i>
                                    </div>
                                    <div class="btn">
                                        <i class="fa-solid fa-trash-can btn_delete"></i>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <!-- <tr>
                            <td class="column_1">fsdf</td>
                            <td class="column_2">fsfds</td>
                            <td class="column_3">fsdfs</td>
                            <td class="column_4">vcxv</td>
                            <td class="column_5">AT3, CLD, ST</td>
                            <td class="column_6">3.4</td>
                            <td class="column_7">77</td>
                            <td class="column_8">
                                <button>xem</button>
                                <button>sua</button>
                                <button>xoa</button>
                            </td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#ListStudent {
    display: flex;
    width: 100vw;

    .right {
        width: 100%;

        .content {
            background-color: #f0f1f3;
            margin: 20px;

            table {
                border-spacing: 0;

                tbody {
                    tr {
                        height: 40px !important;
                        border: none !important;
                    }

                    .black {
                        background-color: #f8f8f8;
                    }

                    .white {
                        background-color: #fff;
                    }
                }

                thead {
                    height: 30px;
                    background-color: #042954;
                    color: #fff;
                }

                th,
                td {
                    display: ruby;
                    text-align: center;
                }

                .column_1 {
                    width: 100px;
                }

                .column_2 {
                    width: 250px;
                }

                .column_3 {
                    width: 100px;
                }

                .column_4 {
                    width: 150px;
                }

                .column_5 {
                    width: 250px;
                }

                .column_6 {
                    width: 100px;
                }

                .column_7 {
                    width: 100px;
                }

                .column_8 {
                    width: 250px;

                    .btns {
                        height: 100%;
                        justify-content: center;
                        display: flex;

                        .btn {
                            display: flex;
                            justify-content: center;
                            padding: 5px;
                            margin: 0 5px;

                            &:hover {
                                background-color: #ccc;
                            }


                            .btn_edit {
                                color: #49a24c !important;
                            }

                            .btn_delete {
                                color: #d74739;
                            }
                        }

                    }
                }

            }
        }
    }
}
</style>