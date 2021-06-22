<template>
    <div id="me" class="row">
       <div class="col col-3 side-bar bg-light">
           <li :class="{active : sideActive == 'my-account'}"
                v-on:click="changeSide('my-account')">
               <span><i class="far fa-user"></i></span> 
                My Account
            </li>
           <li :class="{active : sideActive == 'notifikasi'}"
                 v-on:click="changeSide('notifikasi')">
               <span><i class="far fa-bell"></i></span> 
               Notifikasi
            </li>
           <li :class="{active : sideActive == 'my-order'}"
                 v-on:click="changeSide('my-order')">
               <span><i class="far fa-list-alt"></i></span>
                My Order
            </li>
       </div>
       <!-- ================= MYaccount ================ -->
       <div class="col col-8" id="my-account" v-if="sideActive == 'my-account'">
           <div class="avatar mb-3">
               <img :src="avatar" alt="">
               <input type="file" v-on:change="avatarPreview">
               <span>Ukuran Gambar Maksimal : 1 MB</span>
               <span>Format Foto : .JPEG , .PNG</span>
               <span v-if="errors.avatar" class="error">
                   {{ errors.avatar.avatar[0] }}
               </span>
           </div>
           <div v-if="errors.form">
               <span v-for="(error,index) in errors.form" :key="index">
                   {{ error }}
               </span>
           </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="name" placeholder="name@example.com" v-model="form.name">
            <label for="name">Name</label>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="telepon" placeholder="name@example.com" v-model="form.telepon">
            <label for="telepon">Telepon</label>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Alamat</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div class="mb-3 text-center">
            <button class="btn btn-primary save" v-on:click="submitForm">Save <span><i class="far fa-save"></i></span></button>
        </div>
       </div>
       <!-- ====================== NOTIFIKASI ======================== -->
       <div id="notifikasi" class="col col-8" v-if="sideActive == 'notifikasi'">
           <div class="notifikasi-empty" v-if="!notifikasi">
               <span><i class="far fa-bell"></i></span>
               <p>Belum ada pemberitahuan</p>
           </div>
       </div>
       <!-- =================== mY ORDER ================================= -->
       <div id="my-order" class="col col-8" v-if="sideActive == 'my-order'">
           <div class="my-order-empty" v-if="!myOrder">
             <span><i class="far fa-list-alt"></i></span>
             <p>Belum ada pesanan</p>
           </div>
       </div>
       <router-view></router-view>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data : function(){
        return{
            user : '',
            avatar : '',
            form : {
                name : '',
                avatar : '',
                telepon : '',
                address : ''
            },
            sideActive : 'my-account',
            notifikasi : '',
            myOrder    : '',
            errors : {
                'avatar' : '',
                'form'   : ''
            }
        }
    },
    methods : {
        setForm : function(user){
            this.form.name =  user.name
            this.form.telepon = user.telepon
            this.form.address   = user.address
        } ,
        avatarPreview : function(event){
            let self    = this; 
            let reader  = new FileReader()
            reader.onload = function(){
                self.avatar = reader.result
            }
            reader.readAsDataURL(event.target.files[0]);
            this.form.avatar = event.target.files[0]
        },
        changeSide(side){
            this.sideActive = side
        },
        submitForm(){
         if(this.form.avatar){
            this.updateAvatar()  
         }else{
             this.updateUser();
         }
       
        },
        async updateAvatar(){
             this.$store.dispatch('loading',true)
            let formData = new FormData();
            formData.append('avatar',this.form.avatar);
            const response = await axios.post('/user/avatar',formData,{
                headers : {'Content-Type': 'multipart/form-data'}
            }).catch(error =>{
                    const errors = error.response.data.errors
                    this.errors.avatar = errors
            }).finally(()=>{
                 this.$store.dispatch('loading',false)
            })
            this.user.avatar = response.data.user.avatar
            this.$store.dispatch('login',response.data.user)
        },
        async updateUser(){
                this.$store.dispatch('loading',true)
               const response = await axios.put('/user',this.form)
                    .catch(error =>{
                         const errors = error.response.data.errors
                        this.errors.avatar = errors
                    }).finally(()=>{
                         this.$store.dispatch('loading',false)
                    })
                    this.setForm(response.data.user)   
        }

    },
    mounted(){
        this.$store.dispatch('loading',true)
        axios.get('/user')
        .then(resp => {
            this.user = resp.data.user
            this.avatar = resp.data.user.avatar
            this.setForm(resp.data.user)
        })
        .finally(()=>{
            this.$store.dispatch('loading',false)
        })
    }
}
</script>
<style lang="scss" scoped>
    @import '../sass/component/me.scss';
</style>