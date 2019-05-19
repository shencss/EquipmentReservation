<template>
	<div class="approval-list">
        <div v-if="showRemindText" style="text-align: center;color: #409EFF; font-weight: bold; font-size: 15px;line-height: 300px">暂无待审批的预约</div>
        <div class="reservation-item" v-for="(item, index) in reservationList" :key="index">
            <div class="todo-icon"></div>
            <div class="reservation-info">
                <div class="reserve-user">
                    <span>预约用户</span>
                    <span class="value">{{item.userName}}</span>
                </div>
                <div class="reserve-equipment">
                    <span>预约设备</span>
                    <span class="value">{{item.equipment.equipmentName}}</span>
                </div>
                <div class="reserve-time">
                    <span>预约时间</span>
                    <span class="value">{{timeText(item.reserveTime)}}</span>
                </div>
            </div>
            <div class="approval-btn" @click="goApproval(item)">审批</div>
        </div>
    </div>
</template>

<script>
import { getBaseUrl } from '../common/env';

export default {
    data() {
        return {
            reservationList: [],
            showRemindText: false
        }
    },
    async mounted() {
        await this.$axios.get(getBaseUrl() + '&action=getAwatingReserveRecords').then(res => {
            this.reservationList = res.data.result;
            if(res.data.result.length == 0) {
                this.showRemindText = true;
            }
        }).catch(err => {
            console.log(err);
        });
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
        goApproval(item) {
            this.$router.push({
                path: '/approval/detail',
                query: {
                    data: JSON.stringify(item)
                }
            });
        }
    }
}
</script>

<style lang="scss">
.approval-list {
    height: calc(100vh - 85px);
    overflow-y: auto;
    .reservation-item {
        padding: 5px 30px;
        border-bottom: 1px solid #EEE;
        position: relative;
        height: 50px;
        background-color: #FFF;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .todo-icon {
            height: 35px;
            width: 35px;
            background-image: url('../images/todo.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .reservation-info {
            margin: 0 10px;
            font-size: 14px;
            height: 45px;
            color: #909399;
            div {
                height: 15px;
                line-height: 15px;
            }
            .value {
                color: #303133;
                margin-left: 20px;
            }
        }
        .approval-btn {
            position: absolute;
            top: 18.5px;
            right: 30px;
            background-color: #F56C6C;
            color: #FFF;
            padding: 5px;
            font-size: 14px;
            border-radius: 3px;
            cursor: pointer;
        }
    }
}
</style>
