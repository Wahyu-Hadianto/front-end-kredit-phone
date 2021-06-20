<template>
    <div id="loading" :class="{active : loading}">
        <div class="loading-box">

        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed : {
        ...mapGetters({
            loading : 'loading'
        })
    }
}
</script>
<style lang="scss" scoped>
  @import '../sass/component/loading.scss';
</style>s