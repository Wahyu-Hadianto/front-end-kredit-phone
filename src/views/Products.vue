<template>
    <div id="products">
        <!-- =============== MEREK SELECT ===============  -->
        <section class="header">
            <div class="mereks">
                <li v-on:click="resetProducts"
                :class="{active : merekActive == ''}">Semua</li>
                <li v-for="(merek,index) in mereks" 
                :key="index"
                v-on:click="filterProducts(merek.name)"
                :class="{active : merekActive == merek.name }"> {{ merek.name }}</li>
            </div>
        </section>
          <!-- =============== LIST PRODUCTS ===============  -->
        <section class="products-wrapper">
            <div v-for="(product,index) in products" :key="index" class="product-item">
                <router-link :to="{name: 'Product',params :{ slug :product.slug }}">
                    <!-- === image item ===== -->
                    <div class="image">
                        <img :src="product.colors[0].images[0].link" alt="">
                    </div>
                     <!-- === text item ===== -->
                    <div class="text">
                        <div class="name">{{ product.product_name }}</div>
                        <div class="ram-storage">{{ product.prices[0].ram_storage }}</div>
                        <!-- === jika ada harga promo ======= -->
                        <div class="price-promo" v-if="product.prices[0].price_promo">
                          <p>Rp {{ new Intl.NumberFormat('ID').format(product.prices[0].price_promo) }}</p>
                          <p>{{ new Intl.NumberFormat('ID').format(product.prices[0].price_normal) }}</p>
                        </div>
                        <!-- ===== jika tidak ada ======= -->
                        <div class="price-normal" v-else>
                            <p>Rp {{ new Intl.NumberFormat('ID').format(product.prices[0].price_normal) }}</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data : function(){
        return {
            mereks : [],
            merekActive : '',
            productsOrigin : [],
            products : []
        }
    },
    beforeMount(){
         this.$store.dispatch('loading',true) 
    },
    mounted(){
        axios.get('/mereks')
        .then(resp => {
            this.mereks = resp.data.mereks
            
        })
        // ========== Request All products ===============
        axios.get('/products')
        .then(resp => {
            this.productsOrigin = resp.data.products
            this.products = resp.data.products    
        })
        .finally(()=>{
         this.$store.dispatch('loading',false) 
        })

       
    },
    methods : {
        filterProducts : function(merekName){
            this.products = this.productsOrigin.filter((merek)=>{
                return merek.merek == merekName
            })
            this.merekActive = merekName
        },
        resetProducts : function(){
            this.products = this.productsOrigin
            this.merekActive = ''
        }
    }
}
</script>
<style scoped lang="scss">
@import '../sass/variable.scss';
    #products {
        padding: 0 5%;
        .header{
            padding:15px 0;        
            }
        .mereks{
            color: $gray-900;
            display: flex;
            justify-content: center;
            li{
                padding: 5px 15px;
                background-color: white;
                border-radius: 8px;
                cursor: pointer;
                margin: 5px 15px;
                list-style-type: none;
                &.active{
                    border: 2px solid $kp-blue;
                }
            }
        }
        .products-wrapper{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 15px;
        }
        .product-item{
            box-shadow: black 8px 6px 8px -10px;
            border-radius: 10px;
            &:hover{
                transform: scale(1.01);
            }
            a{
                color:$gray-800;
                text-decoration: none;
            }
            .image{
                text-align: center;
                padding-top: 15px;
                img {
                    width: 70%;
                }
            }
            .text{
                text-align: center;
                .ram-storage{
                    margin-bottom: 15px;

                }
                .price-promo{
                    display: flex;
                    justify-content: center;
                    p{
                        margin: 5px;
                    }
                    p:nth-child(1){
                        color: red;
                    }
                    p:nth-child(2){
                        text-decoration: line-through;
                        font-size: small;
                    }
                }
            }
        }
    }
    // =========== MOBILE LANDSCAPE ==========

    @media (max-width: 767.98px) { 
        #products{
            .products-wrapper{
                grid-template-columns: 1fr 1fr 1fr;
            }
        }
    }
    // =========== MOBILE VIEW =====================

    @media (max-width: 575.98px) {
             #products{
            .products-wrapper{
                grid-template-columns: 1fr 1fr;
            }
        }
    }
</style>