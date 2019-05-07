<template>
	<div class="approval-list">
        <div class="reservation-item" v-for="(item, index) in reservationList" :key="index">
            <div class="todo-icon"></div>
            <div class="reservation-info">
                <div class="reserve-user">
                    <span>预约用户</span>
                    <span class="value">{{item.userName}}</span>
                </div>
                <div class="reserve-equipment">
                    <span>预约设备</span>
                    <span class="value">{{item.equipmentName}}</span>
                </div>
                <div class="reserve-time">
                    <span>预约时间</span>
                    <span class="value">{{item.reserveTime}}</span>
                </div>
            </div>
            <div class="approval-btn" @click="goApproval(item)">审批</div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            reservationList: [
                {
                    userName: '沈承胜',
                    equipmentName: '联想电脑',
                    reserveTime: '2019.4.28 18:00'
                },
                {
                    userName: '沈承胜',
                    equipmentName: '戴尔笔记本',
                    reserveTime: '2019.4.28 18:00'
                },
                {
                    userName: '沈承胜',
                    equipmentName: 'AOC显示屏',
                    reserveTime: '2019.4.28 18:00'
                }
            ]
        }
    },
    methods: {
        goApproval(item) {
            this.$router.push({
                path: '/approval/detail'
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
            font-size: 12px;
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
            font-size: 12px;
            border-radius: 3px;
            cursor: pointer;
        }
    }
}
</style>
