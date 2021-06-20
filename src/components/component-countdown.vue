<template>
    <div id="countdown">
        <span class="days">{{ days }} Days </span>
        <span class="hours">{{ hours }}</span> :
        <span class="minute">{{ minutes }}</span> :
        <span class="second">{{ seconds }}</span>
    </div>
</template>
<script>
export default {
    data : function(){
        return {
            countdown : "Jul 15, 2021 11:59:59",
            countdownTime : 0,
            days        : 0,
            hours       : 0,
            minutes     : 0,
            seconds     : 0
        }
    },
    methods : {
        getCountdown(){
            let countdown = new Date(this.countdown).getTime();
           this.countdownTime = countdown
        },
        setCountDown : function(){
            let self = this;
            setInterval(function(){   
                 let now  = new Date().getTime();
                let distance = self.countdownTime - now ;
                self.days = Math.floor(distance / (1000 * 60 * 60 * 24));
                self.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                self.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                self.seconds = Math.floor((distance % (1000 * 60)) / 1000);
            },1000)
        }
    },
    mounted(){
        this.getCountdown();
        this.setCountDown();
    }
    ,computed : {
        
    }
}
</script>
<style  lang="scss">
    #countdown{
         font-weight: 500;
            color: red;
            .hours,.minute,.second{
                padding: 5px;
                border-radius: 5px;
                color: white;
                background-color: red;
                margin: 0px 5px;
        }
    }
    @media (max-width: 767.98px) { 
         #countdown{
         font-weight: 400;
            .hours,.minute,.second{
                padding: 3px;
                margin: 0px 3px;
        }
    }
     }
</style>