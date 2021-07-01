import axios from "axios";
export default{
    state : function(){
        return {
            token   : localStorage.getItem('token') || null,
            user    : { name :''},
            error   : {
                email       : null,
                password    : null
            }
        }
    },
    mutations : {
        user(state,user){
          state.user = user
        },
        loggedOut(state){
            state.user    = null
            state.token   = ''
        },
        loginError(state,error){
            state.error.email = error.email
            state.error.password = error.password
        },
        token(state,token){
            state.token = token
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
        loginError     : state => {
            return state.error;
        }
    },
    actions :{
        async login({commit},form){
            const response = await axios.post('/login',form).catch(errors =>{
                const error = errors.response.data.errors
                commit('loginError',error)
            })
            const token = response.data.token
            const user  = response.data.user
            console.log(user)
            localStorage.setItem('token',token)
            commit('token',token)
            commit('user',user)

        },
        async user({commit}){
                this.dispatch('loading',true)
                const response = await axios.get('/user')
                const user = response.data.user
                commit('user',user)
                this.dispatch('loading',false)
        },
        async logout({commit}){
            const response =  await axios.get('/logout')
            if(response.status == 200){
                localStorage.removeItem('token')
                commit('loggedOut')
            }
        },
        async updateUser({commit},form){
            this.dispatch('loading',true)
            const response  = await axios.put('/user',form)
            const user = response.data.user
            commit('user',user)
            this.dispatch('loading',false)
        }

    }

}