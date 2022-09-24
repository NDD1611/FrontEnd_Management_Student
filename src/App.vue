<script>
export default {

  beforeMount() {
    let infoLogin = JSON.parse(sessionStorage.getItem('infoLogin'))
    if (!infoLogin) {
      this.$router.replace("/login")
    }
  }
}
</script>

<template>
  <RouterView></RouterView>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>
