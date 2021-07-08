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
                <img :src="slide" alt="" style="height: 450;">
            </div>
        </div>
    </div>
     <div class="controls">
          <div v-for="index in slides.length" 
              :key="index" 
              :class="['control-item',{active : index == indexSlide+1}]">

          </div>
    </div>
    </section>
    
</template>
<script>
export default {
    data : function(){
        return {
            slides : [
                require('@/assets/slide-banner/slide-rev-1.jpg'),
                require('@/assets/slide-banner/slide-rev-2.jpg'),
                require('@/assets/slide-banner/slide-rev-3.jpg'),
                require('@/assets/slide-banner/slide-rev-4.jpg'),
            ],
            marginLeft  : 0,
            indexSlide  : 0,
            startPost   : 0,
            wrapper : document.querySelector('.wrapper'),
            itemSlide : document.querySelector('item-slide'),
            
          
        }
    },
    methods : {
        touchStart : function(){
            this.startPost = this.getPosition(event)
            console.log(this.startPost)
        },
        getPosition : function(event){
            return event.touches[0].clientX 
        }  
        ,
        nextSlide : function(){
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
        slideInterval(){
            let self = this;
            setInterval(function(){
                    self.marginLeft -= 100
                    self.indexSlide += 1
                    if(self.indexSlide == self.slides.length ){
                        self.indexSlide = 0
                        self.marginLeft = 0
                    }
                   
            },3000)
        }
       
    },
    mounted(){
        
    }

    
    
}
</script>
<style scoped lang="scss">
@import '../sass/component/slide_banner.scss';
</style>