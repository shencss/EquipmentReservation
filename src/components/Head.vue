<template>
	<div class="app-head">
        <div class="nav-name">{{navName}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    mounted() {

    },
    computed: {
        navName() {
            return this.$store.state.navName || ''
        }
    }
}
</script>

<style lang="scss">
.app-head {
    position: fixed;
    top: 0;
    left: 0;
    height: 40px;
    line-height: 40px;
    background-color: rgb(250, 250, 250);
    color: #A1C4FD;
    font-size: 16px;
    width: 100%;
    text-align: center;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .15);
    z-index: 99;
}
</style>
