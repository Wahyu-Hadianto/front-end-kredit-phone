<template>
        <div class="sale-container">
        <!-- ========== CONTROL SLIDE =========== -->
        <section class="slide-header">
            <div><h3>Crazy Sale</h3></div>
            <div class="controls">
                <span class="prev-slide"
                        v-on:click="prevSlide">
                         <i class="fas fa-chevron-left"></i>
                </span>
                <span class="next-slide" 
                        v-on:click="nextSlide">
                        <i class="fas fa-chevron-right"></i>
                </span>
            </div>      
        </section>
        <!-- =========== SLIDE WRAPPPER =============== -->
        <section class="slide-container" ref="slideContainer">
            <div class="wrapper" :style="styleWrapper">
                <div class="item-slide" :style="styeObject" v-for="(product,index) in products" :key="index">
                    <div class="item-inner">
                       <PromoItem :product="product"></PromoItem>
                    </div>
                </div>
            </div>
        </section>
        <!-- <section>
           
        </section> -->
    </div>
</template>
<script>
import PromoItem from '@/components/PromoItem.vue';
import Axios from 'axios';
export default {
    data : function(){
        return {
            // ============= DATA PRODUCT ==============
            products: [],
            // ============= DATA SLIDE ================
            responsive : [
                {width : 100,items :2},
                {width : 575,items :3},
                {width : 991,items :4}
            ],
            containerWidth : 0,
            items : 0,
            totalSlide : 0,
            margin : 0,
            marginWrapper : 0,
            currentIndex : 1,
            itemSlideWidth : '',
            styleWrapper : {
                marginLeft : ''
            },
            styeObject : {
                width : '',
           
            }
        }
    },
     components :  {
        PromoItem
    },
    methods : {
        setItems : function(){
            for(let i = 0;i < this.responsive.length;i++){
                if(window.innerWidth > this.responsive[i].width){
                    this.items  = this.responsive[i].items
                }
            }
            this.totalSlide = Math.ceil(this.products.length / this.items) 
        },
        getWidthContainer : function(){
            this.containerWidth = this.$refs.slideContainer.clientWidth 
            this.setItemWidth();
        },
        setItemWidth :function(){
            this.styeObject.width = this.containerWidth  / this.items +'px';
        },
        nextSlide(){
            if(this.currentIndex < this.totalSlide){
                this.marginWrapper -= this.containerWidth 
                this.currentIndex += 1;
                this.startSlider();
            }
        },
        prevSlide(){
            if(this.currentIndex > 1){
            this.currentIndex -= 1;
            this.marginWrapper += this.containerWidth;
            this.startSlider();
            }
          
        },
        startSlider(){
            this.styleWrapper.marginLeft = this.marginWrapper + 'px';

        }
    },
    beforeCreate(){
         this.$store.dispatch('loading',true)
          Axios.get('/products/promo')
        .then(resp =>{
        this.products = resp.data.products
        })
        .catch(()=>{
            this.$store.commit('errorConn')
        })
        .finally(()=>{
        this.$store.dispatch('loading',false)
        this.setItems();
        this.getWidthContainer();
        })
        
    }
   
}
</script>
<style lang="scss" scoped>
   @import '../sass/component/slide_promo.scss';
</style>