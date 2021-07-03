import axios from "axios";
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
    },
    actions :{
        login({commit},form){
            return new Promise((resolve,reject) => {
                this.dispatch('loading',true)
                axios.post('/login',form)
                .then(response => {
                    const token = response.data.token
                    const user  = response.data.user
                    localStorage.setItem('token',token)
                    commit('token',token)
                    commit('user',user)
                    resolve(response)
                })
                .catch((error)=>{
                    localStorage.removeItem('token')
                    reject(error)
                })
                .finally(()=>{
                    this.dispatch('loading',false)
                })
            })

        },
        user({commit}){
            return new Promise((resolve,reject)=>{
                this.dispatch('loading',true)
                axios.get('/user')
                .then(response =>{
                    const user = response.data.user
                    commit('user',user)
                    resolve(response)
                })
                .catch((error)=>{
                    reject(error)
                })
                .finally(()=>{
                    this.dispatch('loading',false)
                })
            })
               
        },
        logout({commit}){
            return new Promise((resolve,reject)=>{
                this.dispatch('loading',true)
                axios.post('/logout')
                .then((response)=>{
                    localStorage.removeItem('token')
                    commit('loggedOut')
                    resolve(response)
                })
                .catch((error)=>{
                    reject(error)
                })
                .finally(()=>{
                    this.dispatch('loading',false)
                })
            })
            

            // const response =  await axios.get('/logout')
            // if(response.status == 200){
            //     localStorage.removeItem('token')
            //     commit('loggedOut')
            
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