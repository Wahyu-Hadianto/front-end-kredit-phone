<template>
    <div id="new-product">
        <section class="mb-3">
            <h2>New Product</h2>
        </section>
        <section class="new-product-wrapper">
            <div v-for="(product,index) in products" :key="index" class="product-inner">
                <router-link :to="{name : 'Product',params : {slug : product.slug}}" >
                    <div class="product-item">
                     <section class="product-image">
                         <img :src="product.colors[0].images[0].link" >
                     </section>
                     <section class="product-text">
                         <div>
                             <p class="title">{{ product.product_name}}</p>
                             <p>{{ product.prices[0].ram_storage}}</p>
                         </div>
                         <div v-if="product.prices[0].price_promo" class="price-promo">
                             <p class="price">Rp {{ new Intl.NumberFormat('ID').format(product.prices[0].price_promo) }}</p>
                             <p>{{ new Intl.NumberFormat('ID').format(product.prices[0].price_normal)}}</p>
                         </div>
                         <div v-else>
                             <p>Rp {{ new Intl.NumberFormat('ID').format(product.prices[0].price_normal) }}</p>
                         </div>
                     </section>
                </div>
                </router-link>   
            </div>
        </section>
    </div>
</template>
<script>
import Axios from 'axios'
export default {
    data : function(){
        return {
             products : []
                
        }
    },
    beforeMount(){
         this.$store.dispatch('loading',true)
    },  
    mounted(){
        Axios.get('/products/take/4')
      .then(resp => {
        
        this.products = resp.data.products
      })
      .finally(()=>{
          this.$store.dispatch('loading',false)
      })
    }
    
}
</script>
<style scoped lang="scss">
   @import '../sass/component/new_product.scss';
</style>