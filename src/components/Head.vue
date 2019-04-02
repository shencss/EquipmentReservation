<template>
	<div class="app-head">
        <div class="organization-name">华工软件实验室</div>
        <div class="add-btn"></div>
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
}
</script>

<style lang="scss">
.app-head {
    position: relative;
    height: 40px;
    line-height: 40px;
    background-color: #FFF;
    color: #333;
    font-size: 15px;
    text-align: center;
    font-weight: bold;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .3);
    .add-btn {
        position: absolute;
        top: 7.5px;
        right: 20px;
        width: 25px;
        height: 25px;
        background-image: url('../images/plus-circle.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
}
</style>
