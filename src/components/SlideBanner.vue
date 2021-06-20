<template>
    <section>
        <div class="slide-banner">
            <span class="prev-slide"
                v-on:click="prevSlide">
                <i class="fas fa-chevron-left"></i>
            </span>
            <span class="next-slide" 
                    v-on:click="nextSlide">
                <i class="fas fa-chevron-right"></i>
            </span>
        <div class="wrapper" :style="{'marginLeft' : marginLeft + 'vw'}">
            <div class="item-slide" v-for="(slide, index) in slides" :key="index"
               ref="itemSlide">
                <img :src="slide" alt="">
            </div>
        </div>
    </div>
     <div class="controls">
          
        </div>
    </section>
    
</template>
<script>
export default {
    data : function(){
        return {
            slides : [
                require('@/assets/slide-banner/slide-1.jpg'),
                require('@/assets/slide-banner/slide-2.jpg'),
                require('@/assets/slide-banner/slide-3.jpg'),
                require('@/assets/slide-banner/slide-4.jpg'),
            ],
            marginLeft : 0,
            indexSlide : 0,
            wrapper : document.querySelector('.wrapper'),
            itemSlide : document.querySelector('item-slide'),
            
          
        }
    },
    methods : {
        nextSlide(){
            if(this.indexSlide < this.slides.length -1){
                 this.marginLeft -= 100
                 this.indexSlide += 1
               
            }
        },
        prevSlide(){
            if(this.indexSlide > 0){
                this.marginLeft += 100
                this.indexSlide -=1
            }
           
        },
       
    }

    
    
}
</script>
<style scoped lang="scss">
@import '../sass/component/slide_banner.scss';
</style>