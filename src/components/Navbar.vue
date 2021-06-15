<template>
    <nav>
        <section id="nav-left">
            <div class="toggle-nav" v-on:click="navToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="app-title">
                    <h1 v-if="!navStatus"><span>Phone</span>Credit</h1>
            </div>
            <div class="nav-list" :class="{active : navStatus}">
                    <li v-for="(item, index) in navLeft" :key="index"><router-link :to="item.to" >{{ item.name }}</router-link></li> 
            </div>
        </section>
        <section id="nav-right">
            <div class="on-mobile">
                <div class="toggle-search" v-on:click="searchToggle">
                    <i class="fas fa-search" ></i>
            </div> 
            </div>
            <div class="on-desktop search-box" :class="{ active : searchStatus}">
                <div class="search-bar">
                     <input type="search" name="" id="" placeholder="Search here!!">
                <span><i class="fas fa-search"></i></span>
                </div> 
                <div class="search-bot"></div>
            </div>
            <div class="on-desktop link-auth">
                <router-link to="">Log In</router-link> |
                <router-link to="/register">Register</router-link>
            </div>
        </section>
        <section id="nav-mobile" v-if="!navStatus">
             <div>
                 <router-link to="/"><i class="fas fa-home"></i></router-link> 
            </div>
           
            <div>
                <i class="fas fa-bell"></i>
            </div>
             <div>
                 <i class="far fa-user"></i>
            </div>
        </section>
    </nav>
</template>
<script>
export default {
    data : ()=>{
        return {
            navLeft : [
                 {to : '/',name : 'Home'},
                 {to : '/product', name : 'Shop'},
                 {to : '/about', name: 'About'},
                 {to : '/contact', name: 'Contact Us'}
                 ],
            navStatus : false,
            searchStatus : false ,
            searchBtn : ""
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
        }
    },
    mounted(){
        let search = document.querySelector(".toggle-search");
        this.searchBtn = search.innerHTML;
       
    }
}
</script>
<style lang="scss">

    $appNameColor : rgb(44, 132, 233) ;
    $navList : rgb(12, 12, 12);
    // Desktop View
    #nav-mobile{
        display: none;
    }
    nav {
        display: flex;
        justify-content: space-between;
        width: 100%;

    }
    #nav-left {
        display: flex;
        width: 62%;
        .app-title{
        
            letter-spacing: 1.5pt;
            span{
                color:  $appNameColor;
            }

        }
        .nav-list{
            display: flex;
            padding: 0px 20px;
            width: 100%;  
            justify-content: space-around;
            align-items: center;
            li{
                list-style: none;
            }
        }
        

    }
    #nav-right {
        display: flex;
        align-items: center;
        div{
            margin: 0px 10px;
        }
        .search-box .search-bar{
            border: darkgrey 2px solid;
            border-radius: 8px;
            background-color: rgb(255, 255, 255);
            padding: 0px 7px;
            input{
                border: none;
                outline: none;
            }
        }
      
    }


    // MObile VIew 
    @media (max-width: 575.98px) {
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
        // nav mobile bottom
        #nav-mobile{
            z-index: 2;
            display: flex;
            position: fixed;
            bottom: 15px;
            height: 40px;
            width: 100%;
            justify-content: space-evenly;
            div{
                font-size: xx-large;
               
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
        #nav-right {
            .on-desktop{
                display: none;
                margin: 0;
                &.search-box.active{
                    display: flex;
                    position: fixed;
                    padding: 10px 20px;
                    height: 45px;
                    top:0;
                    left: 0;
                    right: 0;
                    align-items:center;
                    background-color: white;                   
                    z-index: 99;
                    input{
                        background-color: rgb(255, 255, 255);
                        min-width: 330px;
                    }
                    .search-bot{
                    margin: 0;
                    display: block;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    top: 45px;
                    background-color: rgb(255, 255, 255);

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

</style>