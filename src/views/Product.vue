<template>
    <div id="product" class="container bg-light">
        <section>
             <div id="product-detail">
       <div class="product-wrapper">
        <!-- ======= Product IMage ============= -->
          <section>
              <div class="slide-image">
                <div v-for="(color,index) in colors" :key="index">
                    <!-- image show -->
                    <div v-if="index == currentColor"> 
                         <div class="image-show" v-for="(image,index) in color.images" :key="index">
                            <img :src="image.link" v-if="index == slideActive">
                        </div>
                    </div>
                    <!-- image thumbnail -->
                  <div class="image-wrapper" v-if="index == currentColor">
                      <div v-for="(image,index) in color.images" :key="index">
                          <div class="image-tmb">
                                <img :src="image.link">
                          </div>
                      </div>
                    </div>
                </div>
              </div>
          </section>
          <!-- ========== Product description ============= -->
          <section>
              <form action="" method="post">
                <input type="hidden" name="product_id" :value="product.product_id">
              <!-- ========= PRODUCT NAME ============== -->
              <div class="product-title">
                <div>
                    <h2>
                        <span> {{ product.product_name }}</span>
                    </h2>
                </div>
              </div>
              <!-- ========= PRODCT PRICE ================ -->
              <section class="mb-4">
                   <div class="prices">
                  <div v-for="(prices,index) in product.prices" :key="index">
                      <div v-if="prices.id == currentPrice" :class="['price-wrapper',{promo : prices.price_promo}]">
                           <span v-if="prices.price_promo">
                               Rp {{ new Intl.NumberFormat('ID').format(prices.price_promo) }}
                            </span>
                            <span>
                                Rp {{ new Intl.NumberFormat('ID').format(prices.price_normal) }}
                            </span>
                            <input type="hidden" :value="prices.price_promo || prices.price_normal" id="price-selected">
                      </div>
                  </div>
              </div>
              </section>
             
            <!-- ============= PRODUCT SPESIFIKASI ============== -->
            <section class="mb-4">
                 <div class="spesifikasi">
                <span>
                    <img :src="speakIcon.processor" alt="">
                    <p>{{ spesifikasi.processor }}</p>
                </span>
                <span>
                    <img :src="speakIcon.camera" alt="">
                    <p>{{ spesifikasi.camera }}</p>
                </span>
                <span>
                    <img :src="speakIcon.battery" alt="">
                    <p>{{ spesifikasi.battery }}</p>
                </span>
                <span>
                    <img :src="speakIcon.display" alt="">
                    <p>{{ spesifikasi.display }}</p>
                </span>
                <span>
                    <img :src="speakIcon.storage" alt="">
                    <p>{{ spesifikasi.ram_storage }}</p>
                </span>
            </div>
            </section>
           
            <!-- =========== PRODUCT RAM STORAGE =============== -->
            <section class="row mb-4 ram-storage-wrapper">
                <h5>Konfigurasi :</h5>
                 <div v-for="(prices,index) in product.prices" 
                    :key="index"
                    class="btn btn-outline-secondary col col-4 ram-storage m-2 active">
                    <input type="radio" name="ram_storage" 
                    :value="prices.id" 
                    :id="'ram-storage-'+index" 
                    :data-price-id="prices.id"
                    :checked="prices.id == currentPrice"
                    v-on:change="setCurrentPrice"
                    >
                    <label :for="'ram-storage-'+index">{{ prices.ram_storage }}</label>
            </div>
            </section>
           
            <!-- ======= PRODUCT COLORS ============== -->
            <section class="row color-wrapper mb-4">
                <h5>Warna :</h5>
                <div class="color col col-4 btn btn-outline-dark m-2" v-for="(color,index) in colors" :key="index">
                    <input type="radio" name="color" 
                    :id="'color-'+index" 
                    :checked="index == currentColor"
                    :data-index="index"
                    v-on:change="changeCurrentColor">
                    <label :for="'color-'+index">{{ color.color_name}}</label>
                </div>
            </section>
            <section class="mb-4">
                <h5>Lama Membayar</h5>
                <select name="" v-on:change="setPriceMonthly" class="form-select">
                    <option selected disabled>Pilih Lama Membayar</option>
                    <option value="3">3 Bulan</option>
                    <option value="6">6 Bulan</option>
                    <option value="9">9 Bulan</option>
                    <option value="12">12 Bulan</option>
                </select>
            </section>
            <section class="mb-4">
                <h5>Cicilan Perbulan</h5>
                <p class="price-monthly">
                     Rp {{ new Intl.NumberFormat('ID').format(priceMonthly)}}
                </p>
            </section>
              </form>
          </section>
       </div>
    </div>
        </section>
    </div>
</template>
<script>
import Axios from 'axios';
export default {
    data : function(){
        return{
            // =========== Data Product ============
            product : {},
            colors  : [],
            spesifikasi : [],
            params  : this.$route.params.slug,
            speakIcon : 
                {processor  : require('@/assets/static/spesifikasi/processor.png'),
                camera     : require('@/assets/static/spesifikasi/camera.png'),
                battery    : require('@/assets/static/spesifikasi/battery.png'),
                display    : require('@/assets/static/spesifikasi/display.png'),
                storage    : require('@/assets/static/spesifikasi/storage.png')}
            ,
        // ============= Data Methods ==============
         currentColor       : 0,
         currentPrice     : 0,
         priceMonthly     : 0,
         slideActive      : 0
        }
    },
    methods : {
        setCurrentPrice : function(event){
            this.currentPrice = event.target.dataset.priceId

        },
        startCurrentPrice : function(start){
            let sesiCurrent = sessionStorage.getItem(this.params)
            console.log(sesiCurrent)
            if(sesiCurrent){
                this.currentPrice = sesiCurrent
            }else{
                this.currentPrice = start
            }
        },
        changeCurrentColor : function(event){
            this.currentColor = event.target.dataset.index
        },
        setPriceMonthly : function(event){
            let priceSelected = document.getElementById("price-selected").value;
            let monthly = event.target.value
            this.priceMonthly = Math.ceil(priceSelected / monthly) 
        }
    },
    mounted(){
        Axios.get('/product/'+this.params)
        .then(resp => {
            this.product     = resp.data.product
            this.colors      = this.product.colors
            this.spesifikasi = resp.data.product.spesifikasi
            let start = resp.data.product.prices[0].id 
            this.startCurrentPrice(start)
        })
    }
}
</script>
<style scoped lang="scss">
      #product-detail{
        .product-wrapper{
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
        .slide-image {
            text-align: center;
            .image-show{
                
                img{
                    width: 80%;
                }
            }
            .image-wrapper{
                display: inline-flex;
                width: 80%;
                .image-tmb {
                    width: 100%;
                    img {
                        width: 100%;
                    }
                }
            }
        }
       
        .price-wrapper{
            font-size: x-large;
            font-weight: 500;
        }
        .price-wrapper.promo{
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
            display: inline-flex;
            width: 100%;
            justify-content: space-between;
            text-align: center;
            font-size: small;
            img {
                max-width: 40px;
            }
        }
        .ram-storage-wrapper{
            .ram-storage{
                padding: 0;
                input{
                    position: absolute;
                    opacity: 0;
                }
                label{
                    width: 100%;
                    padding: 5px;
                }
            }
        }
        .color-wrapper{
            .color{
                padding: 0;
                cursor: pointer;
                input{
                    position: absolute;
                    opacity: 0;
                }
                label{
                    padding: 5px;
                    width: 100%;
                    cursor: pointer;
                }
            }
        }
        .price-monthly{
            font-size: xxx-large;
            padding: 0px 10px;
            color: red;
        }
    }
</style>