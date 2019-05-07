<template>
	<div class="approval-detail">
        <div class="reserve-count">当前有<span>10</span>人预约该设备</div>
        <div class="reservation-box">
            <div class="line" style="margin-top: 0">
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
                <span>设备可预约时间</span>
                
            </div>
            <div class="period">
                <span>2019.04.23 18:00</span>
                <span style="margin: 0 10px"> - </span>
                <span>2019.05.23 18:00</span>
            </div>
            <div class="period">
                <span>2019.04.23 18:00</span>
                <span style="margin: 0 10px"> - </span>
                <span>2019.05.23 18:00</span>
            </div>
            <div class="period">
                <span>2019.04.23 18:00</span>
                <span style="margin: 0 10px"> - </span>
                <span>2019.05.23 18:00</span>
            </div>
            <div class="line">
                <span>预约用户</span>
                <span class="value">沈承胜</span>
            </div>
            <div class="line">
                <span>预约备注</span>
                <span class="value">需要借用该设备用于毕业设计开发</span>
            </div>
            <div class="line">
                <span>用户预约时间</span>
            </div>
            <div class="period">
                <span>2019.04.23 18:00</span>
                <span style="margin: 0 10px"> - </span>
                <span>2019.05.23 18:00</span>
                <input type="checkbox" value="1" v-model="approvePeriods">
            </div>
            <div class="period">
                <span>2019.04.23 18:00</span>
                <span style="margin: 0 10px"> - </span>
                <span>2019.05.23 18:00</span>
                <input type="checkbox" value="2" v-model="approvePeriods">
            </div>
            <div class="period">
                <span>2019.04.23 18:00</span>
                <span style="margin: 0 10px"> - </span>
                <span>2019.05.23 18:00</span>
                <input type="checkbox" value="3" v-model="approvePeriods">
            </div>
            <div class="line">
                <span>审批备注</span>
            </div>
            <div class="note">
                <textarea name="note" id="note" cols="30" rows="3" maxlength="100"></textarea>
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
            approvePeriods: []
        };
    },
}
</script>

<style lang="scss">
.approval-detail {
    width: 100%;
    box-sizing: border-box;
    height: calc(100vh - 85px);
    overflow: hidden;
    overflow-y: auto;
    background-color: rgb(245, 245, 245);
    padding: 0 40px 40px 40px;
    .reserve-count {
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        span {
            color: #409EFF;
        }
    }
    .reservation-box {
        background-color: #FFF;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
        padding: 20px;
        border-radius: 5px;
        .line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            color: #909399;
            font-size: 12px;
            .value {
                color: #303133;
                max-width: 150px;
            }
        }
        .period {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            color: #303133;
            margin-top: 10px;
        }
        .note {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
        }
    }
    .pass-btn, .refuse-btn {
        width: 80%;
        height: 35px;
        text-align: center;
        line-height: 35px;
        font-size: 13px;
        color: #FFF;
        background-color: #409EFF;
        border-radius: 17.5px;
        margin: 20px auto;
    }
    .refuse-btn {
        background-color: #F56C6C;
        margin-bottom: 0;
    }
}
</style>
