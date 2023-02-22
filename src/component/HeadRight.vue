<script>
import Service from "../service/Service.js"
export default {
    data() {
        return {
            listClass: [],
            currentClass: '',
            isShowHead: true,
            nameuser: ''
        }
    },
    async created() {
    },
    beforeMount() {
        this.getData()
    },
    methods: {
        handleChange() {
            sessionStorage.setItem('currentClass', JSON.stringify(this.currentClass))
            this.$emit('changeClass', this.currentClass)
        },
        async getData() {
            let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
            this.nameuser = infoLogin.name
            let role = infoLogin.role
            if (role == "teacher") {
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
                }
            }
            if (role == "student") {
                this.isShowHead = false
            }
        }
    }
}

</script>

<template>
    <div id="Head" v-if="this.isShowHead">
        <div>
            <label>Lớp: </label>
            <select name="lop" id="choose_lop" v-model="this.currentClass" @change="handleChange()">
                <option v-for="lop, index in this.listClass" :value="lop.malop">{{ lop.malop }}
                </option>
            </select>
        </div>
        <!-- <div class="right">
            Xin Chào, {{this.nameuser}}
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
#Head {
    margin-top: 5px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;


    #choose_lop {
        padding: 0 5px;
        margin-left: 10px;
    }
}
</style>
