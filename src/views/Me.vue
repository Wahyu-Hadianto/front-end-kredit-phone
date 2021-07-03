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
         <form v-on:submit.prevent="submitForm">
           <div class="avatar mb-3">
               <img :src="form.avatar" alt="">
               <!-- <input type="file" v-on:change="avatarPreview">
               <span>Ukuran Gambar Maksimal : 1 MB</span>
               <span>Format Foto : .JPEG , .PNG</span>
               <span v-if="errors.avatar" class="error">
                   {{ errors.avatar.avatar[0] }}
               </span> -->
           </div>
           <div v-if="errors.form">
               <span v-for="(error,index) in errors.form" :key="index">
                   {{ error }}
               </span>
           </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="name" placeholder="name@example.com" v-model="form.name" required>
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
            <button class="btn btn-primary save" type="submit">Save <span><i class="far fa-save"></i></span></button>
        </div>
        </form>
       </div>
       <!-- ====================== NOTIFIKASI ======================== -->
       <div id="notifikasi" class="col col-8" v-if="sideActive == 'notifikasi'">
           <div class="notifikasi-empty" v-if="!notifikasi">
               <span><i class="far fa-bell"></i></span>
               <p>Belum ada pemberitahuan</p>
           </div>
       </div>
       <!-- =================== mY ORDER ================================= -->
       <div id="my-order" class="col col-9" v-if="sideActive == 'my-order'">
           <div class="my-order-empty" v-if="orders == 0">
             <span><i class="far fa-list-alt"></i></span>
             <p>Belum ada pesanan</p>
           </div>
            <div v-else class="order-item">
                <ul class="list-group">
                    <li class="list-group-item" v-for="(order,index) in orders" :key="index">
                        <section class="item-show">
                              <div class="date-order">
                            <span class="date-order">
                            {{ setDateOrder(order.created_at) }}
                        </span>
                        </div>
                        <div>
                            <span class="">
                             {{ order.product_name }}
                            </span>
                        </div>
                        <div class="detail">
                            <span class="badge bg-warning text-dark">
                                {{order.status}}
                            </span>
                            <button type="button" class="btn btn-info btn-sm ms-3" data-bs-toggle="collapse" :data-bs-target="'#collapseOrder'+index" aria-expanded="false" aria-controls="collapseExample">
                               Details
                            </button>
                        </div>
                        </section>
                        <div class="collapse mt-2" :id="'collapseOrder'+index">
                            <div class="card card-body order-detail">
                                <section class="image">
                                    <img :src="order.color.images[0].links" alt="">
                                </section>
                                <section class="description">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Price</th>
                                                <td>Rp {{ new Intl.NumberFormat('ID').format(order.price) }} ( {{order.ram_storage }} )</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Color</th>
                                                <td>{{ order.color.color_name }}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Installments</th>
                                                <td>{{ order.tenor }} x Rp {{ new Intl.NumberFormat('ID').format(order.angsuran) }}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Client Name</th>
                                                <td>{{order.order_name}}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Telepon</th>
                                                <td>{{order.telepon}}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Address</th>
                                                <td>{{order.address}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
       </div>
    </div>
</template>
<script>
export default {
    data : function(){
        return{
            avatar : '',
            form : {
                name : '',
                avatar : '',
                telepon : '',
                address : ''
            },
            orders : [],
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
        setForm : function(user=Object){
            this.form.name =  user.name
            this.form.avatar = user.avatar
            this.form.telepon = user.telepon
            this.form.address   = user.address
        } ,
        // avatarPreview : function(event){
        //     let self    = this; 
        //     let reader  = new FileReader()
        //     reader.onload = function(){
        //         self.avatar = reader.result
        //     }
        //     reader.readAsDataURL(event.target.files[0]);
        //     this.form.avatar = event.target.files[0]
        // },
        changeSide(side){
            this.sideActive = side
        },
        submitForm(){
           this.$store.dispatch('updateUser',this.form).finally(()=>{
                  const user = this.$store.getters.user 
                  this.setForm(user)
             })   
        },
        setDateOrder : function(dateOrder){
            const newDate = new Date(dateOrder);
            const year = newDate.getFullYear();
            const month = newDate.getMonth();
            const date = newDate.getDate();
            return `${year}/${month}/${date}`;
              
        }
        // async updateAvatar(){
        //      this.$store.dispatch('loading',true)
        //     let formData = new FormData();
        //     formData.append('avatar',this.form.avatar);
        //     const response = await axios.post('/user/avatar',formData,{
        //         headers : {'Content-Type': 'multipart/form-data'}
        //     }).catch(error =>{
        //             const errors = error.response.data.errors
        //             this.errors.avatar = errors
        //     }).finally(()=>{
        //          this.$store.dispatch('loading',false)
        //     })
        //     this.user.avatar = response.data.user.avatar
        //     this.$store.dispatch('login',response.data.user)
        // },

    },
    mounted(){
        this.$store.dispatch('user').then((response)=>{
            const user = response.data.user 
            this.setForm(user)
            this.orders = user.order
        })
        if(this.$route.params.tab){
            this.sideActive = this.$route.params.tab
        }
        
    }
}
</script>
<style lang="scss" scoped>
    @import '../sass/component/me.scss';
</style>