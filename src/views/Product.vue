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
                    <div v-if="color.id == form.color_id"> 
                         <div class="image-show" v-for="(image,index) in color.images" :key="index">
                            <img :src="image.link" v-if="index == slideActive">
                        </div>
                    </div>
                    <!-- image thumbnail -->
                  <div class="image-wrapper" v-if="color.id == form.color_id">
                      <div v-for="(image,index) in color.images" :key="index">
                          <div :class="['image-tmb',{active : index == slideActive}]">
                                <img :src="image.link">
                          </div>
                      </div>
                    </div>
                </div>
              </div>
          </section>
          <!-- ========== Product description ============= -->
          <section>
                <input type="hidden" v-model="form.product_id" >
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
                      <div v-if="prices.id == form.konfigurasi_id" :class="['price-wrapper',{promo : prices.price_promo}]">
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
                    :class="['btn','btn-select','col','col-4','ram-storage','m-2',{select : prices.id == form.konfigurasi_id}]">
                    <input type="radio" name="ram_storage" 
                    :value="prices.id" 
                    :id="'ram-storage-'+index" 
                    :data-price-id="prices.id"
                   v-model="form.konfigurasi_id"
                    >
                    <label :for="'ram-storage-'+index">{{ prices.ram_storage }}</label>
            </div>
            </section>
           
            <!-- ======= PRODUCT COLORS ============== -->
            <section class="row color-wrapper mb-4">
                <h5>Warna :</h5>
                <div :class="['color','col','col-4','btn','btn-select','text-dark','m-2',{select : color.id == form.color_id}]" v-for="(color,index) in colors" :key="index">
                    <input type="radio" name="color" 
                    :id="'color-'+index" 
                    :value="color.id"
                    v-model="form.color_id">
                    <label :for="'color-'+index">{{ color.color_name}}</label>
                </div>
            </section>
            <!-- ========= SELECT TENOR ============== -->
            <section class="mb-4">
                <h5>Jangka Waktu Angsuran</h5>
                <select name="" v-on:change="setPriceMonthly" class="form-select" v-model="form.tenor">
                    <option selected disabled value="0">Pilih Jangka Waktu</option>
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
            <section class="submit">
                <button type="button" class="btn btn-primary"
                v-on:click="submit">Ajukan Cicilan</button>
            </section>
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
            // =========== form data ==============
            form : {
                product_id      : 0,
                konfigurasi_id  : 0,
                color_id        : 0,
                tenor           : 0
            },
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
         priceMonthly     : 0,
         slideActive      : 0,
        
        }
    },
    methods : {
        startCurrentPrice : function(start){
            let sesiCurrent = sessionStorage.getItem(this.params)
            if(sesiCurrent){
                this.form.konfigurasi_id = parseInt(sesiCurrent) 
            }else{
                this.form.konfigurasi_id = start
            }
        },
        setPriceMonthly : function(event){
            let priceSelected = document.getElementById("price-selected").value;
            let monthly = event.target.value
            this.priceMonthly = Math.ceil(priceSelected / monthly) 
        },
        setDataProduct : function(data){
            this.product = data.product
            this.colors  = data.product.colors
            this.spesifikasi = data.product.spesifikasi
            this.form.product_id = data.product.product_id
            this.form.color_id = data.product.colors[0].id
            let start = data.product.prices[0].id 
            this.startCurrentPrice(start)

        },
        submit : function(){
            console.log(this.form)
        }
    },
     beforeMount(){
    this.$store.dispatch('loading',true)
    },
    mounted(){
            Axios.get('/product/'+ this.params)
            .then(resp => {
                this.setDataProduct(resp.data)
            })
            .finally(()=>{
                this.$store.dispatch('loading',false)
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
                    &.active{
                        border: 2px solid darkgray;
                        border-radius: 10px;
                    }
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
        .btn-select{
            border: 1px rgb(197, 196, 196) solid;
            
            :hover{
                background-color: rgba(236, 235, 235, 0.527);
                cursor: pointer;
            }
            &.select{
                border: solid 2px rgb(119, 118, 118);

            }
        }
    }
</style>