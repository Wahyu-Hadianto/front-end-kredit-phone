<template>
    <router-link :to="{name: 'Product',params : { slug : product.slug } }" class="link-product">
    <div class="sale-item-box"
    v-on:click="setCurrentPrice(product.slug,product.prices[0].id)">
        <section class="sale-countdown">
            <component-countdown></component-countdown>
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
                   Rp {{ new Intl.NumberFormat('ID').format(product.prices[0].price_promo)  }}
                </div>
                <div class="normal-price">
                    {{ new Intl.NumberFormat('ID').format(product.prices[0].price_normal) }}
                </div>
            </div>
        </section>
    </div>
    </router-link>
</template>
<script>
import componetCountdown from '@/components/component-countdown'
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
    },
    components : {
        'component-countdown'   : componetCountdown
    }
}
</script>
<style scoped lang="scss">
   @import '../sass/component/promo_item.scss';
</style>