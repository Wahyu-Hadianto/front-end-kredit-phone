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
                <router-link to="/" >Beranda</router-link>
                <router-link to="/shop" >Produk</router-link>
                <router-link to="/about" >Tentang Kami</router-link>
                <router-link to="/kontak" >Kontak Kami</router-link>
                <div class="auth-mobile">
                    <router-link to="/login">Masuk</router-link> |
                    <router-link to="/register">Daftar</router-link>
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
                <div class="me">
                    <router-link to="/me" ><i class="far fa-user"></i></router-link>
                </div>
            </div>
            <!-- search desktop -->
            <div class="on-desktop search-box" :class="{ active : searchStatus}">
                <div class="search-bar">
                     <input type="search" name="" id="" placeholder="Cari Disini!!">
                <span><i class="fas fa-search"></i></span>
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
        height: 60px;
        background-color: $navbackground;
        display: flex;
        z-index: 999;
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
            display: flex;
            padding: 0px 5px;
            align-items: center;
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
            .auth-mobile{
                display: none;
            }
          
        }
        

    }
    #nav-right {
        display: flex;
        align-items: center;
        div{
            padding: 0px 5px;
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
                display: inline-flex;
                font-size: x-large;
                cursor: pointer;
                a{
                    color: black;
                }
            }
           
            .on-desktop.search-box{
                display: none;
            }
            #nav-left{
                width: 65%;
            }
             #nav-right{
            
            .on-desktop{
                margin: 0;
                &.search-box{
                    display: none;
                }
                &.search-box.active{
                    display: flex;
                    position: absolute;
                    padding: 10px 20px;
                    height: 50px;
                    top:0;
                    left: 0;
                    right: 0;
                    align-items:center;
                    background-color: white;                   
                    z-index: 99;
                    input{
                        background-color: rgb(255, 255, 255);
                        width: 80vw;
                    }
                }
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
        transition: opacity .6s;
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
        #nav-left{
            width: max-content;
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
                transition: all .5s ;
                 transform-origin: left;
            }
            &.active{
                span:nth-child(1){
                   
                    transform: rotate(40deg);
                }
                span:nth-child(2){
                   opacity: 0;
                }
                span:nth-child(3){
                   
                    transform: rotate(-40deg);
                }
            }
        }
        #nav-left{
            .nav-list{
                flex-direction: column;
                position: fixed;
                top: 0px;
                padding-top: 60px;
                bottom: 0px;
                display: none;
                text-align: center;
                animation: fade 400ms;
                .auth-mobile{
                    display: flex;
                    align-items: center;
                    font-size: x-large;
                }
                &.active{
                    display: flex;
                    background-color: white;
                    justify-content: flex-start;
                    align-items: center;
                   
                }
                a{
                    width: max-content;
                    text-align: center;
                    font-size: x-large;
                    margin: 10px 0;
                    padding: 5px;
                   
                }
            }
            div{
                display: flex;
            }
            .search-mobile{
                z-index: 55;
            }



        }
        #nav-right{
            .on-desktop{
                display: none;
                &.search-box.active{
                    padding: 0;
                }
            
            }

        }
    
    }

    // ======================== MObile VIew  ================
    @media (max-width: 575.98px) {
          #nav-right{
            .on-desktop{
                &.search-box.active{
                    input{
                        width: 75vw;
                    }
                }
            
            }

        }
    }

</style>