<script>
import Menu from "./component/Menu.vue"
export default {
    components: {
        Menu
    }
}
</script>

<template>
    <div id="ViewSv">
        <div class="nav">
            <Menu></Menu>
        </div>
        <div class="right">
        </div>
    </div>
</template>

<style lang="scss" scoped>
#ViewSv {
    display: flex;
    width: 100vw;

    .right {
        border: 1px solid blue;
        width: 100%;
        background-color: #f0f1f3;
    }
}
</style>