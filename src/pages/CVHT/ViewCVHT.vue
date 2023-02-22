<script>
import { mapGetters } from "vuex";
import Menu from "../../component/Menu.vue"
export default {
    data() {
        return {
            dataV: {},
            gender: '',
            genderIsNam: true,
        }
    },
    components: {
        Menu
    },
    beforeMount() {
        this.dataV = JSON.parse(sessionStorage.getItem('infoLogin'))
        if (this.dataV.gender == 1) {
            this.gender = "Nam"
            this.genderIsNam = true
        } else if (this.dataV.gender == 2) {
            this.gender = "Nữ"
            this.genderIsNam = false
        }
    },
    mounted() {
        // this.dataV = this.getDataViewSv
    },
    computed: {
        ...mapGetters(['getDataViewSv'])
    },
    methods: {
        handleQ() {
            //  this.$router.replace('/sv/')
        }
    }
}
</script>
        
<template>
    <div id="ViewSinhVien">
        <div class="nav">
            <Menu></Menu>
        </div>
        <div class="right">
            <div class="content">
                <div class="avatar">
                    <div class="image_avatar">
                        <img v-if="this.genderIsNam" src="../../assets/avatar_male.jpg" alt="">
                        <img v-if="!this.genderIsNam" src="../../assets/avatar_female.png" alt="">
                    </div>
                </div>
                <div class="detail">
                    <div class="head">
                        <diV>
                            Thông Tin Giảng Viên
                        </diV>
                        <!-- <div class="quay_lai" @click="handleQ()">
                            Quay Lại
                        </div> -->
                    </div>
                    <div class="line_detail">
                        <div class="span1">
                            Mã Số:
                        </div>
                        <div class="span2">
                            {{ this.dataV.macb }}
                        </div>
                    </div>
                    <div class="line_detail">
                        <div class="span1">
                            Tên:
                        </div>
                        <div class="span2">
                            {{ this.dataV.name }}
                        </div>
                    </div>
                    <div class="line_detail">
                        <div class="span1">
                            Email:
                        </div>
                        <div class="span2">
                            {{ this.dataV.email }}
                        </div>
                    </div>
                    <div class="line_detail">
                        <div class="span1">
                            Giới Tính:
                        </div>
                        <div class="span2">
                            {{ this.gender }}
                        </div>
                    </div>
                    <div class="line_detail">
                        <div class="span1">
                            Ngày Sinh:
                        </div>
                        <div class="span2">
                            {{ this.dataV.date }}
                        </div>
                    </div>
                    <div class="line_detail">
                        <div class="span1">
                            Địa Chỉ:
                        </div>
                        <div class="span2">
                            {{ this.dataV.address }}
                        </div>
                    </div>
                    <div class="line_detail">
                        <div class="span1">
                            Số Điện Thoại:
                        </div>
                        <div class="span2">
                            {{ this.dataV.phone }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
        
<style lang="scss" scoped>
#ViewSinhVien {
    display: flex;
    width: 100vw;

    .right {
        min-height: 100vh;
        width: 100%;
        background-color: #f0f1f3;

        .content {
            background-color: #fff;
            display: flex;
            margin: 30px;

            .avatar {
                flex: 2;

                .image_avatar {
                    width: 225px;
                    height: 225px;
                    padding: 20px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .detail {
                flex: 8;

                .head {
                    font-size: 30px;
                    font-weight: 600;
                    margin-top: 20px;
                    position: relative;

                    .quay_lai {
                        position: absolute;
                        font-size: 20px;
                        right: 30px;
                        top: 0;
                        border-radius: 5px;
                        padding: 10px;
                        background-color: #d74739;
                        cursor: pointer;
                    }
                }

                .line_detail {
                    margin: 40px 0;

                    .span1 {
                        display: inline-block;
                        width: 300px;
                    }

                    .span2 {
                        display: inline-block;
                    }

                }
            }
        }
    }
}
</style>