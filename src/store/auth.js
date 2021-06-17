
export default{
    state : function(){
        return {
            token   : localStorage.getItem('token') || '',
            user    : null,
            isLogin : false
        }
    },
    mutations : {
        user(state,user){
          state.user = user
        },
        loggedIn(state){
            state.isLogin = true
        },
        loggedOut(state){
            state.isLogin = false
            state.user    = null
            state.token   = ''
        }
    },
    getters : {
        isLoggedIn: state => {
           return state.isLogin
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
            commit('loggedIn')
        },
        user({commit},user) {
            commit('user',user)
        },
        logout({commit}){
            commit('loggedOut')

        }
    }

}