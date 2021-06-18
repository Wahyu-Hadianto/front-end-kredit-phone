<template>
    <div id="product-detail">
       <div class="product-wrapper">
        <!-- ======= Product IMage ============= -->
          <section>
              <div class="slide-image">
                  <div class="image-wrapper">
                      <div class="image">
                            
                          <img src="" alt="">
                      </div>
                  </div>
              </div>
          </section>
          <!-- ========== Product description ============= -->
          <section>
              <!-- FORM HIDEN -->
               <input type="hidden" v-model="form.product_id" :value="product.product_id">
              <!-- ========= PRODUCT NAME ============== -->
              <div class="product-title">
                <div>
                    <h2>
                        <span> {{ product.product_name }}</span>
                    </h2>
                </div>
              </div>
              <!-- ========= PRODCT PRICE ================ -->
              <div class="price-wrapper">
                <!-- <span>{{ product.prices[0].price_promo}}</span>
                <span>{{ product.prices[0].price_normal}}</span> -->
              </div>
            <!-- ============= PRODUCT SPESIFIKASI ============== -->
            <div class="spesifikasi">
                <span v-for="(icon,index) in speakIcon" :key="index">
                    <img :src="icon.img" alt="">
                </span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <!-- ======= PRODUCT COLORS ============== -->
                <div class="colors" v-for="(color,index) in colors" :key="index">
                    <button type="button" v-on:click="getCurrent">{{ color.color_name}}</button>
                </div>
          </section>
       </div>
    </div>
</template>
<script>
export default {
    props   : { product : Object,colors : Array},
    data : function(){
        return {
            speakIcon : [
                {img : require('@/assets/static/spesifikasi/processor.png')},
                {img : require('@/assets/static/spesifikasi/camera.png')},
                {img : require('@/assets/static/spesifikasi/battery.png')},
                {img : require('@/assets/static/spesifikasi/display.png')},
                {img : require('@/assets/static/spesifikasi/storage.png')},
            ],
            form : {

            },
            curenntColor : 0
        }
    }  ,
    methods : {
        getCurrent : function(){
            console.log(this.curenntColor)
        }
    } 
}
</script>
<style scoped lang="scss">
    #product-detail{
        .product-wrapper{
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
        .image-wrapper {
            .image {
                img {
                    width: 100%;
                }
            }
        }
        .price-wrapper{
            background-color: rgba(247, 147, 147, 0.205);
            padding: 10px;
            span:nth-child(1){
                color: red;
                font-size: x-large;
                font-weight: 500;
            }
            span:nth-child(2){
                font-size: small;
                color: rgb(58, 58, 58);
                text-decoration: line-through;
            }
        }
        .spesifikasi{
            img {
                max-width: 80px;
            }
        }
    }
</style>