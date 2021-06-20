
export default{
    state : function(){
        return {
            token   : localStorage.getItem('token') || null,
            user    : { name :''},
        }
    },
    mutations : {
        user(state,user){
          state.user = user
        },
        loggedOut(state){
            state.user    = null
            state.token   = ''
        }
    },
    getters : {
        isLoggedIn: state => {
           return !!state.token
        } ,
        hasToken : state => {
            return state.token
        },
        user      : state => {
          return state.user
        },
        error     : state => {
            return state.error;
        }
    },
    actions :{
        login({commit},user){
            commit('user',user)
           
        },
        user({commit},user) {
            commit('user',user)
        },
        logout({commit}){
            commit('loggedOut')
        }
    }

}