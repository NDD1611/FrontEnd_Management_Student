<script>
import Service from "../../service/Service.js"
import Menu from "../../component/Menu.vue"
import ChartPolar from "./ChartPolar.vue"
import ChartBar from './ChartBar.vue'
import HeadRight from "../../component/HeadRight.vue"
export default {
    components: {
        Menu,
        ChartPolar,
        ChartBar,
        HeadRight
    },
    data() {
        return {
            rerender: true,
            totalSv: 0,
            svNam: 0,
            svNu: 0,
            svKhac: 0,
            xs: 0,
            g: 0,
            k: 0,
            tb: 0,
            listClass: [],
            currentClass: '',
            listSV: []
        }
    },
    async beforeMount() {
        let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
        if (infoLogin.role == 'teacher') {
            let macb = infoLogin.macb
            let res = await Service.getAllClass(macb)
            if (res) {
                this.listClass = res.data
                let current = JSON.parse(sessionStorage.getItem('currentClass'))
                if (current) {
                    this.currentClass = current
                } else {
                    this.currentClass = res.data[0].malop
                }
                sessionStorage.setItem('currentClass', JSON.stringify(this.currentClass))
                sessionStorage.setItem('listClass', JSON.stringify(this.listClass))
            }
        }
        if (infoLogin.role == "student") {
            sessionStorage.setItem('currentClass', JSON.stringify(infoLogin.malop))
        }



        this.rerender = !this.rerender
        let currentClass = JSON.parse(sessionStorage.getItem("currentClass"))
        let res = await Service.getAllStudentLop(currentClass)
        let data = res.data
        this.listSV = data
        this.totalSv = data.length
        for (let sv of data) {
            switch (sv.gender) {
                case 1: this.svNam++
                    break
                case 2: this.svNu++
                    break
                case 3: this.svKhac++
                    break
            }
        }
        for (let sv of data) {
            if (sv.diemtb >= 3.6) {
                this.xs++
            } else if (sv.diemtb < 3.6 && sv.diemtb >= 3.2) {
                this.g++
            } else if (sv.diemtb < 3.2 && sv.diemtb >= 2.5) {
                this.k++
            } else if (sv.diemtb < 2.5) {
                this.tb++
            }
        }
        this.rerender = !this.rerender
    },
    methods: {
        async changeClass(malop) {
            // this.currentClass = malop
            this.rerender = !this.rerender
            this.totalSv = 0
            this.svNam = 0
            this.svNu = 0
            this.xs = 0
            this.g = 0
            this.k = 0
            this.tb = 0
            let currentClass = JSON.parse(sessionStorage.getItem("currentClass"))
            let res = await Service.getAllStudentLop(currentClass)
            let data = res.data
            this.listSV = data
            this.totalSv = data.length
            for (let sv of data) {
                switch (sv.gender) {
                    case 1: this.svNam++
                        break
                    case 2: this.svNu++
                        break
                    case 3: this.svKhac++
                        break
                }
            }
            for (let sv of data) {
                if (sv.diemtb >= 3.6) {
                    this.xs++
                } else if (sv.diemtb < 3.6 && sv.diemtb >= 3.2) {
                    this.g++
                } else if (sv.diemtb < 3.2 && sv.diemtb >= 2.5) {
                    this.k++
                } else if (sv.diemtb < 2.5) {
                    this.tb++
                }
            }
            this.rerender = !this.rerender
        }
    }
}
</script>

<template>
    <div id="Home">
        <div class="nav">
            <Menu></Menu>
        </div>
        <div class="right">
            <HeadRight @changeClass="changeClass"></HeadRight>
            <div class="content">
                <div id="HomeCVHT">
                    <div class="home1">
                        <div class="square bg-primary">
                            <div class="square_left ">
                                <div class="text_content">
                                    Tổng Số Sinh Viên:
                                </div>
                            </div>
                            <div class="slsv">
                                {{this.totalSv}}
                            </div>
                        </div>
                        <div class="square bg-yellow">
                            <div class="square_left">
                                <div class="text_content">
                                    Sinh Viên Nam:
                                </div>
                            </div>
                            <div class="slsv">
                                {{this.svNam}}
                            </div>
                        </div>
                        <div class="square bg-green">
                            <div class="square_left">
                                <div class="text_content">
                                    Sinh Viên Nữ:
                                </div>
                            </div>
                            <div class="slsv">
                                {{this.svNu}}
                            </div>
                        </div>
                        <!-- <div class="square bg-red">
                            <div class="square_left">
                                <div class="text_content">
                                    Sinh Viên Khác:
                                </div>
                            </div>
                            <div class="slsv">
                                {{this.svKhac}}
                            </div>
                        </div> -->
                    </div>
                    <div class="home2">
                        <div class="chart">
                            <div id="chart_left">
                                <ChartPolar :key="this.rerender" :xs="this.xs" :g="this.g" :k="this.k" :tb="this.tb">
                                </ChartPolar>
                            </div>
                            <div id="chart_right">
                                <ChartBar :key="this.rerender" :xs="this.xs" :g="this.g" :k="this.k" :tb="this.tb">
                                </ChartBar>
                            </div>
                        </div>
                        <div class="content">BIỂU ĐỒ THỂ HIỆN HỌC LỰC CỦA SINH VIÊN</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#Home {
    display: flex;
    width: 100vw;

    .right {
        border: 1px solid blue;
        width: 100%;
        background-color: #f0f1f3;

        .content {
            padding: 20px;

            #HomeCVHT {

                .bg-primary {
                    background-color: #0d6efd;
                }

                .bg-yellow {
                    background-color: #ffc107;
                }

                .bg-green {
                    background-color: #198754;
                }

                .bg-red {
                    background-color: #dc3545;
                }

                .home1 {
                    display: flex;
                    justify-content: space-between;

                    .square {
                        color: #fff;
                        display: flex;
                        align-items: center;
                        width: 25%;
                        border-radius: 5px;
                        margin: 10px;
                        padding: 20px 10px;

                        .square_left {
                            .icon {
                                display: flex;
                                justify-content: center;
                                padding: 10px;

                                i {
                                    font-size: 30px;
                                }
                            }
                        }

                        .slsv {
                            width: 50%;
                            display: flex;
                            margin-left: 20px;
                            font-size: 30px;
                            font-weight: 600;
                            justify-content: center;
                        }
                    }
                }

                .home2 {
                    padding: 50px;

                    .chart {
                        display: flex;
                        justify-content: space-around;

                        #chart_left {
                            width: 40%;
                        }

                        #chart_right {
                            width: 40%;
                        }
                    }

                    .content {
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>