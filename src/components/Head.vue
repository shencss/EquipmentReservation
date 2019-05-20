<template>
	<div class="app-head">
        <div class="back-btn" v-if="this.$route.name == 'usage' || this.$route.name == 'approve' ||  this.$route.name == 'arrangement'" @click="goBack"></div>
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
            if(this.$route.name == 'schedule' || this.$route.name == 'arrangement') {
                return '设备排约';
            } else if(this.$route.name == 'approve') {
                return '预约审批';
            } else if(this.$route.name == 'statistics') {
                return '信息统计';
            } else if(this.$route.name == 'management') {
                return '设备管理'
            } else if(this.$route.name == 'usage') {
                return '使用情况'
            }
        },
    },
    methods: {
        goAddPage() {
            this.$router.push({
                name: 'add'
            });
        },
        goHome() {
            this.$router.push({
                name: 'home'
            });
        },
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
    z-index: 9;
    .add-btn, .home-btn {
        position: absolute;
        height: 25px;
        width: 25px;
        top: 7.5px;
        right: 20px;
        background-image: url('../images/add.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .home-btn {
        background-image: url('../images/home_white.png');
    }
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
