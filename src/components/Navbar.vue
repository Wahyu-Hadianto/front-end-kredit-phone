<template>
    <nav>
        <!-- ======== NAV LEFT AREA ========= -->
        <section id="nav-left">
            <!-- ========= TOGGLE NAV MOBILE =========== -->
            <div :class="['toggle-nav',{active : navStatus}]" v-on:click="navToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <!-- NAV TITLE -->
            <div class="app-title">
                    <h1 v-if="!navStatus"><span>Phone</span>Credit</h1>
            </div>
            <!-- NAV LIST ITEM -->
            <div class="nav-list" :class="{active : navStatus}" v-on:click="disableNav">
                <router-link to="/" >Home</router-link>
                <router-link to="/products" >Product</router-link>
                <a href="#">About Us</a>
                <a href="#">Contact Us</a>
                <div class="auth-mobile">
                    <router-link to="/login">Login</router-link> |
                    <router-link to="/register">Register</router-link>
                </div>
            </div>
        </section>
        <!-- =========== NAV RIGHT AREA ================ -->
        <section id="nav-right">
            <!-- seacrh mobile -->
            <div class="on-mobile" v-if="!searchStatus">
                <div class="toggle-search" v-on:click="searchToggle">
                    <i class="fas fa-search" ></i>
                </div>
                <!-- ==================== ME ============================ -->
                <div class="me">
                    <router-link to="/me" >
                        <div v-if="isLoggedIn">         
                            <img :src="user.avatar">
                        </div>
                        <div v-else>
                            <i class="far fa-user"></i>
                        </div>
                    </router-link>
                </div>
            </div>
            <!-- search desktop -->
            <div class="on-desktop search-box" :class="{ active : searchStatus}">
                <div class="search-bar">
                     <input type="search" v-model="searchInput" placeholder="Search here!!" autofocus required>
                <span v-on:click="searchHandle"><i class="fas fa-search btn-search"></i></span>
                </div> 
                <div v-if="searchStatus">
                    <button class="btn btn-light" type="button" v-on:click="searchToggle">Batal</button>
                </div>
            </div>
            <!-- ==== ROUTE AUTH === -->
            <div class="on-desktop link-auth">
                <!-- ===== JIKA USER LOGIN ======= -->
                <div v-if="isLoggedIn">
                   <div class="dropdown">
                    <button class="btn btn-outline-light dropdown-toggle text-dark" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                       {{ user.name }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <router-link to="me" class="drop-item">Profile </router-link>
                        <li v-on:click="logout" class="drop-item">Log Out</li>
                    </ul>
                    </div>
                </div>
                <!-- ======= JIKA USER BELUM LOGIN -========= -->
                <div v-else>
                    <router-link to="/login">Login</router-link> |
                    <router-link to="/register">Register</router-link>
                    
                </div>
            </div>
        </section>
    </nav>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    props : {
        logout : Function
    },
    data : ()=>{
        return {
            navStatus : false,
            searchStatus : false ,
            searchInput  : ''
            
        }
       
    },
    methods  :{
        navToggle : function(){
            this.navStatus = !this.navStatus
        },
        disableNav : function(){
            this.navStatus = false
        },
        searchToggle : function(){
            this.searchStatus = !this.searchStatus;
            
        },
        searchHandle : function(){
           if(this.$router.app._route.name != 'Products'){
               this.$router.push('/products/' + this.searchInput)
           }else{
            this.$store.dispatch('loading',true) 
               this.$store.dispatch('searchProducts',this.searchInput).finally(()=>{
                    this.$store.dispatch('loading',false)  
               })
           }
            this.searchStatus = false;
            this.searchInput = '';
        }
    },
    computed : {
        ...mapGetters({user : 'user'}),
        ...mapGetters({isLoggedIn : 'isLoggedIn'})
    }      
    
}
</script>
<style lang="scss">
@import '../sass/component/navbar.scss';
</style>