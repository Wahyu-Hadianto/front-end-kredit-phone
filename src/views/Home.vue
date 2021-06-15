<template>
  <div class="home">
     <slideBanner></slideBanner>
    <section class="content">
       <slidePromo :productsPromo="productsPromo"></slidePromo>
        <NewProduct/>
    </section>
    <section>
      <div v-for="(product,index) in products" :key="index">
        <div>
          product name :  {{ product.product_name }}
        
          <div v-for="(color,index) in product.colors" :key="index">
             color        : {{ color.color_name }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import slideBanner from '@/components/SlideBanner.vue';
import slidePromo from '@/components/SlidePromo.vue';
import NewProduct from '@/components/NewProduct.vue';
import Axios from 'axios';
export default {
  name: 'Home',
  data : function(){
    return {
        slide : [
          require('@/assets/static/slide-1.png'),
          require('@/assets/static/slide-2.png'),
          require('@/assets/static/slide-3.png')
        
        ],
        'products' : [],
        'productsPromo' : []
      
    }
  },
  mounted(){
      Axios.get('/products')
      .then(resp => {
        this.products = resp.data.products
      })
    //  get promo products
    Axios.get('/products/promo')
    .then(resp =>{
      this.productsPromo = resp.data.products
      console.log(this.productsPromo)
    })
  },
  components: {
      slideBanner,
      slidePromo,
      NewProduct

  }
}
</script>
<style scoped lang="scss">
     .content{
       width: 90%;
       margin: 0px auto;
     }
</style>