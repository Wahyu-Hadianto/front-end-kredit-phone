<template>
  <div id="app">
    <Loading></Loading>
    <Navbar :logout="logout"></Navbar>
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
import Axios from 'axios'

export default {
    components : {
      Navbar,
      Footer,
      Loading
    },
    beforeCreate(){
       // ============ Jika Ada Token =========
      if(this.$store.getters.hasToken){
            Axios.get('/user').
            then(response => {
              if(response.status == 200){
              this.$store.dispatch('login',response.data.user)
            }
          })
      }
      
    },
    mounted(){
     
      
    },
  
    methods : {
      async logout(){
        const response = await Axios.get('/logout')
        if(response.status == 200){
          localStorage.removeItem('token')
          this.$store.dispatch('logout')
          this.$router.push('/')
          console.log(this.$store.getters.isLoggedIn)
        }
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
