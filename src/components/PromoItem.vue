<template>
    <router-link :to="{name: 'Product',params : { slug : product.slug } }" class="link-product">
    <div class="sale-item-box"
    v-on:click="setCurrentPrice(product.slug,product.prices[0].id)">
        <section class="sale-countdown">
            <span class="days">7 Day</span>
            <span class="hours">07</span> :
            <span class="minute">24</span> :
            <span class="second">45</span>
        </section>
        <section class="sale-image">
            <img :src="product.colors[0].images[0].link" alt="" >
        </section>
        <section class="sale-text">
            <div class="name-product">
                    {{ product.product_name }}
            </div>
            <div class="varian-product">
                    {{ product.prices[0].ram_storage }}
            </div>
            <div class="price-product">
                <div class="sale-price">
                    {{ product.prices[0].price_promo }}
                </div>
                <div class="normal-price">
                    {{ product.prices[0].price_normal }}
                </div>
            </div>
        </section>
    </div>
    </router-link>
</template>
<script>
export default {
    props : {product: Object},
    data : function(){
        return{
            products : 
                {image: require('@/assets/produk/realme-c21-1.png')}
            
        }
    },
    methods : {
        setCurrentPrice : function(key,value){
          sessionStorage.setItem(key,value)
            
        }
    }
}
</script>
<style scoped lang="scss">
    .link-product{
        display: block;
        text-decoration: none;
       
    }
    .sale-item-box{
        padding: 10px 0;
        // ========= COUNTDOWN ======== //
        .sale-countdown{
            font-weight: 600;
            color: red;
            .hours,.minute,.second{
                padding: 5px;
                border-radius: 5px;
                color: white;
                background-color: red;
                margin: 0px 5px;
            }
        }
        // =========== IMage ==============
        .sale-image{
           img {
               width: 90%;
           }
        }
        // ============= Deskripsi ============
        .sale-text {
            .price-product{
                display: flex;
                justify-content: center;
                .normal-price,.sale-price{
                    margin: 0px 5px;
                    align-items: center;
                }
                .sale-price{
                    font-weight: 600;
                    font-size: large;
                    color: red;
                }
            }
        } 
    }
</style>