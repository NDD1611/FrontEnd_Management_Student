<script>
import ServiceCVHT from "../service/ServiceCVHT.js"
export default {
    data() {
        return {
            listClass: [],
            currentClass: '',
            isShowHead: true
        }
    },
    async created() {
        let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
        let role = infoLogin.role
        if (role == "teacher") {
            let macb = infoLogin.macb
            console.log(role)
            let res = await ServiceCVHT.getAllClass(macb)
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
    },
    methods: {
        handleChange() {
            sessionStorage.setItem('currentClass', JSON.stringify(this.currentClass))
            this.$emit('changeClass', this.currentClass)
        }
    }
}

</script>

<template>
    <div id="Head" v-if="this.isShowHead">
        <label>Lớp: </label>
        <select name="lop" id="choose_lop" v-model="this.currentClass" @change="handleChange()">
            <option v-for="lop, index in this.listClass" :value="lop.malop">{{lop.malop}}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
#Head {
    margin-top: 10px;
    padding: 10px;

    #choose_lop {
        padding: 5px;
    }
}
</style>
