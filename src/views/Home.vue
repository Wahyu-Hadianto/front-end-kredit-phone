<template>
  <div class="home">
     <slideBanner></slideBanner>
    <section class="content">
       <slidePromo></slidePromo>
        <NewProduct/>
    </section>
    <section>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import slideBanner from '@/components/SlideBanner.vue';
import slidePromo from '@/components/SlidePromo.vue';
import NewProduct from '@/components/NewProduct.vue';
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
      
    }
  },
  methods : {
  },
  beforeMount(){
    this.$store.dispatch('loading',true)
  },
  mounted(){
    //  get promo products
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
       
       margin: 0px auto;
     }
</style>