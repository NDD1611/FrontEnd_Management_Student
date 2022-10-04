<script>
import Menu from "../../component/Menu.vue"
import { mapGetters, mapMutations } from 'vuex'
export default {

    components: {
        Menu,
    },
    methods: {
        ...mapMutations(['showToast']),
        testFunction() {
            let infoToast = {
                type: "success",
                mes: "Ban da dang nhap thanh cong"
            }
            this.showToast(infoToast)
            // let date = new Date()
            // console.log(date.getTime())
            // let dat = new Date(1663814434940 - 1663814034940)
            // console.log(dat.toLocaleString())
            // const date1 = new Date('7/13/2010');
            // const date2 = new Date('12/15/2010');
            // const diffTime = Math.abs(date2 - date1);
            // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60));
            // console.log(diffTime + " milliseconds");
            // console.log(diffDays + " days");
        }
    }
}
</script>
    
<template>
    <div id="Announce">
        <div class="nav">
            <Menu></Menu>
        </div>
        <div class="right">
            <button @click="testFunction()">click time</button>
        </div>
    </div>
</template>
    
<style lang="scss" scoped>
#Announce {
    display: flex;
}
</style>