<template>
  <div class="home">
     <slideBanner></slideBanner>
    <section class="content">
        <slideSale/>
        <NewProduct/>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import slideBanner from '@/components/SlideBanner.vue'
import slideSale from '@/components/SlideSale.vue'
import NewProduct from '@/components/NewProduct.vue'

export default {
  name: 'Home',
  data : function(){
    return {
        slide : [
          require('@/assets/static/slide-1.png'),
          require('@/assets/static/slide-2.png'),
          require('@/assets/static/slide-3.png')
        
        ]
      
    }
  },
  components: {
      slideBanner,
      slideSale,
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