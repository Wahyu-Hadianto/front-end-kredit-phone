<template>
    <div id="login" class="justify-content-center">
        <div class="register-wrapper bg-light container">
            <div class="header text-center mb-4">
                    <h2><span>SIGN IN</span></h2>  
            </div>
            <div class="form-area">
                 <!-- =============  EMAIL ================= -->
                <div class="form-floating mb-3">
                    <input type="email" :class="['form-control',{'is-invalid' : error.email}]" id="floatingInput" placeholder="name@example.com" 
                    v-model="form.email">
                    <label for="floatingInput">Email address</label>
                    <!-- error feedback email -->
                     <div class="invalid-feedback" v-if="error.email">
                        <p v-for="(error,index) in error.email" :key="index">
                            {{ error }}
                        </p>
                    </div>
                </div>
                <!-- =============== PASSWORD ================== -->
                <div class="form-floating mb-3">
                    <input type="password" :class="['form-control',{'is-invalid' : error.password}]" id="floatingPassword" placeholder="Password"
                    v-model="form.password">
                    <label for="floatingPassword">Password</label>
                     <!-- error feedback password -->
                     <div class="invalid-feedback" v-if="error.password">
                        <p v-for="(error,index) in error.password" :key="index">
                            {{ error }}
                        </p>
                    </div>
                </div>
                <div class="mb-3 text-center">
                    <button type="submit" class="btn btn-primary submit"
                    v-on:click="login">Sign In <span><i class="fas fa-sign-in-alt"></i></span></button>
                </div>
            </div>
            <div class="text-center">
                <p>don't have an account yet?</p>
                <router-link to="/register">Sign Up</router-link>
            </div>
        </div>
    </div>
</template>
<script>
// import Axios from 'axios'
import {mapGetters} from 'vuex';
export default {
    data : function(){
        return {
            form : {
                email       : '',
                password    : ''
            },
           
        }
    },
    computed : {
        ...mapGetters({
            error : 'loginError'
        })
    },
    methods : {
        login : function(){
            let form  = this.form
            this.$store.dispatch('login',form).catch(()=>{
                this.form.password = ''
               
            })
            .finally(()=>{
                this.$router.push({name : 'Home'})
            })
        }
        //  async login() {
        //      this.$store.dispatch('loading',true)
        //      const response = await Axios.post('/login',{
        //          email : this.form.email,
        //          password : this.form.password
        //      }).catch(error => {
        //          const errors = error.response.data.errors
        //          this.error.email = errors.email
        //          this.error.password = errors.password
        //         // reset form 
        //         this.form.password = ''
        //         this.$store.dispatch('loading',false)
        //      });
        //      if(response.status == 200){
        //          localStorage.setItem('token',response.data.token)
        //          this.$store.dispatch('login',response.data.data)
        //          this.$store.dispatch('loading',false)
        //          this.$router.push({name : 'Home'})
                
        //      }
        //      this.$store.dispatch('loading',false)
        // }
        
    }
}
</script>
<style lang="scss" scoped>
    @import '../sass/component/login.scss';
</style>