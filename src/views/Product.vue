<template>
    <div id="product" class="bg-light">
        <section>
             <div id="product-detail">
       <div class="product-wrapper">
        <!-- ======= Product IMage ============= -->
          <section>
              <div class="slide-image" :style="styleContainer">
                <div v-for="(color,index) in colors" :key="index">
                    <!-- image show -->
                    <div v-if="color.id == form.color_id" class="image-show-wrapper" :style="styleWrapper"> 
                         <div class="image-show" v-for="(image,index) in color.images" :key="index">    
                            <img :src="image.link" :style="styleContainer">
                        </div>
                    </div>
                    <!-- image thumbnail -->
                  <div class="image-wrapper" v-if="color.id == form.color_id">
                      <div v-for="(image,index) in color.images" :key="index">
                          <div :class="['image-tmb',{active : index == slideActive}]"
                                v-on:click="setSlider(index)">
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
                <select name="" v-on:change="setPriceMonthly" 
                :class="['form-select',{'is-invalid' : errors.tenor}]" 
                v-model="form.tenor">
                    <option disabled value="">Pilih Jangka Waktu</option>
                    <option :value="item.id" 
            
                        v-for="(item,index) in tenor" :key="index">
                        {{ item.tenor }}
                    </option>
                </select>
                <div class="invalid-feedback" v-if="errors.tenor">
                    {{ errors.tenor }}
                </div>
            </section>
            <section class="mb-4">
                <h5>Cicilan Perbulan</h5>
                <p class="price-monthly">
                     Rp {{ new Intl.NumberFormat('ID').format(form.angsuran)}}
                </p>
            </section>
            <section class="submit">
                <button type="button" class="btn btn-primary"
                v-on:click="checkForm">Order Now  <span class="m-2"><i class="fas fa-sign-in-alt"></i></span> </button>
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
                tenor           : '',
                angsuran        : 0
            },
            errors : {
                tenor : null
            },
            // =========== Data Product ============
            tenor : [],
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
        //  ========== DATA SLIDER ===================
        responsive : [
            {width : 100,imgWidth : 400},
            {width : 575,imgWidth : 500},
            {width : 767,imgWidth : 350},
            {width : 991,imgWidth : 500}
        ],
        styleContainer : {
            width : ''
        },
        styleWrapper : {
            marginLeft : ''
        },
        slideActive      : 0,
        slideWidth       : 0
        }
    },
    methods : {
        // ============= METHOD SLIDE IMAGE =========================
       setContainerWidth(){
           for(let i=0;i < this.responsive.length;i++){
               if(window.innerWidth > this.responsive[i].width)
                    this.slideWidth = this.responsive[i].imgWidth
                 }
                 this.styleContainer.width = this.slideWidth + 'px'
       },
        setSlider(index){
            this.styleWrapper.marginLeft = -(this.slideWidth * index) + 'px' ;
            this.slideActive =  index;
        },
        // =====================
        startCurrentPrice : function(start){
            let sesiCurrent = sessionStorage.getItem(this.params)
            if(sesiCurrent){
                this.form.konfigurasi_id = parseInt(sesiCurrent) 
            }else{
                this.form.konfigurasi_id = start
            }
        },
        setPriceMonthly : function(){
            let priceSelected = document.getElementById("price-selected").value;
            let tenorId = this.form.tenor 
            let tenor = this.tenor.filter(item =>{
                return item.id == tenorId
            })
           tenor = parseFloat(tenor[0].tenor)
            this.form.angsuran = Math.ceil(priceSelected / tenor) 
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
        checkForm : function(){
            if(this.form.tenor == ''){
                this.errors.tenor = 'Pilih ini terlebih dahulu'
            }else{
                this.submit();
            }
        },
        // ================= SUBMIT FORM ====================
        submit : function(){
            // cek user 
            let data  = {
                product_id       : this.product.product_id,
                product_name     : this.product.product_name,
                price      : {},
                color      : {},
                tenor      : {},
                angsuran   : this.form.angsuran
            }
            data.price = this.product.prices.filter(price => {
                return price.id == this.form.konfigurasi_id
            })
            data.color = this.product.colors.filter(color => {
                return color.id == this.form.color_id
            })
             let tenorId = this.form.tenor 
            let tenor = this.tenor.filter(item =>{
                return item.id == tenorId
            })
            data.tenor = tenor
            data = JSON.stringify(data)
            sessionStorage.setItem('productOrder',data);
            this.$router.push({name: 'Order'})
        }
    },
     beforeMount(){
  
     // ========== Setup Slide Container Width ============
            this.setContainerWidth();
    },
    mounted(){
        // ========== REQUEST PRODUUCT =========='
            this.$store.dispatch('loading',true)
            Axios.get('/tenor').then(resp => {
                this.tenor = resp.data.tenor
            });
            Axios.get('/product',{params : {
                slug : this.$route.params.slug
            }})
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
   @import '../sass/component/product';
</style>