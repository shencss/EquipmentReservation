<template>
	<div class="approval">
        <div class="reservation-box">
            <div class="line">
                <span>设备名称</span>
                <span class="value">联想电脑</span>
            </div>
            <div class="line">
                <span>设备类型</span>
                <span class="value">电脑</span>
            </div>
            <div class="line">
                <span>设备型号</span>
                <span class="value">T55P</span>
            </div>
            <div class="line">
                <span>预约用户</span>
                <span class="value">沈承胜</span>
            </div>
            <div class="line">
                <span>预约起始日期</span>
                <span class="value">2019.04.01</span>
            </div>
            <div class="line">
                <span>预约结束日期</span>
                <span class="value">2019.05.01</span>
            </div>
            <div class="line">
                <span>备注</span>
                <span class="value">需要借用该设备用于毕业设计开发</span>
            </div>
        </div>
        <div class="pass-btn">同意该预约</div>
        <div class="refuse-btn">拒绝该预约</div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
}
</script>

<style lang="scss">
.approval {
    width: 100%;
    box-sizing: border-box;
    height: calc(100vh - 40px);
    overflow: hidden;
    background-color: rgb(245, 245, 245);
    padding: 40px;
    .reservation-box {
        background-color: #FFF;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
        padding: 20px;
        border-radius: 5px;
        .line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            color: #AAA;
            font-size: 12px;
            .value {
                color: #222;
                max-width: 150px;
            }
        }

    }
    .pass-btn, .refuse-btn {
        width: 80%;
        height: 35px;
        text-align: center;
        line-height: 35px;
        font-size: 13px;
        color: #FFF;
        background-color: #F83600;
        border-radius: 17.5px;
        margin: 20px auto;
    }
    .pass-btn {
        background-color: #2196F3;
        margin-top: 50px;
    }
}
</style>
