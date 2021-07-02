<template>
  <div id="app">
    <Loading></Loading>
    <Navbar></Navbar>
    <div class="content">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Loading from '@/components/Loading.vue'

export default {
    components : {
      Navbar,
      Footer,
      Loading
    },
    beforeCreate(){
       // ============ Jika Ada Token =========
      if(this.$store.getters.hasToken){
          this.$store.dispatch('user')
      }
      
    }
      
}
</script>
<style lang="scss">
@import './sass/variable.scss';
$bg : rgba(236, 232, 232, 0.678);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $gray-100;
  box-sizing: border-box;
  overflow-x: hidden;
  .content{
    margin-top: 60px;
  }
}

</style>
