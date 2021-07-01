<template>
    <div id="register" class="justify-content-center">
      <div class="register-wrapper bg-light container">
         
       <div class="header text-center mb-4">
          <h2><span>SIGN UP</span></h2>  
       </div>
       <div class="form-area">
           
                <!-- ============= USERNAME ============= -->
                <div class="form-floating mb-3">
                    <input type="text" :class="['form-control',{'is-invalid' : error.name}]" id="floatingUsername" placeholder="Nama" v-model="form.username">
                    <label for="floatingUsername">Nama</label>
                    <!-- errror feedback name -->
                    <div class="invalid-feedback" v-if="error.name">
                        <p v-for="(error,index) in error.name" :key="index">
                            {{ error }}
                        </p>
                    </div>
                </div>
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
                <!-- ================ PASSWORD CONFIRMATION ================     -->
                <div class="form-floating mb-3">
                    <input type="password" :class="['form-control',{'is-invalid' : error.password}]" id="floatingPassword" placeholder="Password Confirmation"
                    v-model="form.passwordConfirmation">
                    <label for="floatingPassword">Password Confirmation</label>
                     <!-- error feedback email -->
                     <div class="invalid-feedback" v-if="error.password">
                        <p v-for="(error,index) in error.password" :key="index">
                            {{ error }}
                        </p>
                    </div>
                </div>
                <div class="mb-3 text-center">
                    <button type="submit" class="btn btn-primary submit"
                    v-on:click="register">Sign Up <span><i class="fas fa-sign-in-alt"></i></span></button>
                </div>
         
        </div>
        <!--  -->
        <div class="text-center">
            <p>already have an account ?</p>
            <router-link to="/login">Sign In</router-link>
        </div>
      </div>
    </div>
</template>
<script>
import Axios from 'axios'
export default {
    data : function(){
        return {
            form : {
                username : '',
                email    : '',
                password : '',
                passwordConfirmation    : ''
            },
            error : {
                name    : null,
                email   : null,
                password : null,
                password_confirmation : null
            }
        }
    },
    methods : {
       async register(){
           this.$store.dispatch('loading',true)
           const response = await Axios.post('/register',
            {
                name        : this.form.username,
                email       : this.form.email,
                password    : this.form.password,
                password_confirmation : this.form.passwordConfirmation
            }).catch(error =>{
                const errors = error.response.data.errors
                this.error.name = errors.name
                this.error.email = errors.email
                this.error.password = errors.password
                // reset password
                this.form.password = '',
                this.form.passwordConfirmation = ''
                this.$store.dispatch('loading',false)
            });
            if(response.status == 201){
                this.$store.dispatch('loading',false)
                this.$router.push('/login');
            } 
        },
        cekState : function(){
            console.log(this.$store.state.auth.error)
        }
    }
}
</script>
<style scoped lang="scss">
     @import '../sass/component/register.scss';
</style>