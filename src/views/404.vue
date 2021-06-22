<template>
    <div id="not-found">
        <div class="message">
        <h1>404 Not Found</h1>
        <p>Halaman tidak di temukan</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import '../sass/variable.scss';
    #not-found{
        display: flex;
        height: 100vh;
        width: 100%;
        color: $gray-700;
        .message{
            margin: auto;
        }
    }
</style>