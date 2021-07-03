<template>
    <div id="order">
       <section class="product-order mb-3">
           <div class="image">
               <img :src="product.color[0].images[0].link" alt="">
           </div>
           <div class="description">
               <div class="name">
                   <h5>{{ product.product_name}}</h5>
                    <span>( {{ product.color[0].color_name }})</span>
               </div>
               <div class="price">
                    <span>      
                    </span>
                    <p v-if="product.price[0].price_promo"> 
                     Rp  {{ new Intl.NumberFormat('ID').format(product.price[0].price_promo) }}
                      <span>( {{product.price[0].ram_storage }} )</span>
                    </p>
                    <p v-else>
                       Rp   {{ new Intl.NumberFormat('ID').format(product.price[0].price_normal) }}
                        <span>( {{product.price[0].ram_storage }} )</span>
                    </p>
               </div>
               <div class="angsuran">
                   <p>Angsuran : {{ product.tenor[0].tenor  }} X Rp {{ new Intl.NumberFormat('ID').format(product.angsuran) }}</p>
               </div>
           </div>
       </section>
       <!-- ========================= Form area ================== -->
       <section class="form-order">
        <div class="mb-3 error" v-if="error" >
            <p>Harap isi semua bidang</p>
        </div>
        <div class="form-floating mb-3">
            <input type="text" :class="['form-control']" id="name" placeholder="name@example.com" v-model="form.name">
            <label for="name">Name</label>
        </div>
         <div class="form-floating mb-3">
            <input type="text" :class="['form-control']"  id="telepon" placeholder="name@example.com" v-model="form.telepon">
            <label for="telepon">Telepon</label>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Alamat</label>
            <textarea :class="['form-control']"  id="exampleFormControlTextarea1" rows="3" v-model="form.address">
            </textarea>
        </div>
         <section class="submit">
                <button type="button" class="btn btn-primary"
                v-on:click="submitForm">Order<span class="m-2"><i class="fas fa-sign-in-alt"></i></span> </button>
        </section>
       
       </section>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    data : function(){
        return {
            product : {
               
            },
            form : {
                name : '',
                telepon : '',
                address : '',
                product_id : '',
                price_id    : '',
                color_id    : '',
                tenor       : ''
            },
            error :false
        }
    },
    methods : {
       setForm : function(product,user){
           this.form.name       = user.name
           this.form.telepon    = user.telepon
           this.form.address    = user.address
           this.form.product_id = product.product_id
           this.form.price_id   = product.price[0].id
           this.form.color_id   = product.color[0].id
           this.form.tenor      = product.tenor[0].id
       },
        submitForm(){
            this.$store.dispatch('loading',true)
            axios.post('/user/order',this.form)
            .then(()=>{
                this.$router.push({name : 'Me',params : {tab :'my-order'}})
            })
            .catch(()=>{
                this.error = true
                })
            .finally(()=>{
                this.$store.dispatch('loading',false)
            })
        }
    },
    computed : {
        ...mapGetters({
            user : 'user'
        })
    },
    beforeMount(){
       
            const product = JSON.parse(sessionStorage.getItem('productOrder')) ;
            if(!product){
                this.$router.push('/')
            }

            this.product = product
            this.$store.dispatch('user').finally(()=>{
                let user = this.$store.getters.user
                this.setForm(product,user)
            })
    }
    
}
</script>
<style lang="scss" scoped>
    @import '../sass/component/order.scss';
</style>