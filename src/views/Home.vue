<template>
  <div class="home">
    <div v-if="errorConn">
       <ErrorConn></ErrorConn>
    </div>
    <div v-else>
      <SlideBanner></SlideBanner>
    <section class="content">
       <SlidePromo></SlidePromo>
        <NewProduct/>
    </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SlideBanner from '@/components/SlideBanner.vue';
import SlidePromo from '@/components/SlidePromo.vue';
import NewProduct from '@/components/NewProduct.vue';
import  ErrorConn from '@/components/ErrorConn.vue';
import {mapGetters} from 'vuex';
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
  beforeMount(){
    this.$store.dispatch('loading',true)
  },
  computed: {
        ...mapGetters({
          errorConn : 'getErrorConn',
          })
  },
  components: {
      SlideBanner,
      SlidePromo,
      NewProduct,
      ErrorConn

  }
}
</script>
<style scoped lang="scss">
     .content{  
       margin: 0px auto;
     }
</style>