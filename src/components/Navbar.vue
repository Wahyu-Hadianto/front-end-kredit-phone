<template>
    <nav>
        <!-- ======== NAV LEFT AREA ========= -->
        <section id="nav-left">
            <!-- ========= TOGGLE NAV MOBILE =========== -->
            <div class="toggle-nav" v-on:click="navToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <!-- NAV TITLE -->
            <div class="app-title">
                    <h1 v-if="!navStatus"><span>Phone</span>Credit</h1>
            </div>
            <!-- NAV LIST ITEM -->
            <div class="nav-list" :class="{active : navStatus}">
                <router-link to="/" >Beranda</router-link>
                <router-link to="/shop">Produk</router-link>
                <router-link to="/about">Tentang Kami</router-link>
                <router-link to="/kontak">Kontak Kami</router-link>
            </div>
        </section>
        <!-- =========== NAV RIGHT AREA ================ -->
        <section id="nav-right">
            <!-- seacrh mobile -->
            <div class="on-mobile">
                <div class="toggle-search" v-on:click="searchToggle">
                <i class="fas fa-search" ></i>
            </div> 
            </div>
            <!-- search desktop -->
            <div class="on-desktop search-box" :class="{ active : searchStatus}">
                <div class="search-bar">
                     <input type="search" name="" id="" placeholder="Cari Disini!!">
                <span><i class="fas fa-search"></i></span>
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
                        <li class="dropdown-item">Profile</li>
                        <li class="dropdown-item" v-on:click="logout">Keluar</li>
                    </ul>
                    </div>
                </div>
                <!-- ======= JIKA USER BELUM LOGIN -========= -->
                <div v-else>
                    <router-link to="/login">Masuk</router-link> |
                    <router-link to="/register">Daftar</router-link>
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
            searchBtn : "",
        }
       
    },
    methods  :{
        navToggle : function(){
            this.navStatus = !this.navStatus
        },
        searchToggle : function(){
            this.searchStatus = !this.searchStatus;
             let searchToggle =  document.querySelector(".toggle-search")
             searchToggle.innerHTML = this.searchStatus ? "<span>Batal</span>" : this.searchBtn ;
        },
    },
    mounted(){
        let search = document.querySelector(".toggle-search");
        this.searchBtn = search.innerHTML;
    },
    computed : {
        ...mapGetters({user : 'user'}),
        ...mapGetters({isLoggedIn : 'isLoggedIn'})
    }
    
         
    
         

    
}
</script>
<style lang="scss">
    $navbackground : rgb(253, 253, 253);
    $kp-blue : rgb(44, 132, 233) ;
    $kp-blue-2 : rgba(44, 132, 233, 0.404) ;
    $navList : rgb(12, 12, 12);
    // Desktop View
    .on-mobile{
            display: none;
        }
    nav {
        position: fixed;
        background-color: $navbackground;
        display: flex;
        height: 55px;
        justify-content: space-between;
        width: 100%;
          a{
                letter-spacing: 1px;
                text-decoration: none;
                color: $kp-blue;
                &.router-link-exact-active{
                    border-bottom: 4px solid $kp-blue;
                }
                &:hover{
                   border-bottom: 4px solid $kp-blue-2;
                }
            }
        
    }
    #nav-left {
        display: flex;
        width: 60%;
        .app-title{
            letter-spacing: 1.5pt;
            span{
                color:  $kp-blue;
            }

        }
        .nav-list{
            display: flex;
            width: 100%; 
            align-self: center;
            justify-content: space-around;
          
        }
        

    }
    #nav-right {
        display: flex;
        
        align-items: center;
        div{
            margin: 0px 10px;
        }
        .search-box .search-bar{
            background-color: rgb(255, 255, 255);
            padding: 0px 7px;
            input{
                border: none;
                outline: none;
            }
        }
        .link-auth{
          .dropdown{
              li{
                  cursor: pointer;
              }
          }
        }
      
    }
    // DEKSTOP 
    @media (max-width: 1199.98px) { 
            .on-mobile{
                display: block;
            }
           
            .on-desktop.search-box{
                display: none;
            }
             #nav-right{
            
            .on-desktop{
                margin: 0;
                &.search-box{
                    display: none;
                }
                &.search-box.active{
                    display: flex;
                    position: fixed;
                    padding: 10px 20px;
                    height: 45px;
                    top:55px;
                    left: 0;
                    right: 0;
                    align-items:center;
                    background-color: white;                   
                    z-index: 99;
                    input{
                        background-color: rgb(255, 255, 255);
                        min-width: 330px;
                    }
                }
            }
            .on-mobile{
        
                z-index: 111;
            }
            .profil{
                z-index: 99;
            }
        }     
    }
    // =============== TABLET VIEW ===========================
    @media (max-width: 991.98px) {
        #nav-left{
            width: 75%;
        }
       
     }
    // ======================== LANDSCAPE ======================
    @media (max-width: 767.98px) { 
        // Transition 
        .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
        }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        }
        //animation
        @keyframes fade {
            0%{
                opacity: 0;
            }
            25%{
                opacity: 0.2;
            }
            50%{
                opacity: 0.5;
            }
            75%{
                opacity: 0.7;
            }
            100%{
                opacity: 1;
            }
        }
       
        //menu nav list
        nav{
            height: 40px;
        }
        .toggle-nav {
            display: flex;
            flex-direction: column;
            padding: 3px 8px;
            justify-content: space-evenly;
            z-index: 88;
            span{
                display: block;
                background-color:$navList;
                height: 4px;
                width: 45px;
            }
        }
        #nav-left{
            .nav-list{
                flex-direction: column;
                position: fixed;
                top: 0px;
                padding-top: 40px;
                bottom: 0px;
                display: none;
                animation: fade 400ms;
                &.active{
                    display: flex;
                    background-color: white;
                    justify-content: flex-start;
                   
                }
                li{
                    margin: 10px 0;
                    padding: 5px;
                    width: 100%;
                    text-align: center;
                    
                    box-shadow: 0px 6px 6px 0px rgba($color: #000000, $alpha: 0.3);
                }
            }
            div{
                display: flex;
            }
            .search-mobile{
                z-index: 55;
            }



        }
        
    
    }

    // ======================== MObile VIew  ================
    @media (max-width: 575.98px) {
          
    }

</style>