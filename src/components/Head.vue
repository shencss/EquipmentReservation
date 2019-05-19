<template>
	<div class="app-head">
        <div class="back-btn" v-if="this.$route.name == 'reserve'" @click="goBack"></div>
        <div class="nav-name">{{navName}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    computed: {
        navName() {
            if(this.$route.name == 'reservation') {
                return '预约中心'
            } else if(this.$route.name == 'mine') {
                return '预约记录'
            } else if(this.$route.name == 'reserve') {
                return '预约设备'
            }
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
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
    background-color: #409EFF;
    // color: #A1C4FD;
    color: #FFF;
    font-size: 16px;
    width: 100%;
    text-align: center;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .15);
    z-index: 99;
    .back-btn {
        position: absolute;
        height: 25px;
        width: 25px;
        top: 7.5px;
        left: 20px;
        background-image: url('../images/back.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
}
</style>
