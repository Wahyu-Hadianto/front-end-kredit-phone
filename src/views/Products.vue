<template >
<div>
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
        <section class="mb-3" v-if="searchQuery">
          <h3>Search result "{{ searchQuery }}"</h3>  
        </section>
        <section class="products-wrapper mb-4">
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
         <section class="pagination mb-4 justify-content-center" v-if="pagination.totalPage > 1">
            <div v-for="index in pagination.totalPage" :key="index">
                <button v-on:click="sliceProducts(index)" :class="['btn btn-outline-dark',{active : index == pagination.PageActive }]">{{ index }}</button>
            </div>
        </section>
        <section>
        </section>
    </div>
</div>
</template>
<script>
// import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
    data : function(){
        return {
          
        }
    },
    computed : {
        ...mapGetters({
            merekActive : 'getMerekActive',
            mereks : 'getMereks',
            products : 'getProducts',
            pagination : 'getPagination',
            searchQuery : 'getSearchQuery'
        })
    },
    mounted(){
        this.$store.dispatch('loading',true) 
        this.$store.dispatch('mereks')
        this.$store.dispatch('products').finally(()=>{
            // this.startPagination()
        this.$store.dispatch('loading',false)
        })
        if(this.$route.params.search){
            this.$store.dispatch('searchProducts',this.$route.params.search)
        }
    },
    methods : {
        filterProducts : function(merek){
            this.$store.commit('filterProducts',merek)
         
        },
        resetProducts : function(){
            this.$store.commit('resetProducts')

        },
        sliceProducts : function(index){
            this.$store.commit('sliceProducts',index)
        },
        searchInPage : function(){
            console.log(this.searchInput)
        },
    }
}
</script>
<style scoped lang="scss">
    @import '../sass/component/products.scss';
</style>