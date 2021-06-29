import axios from "axios"
export default{
    state : function(){
        return {
            productsOrigin : [],
            productsBeforeShow : [],
            products : [],
            mereks : [],
            merekActive : '',
            pagination : {  
                PageActive : 1,
                items     : 12,
                totalPage : 0,
            },
            searchQuery : ''

        }
    },
    getters : {
        getMereks : state => {
            return state.mereks
        },
        getMerekActive : state => {
            return state.merekActive
        },
        getProducts : state => {
            return state.products
        },
        getPagination : state => {
            return state.pagination
        },
        getSearchQuery : state => {
            return state.searchQuery
        }

    },
    mutations : {
        setResultSearch(state,result){
            state.productsBeforeShow = result.products
            state.searchQuery = result.query.search
            this.commit('startPagination')
        },
        setMereks(state,mereks){
            state.mereks = mereks
        },
        setProducts(state,products){
            state.productsBeforeShow = products
            this.commit('startPagination')
            state.searchQuery = ''
        },
        setProductsOrigin(state,products){
            state.productsOrigin = products
        },
        filterProducts(state,merek){
            state.productsBeforeShow = state.productsOrigin.filter(product => {
                  return  product.merek == merek
            });
            state.merekActive = merek
            this.commit('startPagination')
            state.searchQuery = ''
        },
        resetProducts(state){
            state.productsBeforeShow = state.productsOrigin
            state.merekActive = ''
            this.commit('startPagination')
            state.searchQuery = ''
        },
        startPagination(state){
            state.pagination.totalPage = Math.ceil(state.productsBeforeShow.length / state.pagination.items)
            this.commit('sliceProducts',1)
        },
        sliceProducts(state,index){
            state.products =  state.productsBeforeShow.slice((index-1 ) * state.pagination.items , index * state.pagination.items)
            state.pagination.PageActive = index
        }
    },
    actions : {
        async searchProducts({commit},param){
            const response = await axios.get('/products',{params : {search : param}})
            commit('setResultSearch',response.data)
        },
        async mereks({commit}){
            const response = await axios.get('/mereks')
            commit('setMereks',response.data.mereks)
        },
        async products({commit}){
            const response = await axios.get('/products')
            commit('setProducts',response.data.products)
            commit('setProductsOrigin',response.data.products)
            
        },
    }
}