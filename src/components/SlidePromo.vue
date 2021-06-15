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
                <div class="item-slide" :style="styeObject" v-for="(product,index) in productsPromo" :key="index">
                    <div class="item-inner">
                       <PromoItem :product="product"></PromoItem>
                    </div>
                </div>
                <div class="item-slide" :style="styeObject">
                    <div class="item-inner">
                        
                    </div>
                </div>
                <div class="item-slide" :style="styeObject">
                    <div class="item-inner">
                        item 3
                    </div>
                </div>
                <div class="item-slide" :style="styeObject">
                    <div class="item-inner">
                        item 4
                    </div>
                </div>
                <div class="item-slide" :style="styeObject">
                    <div class="item-inner">
                        item 5
                    </div>
                </div>
                <div class="item-slide" :style="styeObject">
                    <div class="item-inner">
                        item 1
                    </div>
                </div>
                <div class="item-slide" :style="styeObject">
                    <div class="item-inner">
                        item 6
                    </div>
                </div>
                <div class="item-slide" :style="styeObject">
                    <div class="item-inner">
                        item 7
                    </div>
                </div>
                <div class="item-slide" :style="styeObject">
                    <div class="item-inner">
                        item 8
                    </div>
                </div>
            
            </div>
        </section>
        <!-- <section>
           
        </section> -->
    </div>
</template>
<script>
import PromoItem from '@/components/PromoItem.vue'
export default {
    data : function(){
        return {
            // ============= DATA PRODUCT ==============
            // productsPromo : [],


            // ============= DATA SLIDE ================
            containerWidth : 0,
            items : 4,
            margin : 10,
            marginWrapper : 0,
            currentIndex : 0,
            itemSlideWidth : '',
            styleWrapper : {
                marginLeft : ''
            },
            styeObject : {
                width : '',
           
            }
        }
    },
    props : {productsPromo: Array},
     components :  {
        PromoItem
    },
    methods : {
        getWidthContainer : function(){
            this.containerWidth = this.$refs.slideContainer.clientWidth 
            this.setItemWidth();
        },
        setItemWidth :function(){
            this.styeObject.width = this.containerWidth  / this.items +'px';
        },
        nextSlide(){
            this.marginWrapper -= this.containerWidth 
            this.currentIndex += 1;
            console.log(this.currentIndex)
            this.startSlider();
        },
        prevSlide(){
            if(this.currentIndex > 0){
            this.currentIndex -= 1;
            this.marginWrapper += this.containerWidth;
            this.startSlider();
            }
          
        },
        startSlider(){
            this.styleWrapper.marginLeft = this.marginWrapper + 'px'
        }
    },
    computed : {
         
    },
    mounted(){
        this.getWidthContainer();
    },
   
}
</script>
<style lang="scss" scoped>
    *{
        padding: 0;
        margin: 0;
       
    }
    .sale-container{   
        //=========== HEADER SLIDE =============//
        .slide-header{
            margin: 40px 0;
            display: flex;
            justify-content: space-between;
            .controls {
                .prev-slide,.next-slide{
                    margin: 0 20px;
                }
            }
        }
        //=========== Slide COntainer =============//
        .slide-container{
            width: 90vmax;
            background-color: blue  ;
            overflow: hidden;
            .wrapper{
            display: inline-flex;
            transition: all 1s  ease-in-out;
            .item-slide{
                 box-sizing: border-box;
                text-align: center;
                padding: 0 10px;
                  
                .item-inner{
                    background-color: rgb(255, 255, 255);
                   
                }
            }
        }
        }
    // ========= control slide ======== //
    .prev-slide,.next-slide{
        padding:10px 15px;
        font-size: 40px;
        cursor: pointer;
        border-radius: 15px;
        background-color: rgba($color: #a1a1a1, $alpha: 0.3);
    }
    }
</style>