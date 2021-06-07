<template>
    <div class="sale-item-box">
        <section class="sale-countdown">
            <span class="days">7 Day</span>
            <span class="hours">07</span> :
            <span class="minute">24</span> :
            <span class="second">45</span>
        </section>
        <section class="sale-image">
            <img :src="products.image" alt="" >
        </section>
        <section class="sale-text">
            <div class="name-product">
                Realme C21
            </div>
            <div class="varian-product">
                4GB+32GB
            </div>
            <div class="price-product">
                <div class="sale-price">
                    Rp 1.799.000
                </div>
                <div class="normal-price">
                    Rp .1.899.000
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    data : function(){
        return{
            products : 
                {image: require('@/assets/produk/realme-c21-1.png')}
            
        }
    }
}
</script>
<style scoped lang="scss">
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