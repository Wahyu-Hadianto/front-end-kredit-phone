<template>
  <div id="app">
    <Loading></Loading>
    <Navbar :logout="logout"></Navbar>
    <router-view/>
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
    created(){
      // ============ Jika Ada Token =========
      if(this.$store.getters.hasToken){
            Axios.get('/user').
            then(response => {
              if(response.status == 200){
              this.$store.dispatch('login',response.data)
            }
          })
          .finally(()=>{
              this.$store.commit.loggedin
          })
      }
     
     
    },
  
    methods : {
      async logout(){
        const response = await Axios.get('/logout')
        if(response.status == 200){
          localStorage.removeItem('token')
          this.$store.dispatch('logout')
          this.$router.push('/')
        }
      }
    }
      
}
</script>
<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgba(221, 221, 221, 0.425);
  box-sizing: border-box;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
