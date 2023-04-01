<script>
import Toast from "./component/Toast.vue"
import '/node_modules/bootstrap/dist/js/bootstrap.min.js'

export default {
  components: {
    Toast
  }
  ,
  beforeMount() {
    let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
    if (!infoLogin) {
      this.$router.replace("/login")
    }
  }
}
</script>

<template>
  <Toast></Toast>
  <RouterView></RouterView>
</template>

<style lang="scss">
@import '/node_modules/bootstrap/dist/css/bootstrap.css';

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

}
</style>
