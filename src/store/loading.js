export default {
    state : function(){
        return {
            loading :  false
        }
    },
    getters : {
        loading : state => {
            return state.loading
        }
    },
    mutations : {
        loading(state,status){
            state.loading = status
        }
    },
    actions : {
        loading({commit},status){
            commit('loading',status)
        }
    }
}