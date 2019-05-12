<template>
	<div class="approval-detail">
        <div class="reserve-count">当前有<span>{{record.equipment.reserveCount}}</span>人预约该设备</div>
        <div class="reservation-box">
            <div class="line" style="margin-top: 0">
                <span>设备名称</span>
                <span class="value">{{record.equipment.equipmentName}}</span>
            </div>
            <div class="line">
                <span>设备类型</span>
                <span class="value">{{equipmentType(record.equipment)}}</span>
            </div>
            <div class="line">
                <span>设备型号</span>
                <span class="value">{{record.equipment.equipmentModel}}</span>
            </div>
            <div class="line">
                <span>设备可预约时间</span>
            </div>
            <div v-for="(period, index) in record.equipment.periods" :key="index">
                <div class="period">
                    <span>{{timeText(period.startTime)}}</span>
                    <span style="margin: 0 10px"> - </span>
                    <span>{{timeText(period.endTime)}}</span>
                </div>
            </div>
            <div class="line">
                <span>预约用户</span>
                <span class="value">{{record.userName}}</span>
            </div>
            <div class="line">
                <span>预约备注</span>
                <span class="value">{{record.note}}</span>
            </div>
            <div class="line">
                <span>用户预约时间</span>
            </div>
            <div v-for="(period, index) in record.periods" :key="index">
                <div class="period">
                    <span>{{timeText(period.startTime)}}</span>
                    <span style="margin: 0 10px"> - </span>
                    <span>{{timeText(period.endTime)}}</span>
                    <input type="checkbox" :value="index" v-model="selectedPeriods">
                </div>
            </div>
            <div class="line">
                <span>审批备注</span>
            </div>
            <div class="note">
                <textarea v-model="note" name="note" id="note" cols="30" rows="3" maxlength="100"></textarea>
            </div>
        </div>
        <div class="pass-btn" @click="passReserve">同意该预约</div>
        <div class="refuse-btn" @click="rejectReserve">拒绝该预约</div>
    </div>
</template>

<script>
import { getBaseUrl } from '../common/env';

export default {
    data() {
        return {
            selectedPeriods: [],
            note: ''
        };
    },
    computed: {
        record() {
            return JSON.parse(this.$route.query.data) || {equipment : {}}
        },
        equipmentType() {
            return item => {
                if(item) {
                    switch(item.equipmentType) {
                        case 1:
                            return '电脑';
                            break;
                        case 2:
                            return '显示屏';
                            break;
                        case 3:
                            return '键盘';
                            break;
                        case 4:
                            return '鼠标';
                            break;
                        default:
                            return '电脑'
                    }
                }
            }
        }
    },
    mounted() {
    },
    methods: {
        timeText(millisecond) {
            let date = new Date(millisecond);
            let year = date.getFullYear();
            let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
            let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
            let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
            let min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
            return year + '-' + month + '-' + day + '  ' + hour + ':' + min;
        },
        passReserve() {
            console.log(this.selectedPeriods)
            let periods = [];
            for(let i = 0, len = this.selectedPeriods; i < len; i++) {
                periods.push({
                    startTime: this.record.periods[this.selectedPeriods[i]].startTime,
                    endTime: this.record.periods[this.selectedPeriods[i]].endTime,
                });
            }
            periods = encodeURIComponent(JSON.stringify(periods));
            this.$axios.get(getBaseUrl() + '&action=passReserve&userId=2&recordId=' + this.record.recordId + '&note=' + this.note + '&periods=' + periods).then(res => {
                this.$router.go(-1);
            }).catch(err => {
                console.log(err);
            });
        },
        rejectReserve() {
            this.$axios.get(getBaseUrl() + '&action=rejectReserve&userId=2&recordId=' + this.record.recordId + '&note=' + this.note).then(res => {
                this.$router.go(-1);
            }).catch(err => {
                console.log(err);
            });
        }
    }
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
