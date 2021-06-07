<template>
    <div id="new-product">
        <section class="new-product-wrapper">
        
                 <div class="product-item">
                     <section class="product-image">
                         <img :src="products.image" alt="">
                     </section>
                     <section class="product-text">
                         <div>
                             <p class="title">REalme C21</p>
                             <p>4 GB & 64 6GB</p>
                         </div>
                         <div>
                             <p class="price">Rp 1.799.000 </p>
                         </div>
                     </section>
                </div>
                 <div class="product-item">
                     
                </div>
                 <div class="product-item">
                     
                </div>
                 <div class="product-item">
                     
                </div>
            
        </section>
    </div>
</template>
<script>
export default {
    data : function(){
        return {
             products : 
                {image: require('@/assets/produk/realme-c21-1.png')}
        }
    }
    
}
</script>
<style scoped lang="scss">
    #new-product{
        margin: 40px 0;
        .new-product-wrapper{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            .product-item{
                height: 300px;
                display: flex;
                background-color: white;
                padding: 20px;
                border-radius:10px ;
            }
            .product-text{
                width: 50%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .title{
                    font-size: xx-large;
                }
                .price{
                    color: red;
                    font-size: x-large;
                }
            }
            .product-image {
                    width: 50%;
                img{
                    width: 100%;
                }
            }
        }
       
    }
</style>