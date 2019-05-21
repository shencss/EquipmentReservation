<template>
	<div class="mine">
        <div class="type-header">
            <div @click="checkType('all')">所有预约</div>
            <div @click="checkType('doing')">预约中</div>
            <div @click="checkType('done')">已批准</div>
        </div>
        <div class="type-underline" :class="underlineClass"></div>
        <div class="equipment-list">
            <div class="item-wrap" v-for="(item, index) in reservationList" :key=index>
                <div class="equipment-item" v-if="showItem(item.status)"  @click="openDialog('DetailDialog', item)">
                    <div :class="['equipment-icon', icon(item.equipment)]"></div>
                    <div class="equipment-info">
                        <div class="equipment-name">{{item.equipment.equipmentName}}</div>
                        <div :class="['status', statusClass(item.status)]">预约状态：
                            <span>{{statusText(item.status)}}</span>
                            <span class="time">{{timeText(item.reserveTime)}}</span>
                        </div>
                        <div class="reserve-time"></div>
                    </div>
                    
                    
                </div>
            </div>
        </div>

        <Dialog :visible="showCancelDialog" @close="closeDialog" class="cancel-dialog">
            <div class="dialog-title">取消预约</div>
            <div class="remind-text">
                确定取消预约该设备吗？
            </div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog('CancelDialog')">取消</div>
                <div class="confirm-btn" @click="cancelReserve">确定</div>
            </div>
        </Dialog>

        <Dialog :visible="showEndDialog" @close="closeDialog('EndDialog')" class="end-dialog">
            <div class="dialog-title">结束预约</div>
            <div class="remind-text">
                确定结束使用该设备吗？
            </div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog('EndDialog')">取消</div>
                <div class="confirm-btn" @click="endUse">确定</div>
            </div>
        </Dialog>

        <Dialog :visible="showDetailDialog" @close="closeDialog('DetailDialog')" class="detail-dialog">
            <div class="dialog-title">预约详情</div>
            <div class="equipment-info">
                <div class="equipment-name">
                    <span>设备名称</span>
                    <span class="value">{{selectedItem.equipment.equipmentName}}</span>
                </div>
                <div class="equipment-type">
                    <span>设备类型</span>
                    <span class="value">{{equipmentType(selectedItem)}}</span>
                </div>
                <div class="equipment-address">
                    <span>设备型号</span>
                    <span class="value">{{selectedItem.equipment.equipmentModel}}</span>
                </div>
                <div class="equipment-address">
                    <span>设备地点</span>
                    <span class="value">{{selectedItem.equipment.address}}</span>
                </div>
                <div class="equipment-address">
                    <span>联系电话</span>
                    <span class="value">{{selectedItem.equipment.phone}}</span>
                </div>
                <div class="equipment-address">
                    <span>收费信息</span>
                    <span class="value">{{selectedItem.equipment.cost}}</span>
                </div>
                <div class="equipment-note">
                    <span>使用注意</span>
                    <span class="value">{{selectedItem.equipment.note}}</span>
                </div>
                <div class="available-time" style="margin-bottom: 10px">
                    <span>预约时间</span>
                </div>
                <div class="time-list">
                    <span>{{selectedItem.date + ' ' + selectedItem.startTime + ' - ' + selectedItem.endTime}}</span>
                </div>
                <div class="reserve-note" style="margin-top: 10px">
                    <span>更多需求</span>
                    <span class="value">{{selectedItem.note}}</span>
                </div>
                <div class="reserve-note" style="margin-top: 10px">
                    <span>预约状态</span>
                    <span class="value">{{statusText(selectedItem.status)}}</span>
                </div>
            </div>
            <div class="operate-btns" style="margin-top: 10px">
                <div class="redo-btn" @click="goReserve(selectedItem)">重新预约</div>
                <div v-if="selectedItem.status == 1" class="cancel-btn" @click="openDialog('CancelDialog')">取消预约</div>
                <div class="confirm-btn" @click="closeDialog('DetailDialog')">确定</div>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Dialog from './Dialog.vue';
import { getBaseUrl } from '../common/env';

export default {
    data() {
        return {
            type: 'all',
            showCancelDialog: false,
            showEndDialog: false,
            showDetailDialog: false,
            underlineClass: 'left',
            reservationList: [],
            selectedItem: {
                equipment: {}
            },
        };
    },
    components: {
        Dialog
    },
    mounted() {
        this.$axios.get(getBaseUrl() + '&action=getUserReserveRecords&userId=1').then(res => {
            this.reservationList = res.data.result;
            this.selectedItem = this.reservationList[0];
        }).catch(err => {
            console.log(err);
        });
    },
    methods: {
        timeText(millisecond) {
            let date = new Date(millisecond);
            let year = date.getFullYear();
            let month = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
            let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
            let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
            let min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
            return year + '-' + month + '-' + day + '  ' + hour + ':' + min;
        },
        checkType(type) {
            if(type == 'all') {
                this.type = 'all';
               this.underlineClass = 'left';
            } else if(type == 'doing') {
                this.type = 'doing';
                this.underlineClass = 'center';
            } else {
                this.type = 'done';
                this.underlineClass = 'right';
            }
        },
        closeDialog(dialogName) {
            if(dialogName == 'CancelDialog') {
                this.showCancelDialog = false;
            } else if(dialogName == 'EndDialog') {
                this.showDetailDialog = false;
                this.showEndDialog = false;
            } else if(dialogName == 'DetailDialog') {
                this.showDetailDialog = false;
            }
        },
        openDialog(dialogName, item) {
            if(dialogName == 'CancelDialog') {
                this.showDetailDialog = false;
                this.showCancelDialog = true;
            } else if(dialogName == 'EndDialog') {
                this.showDetailDialog = false;
                this.showEndDialog = true;
            } else if(dialogName == 'DetailDialog') {
                this.selectedItem = item;
                this.showDetailDialog = true;
            }
        },
        cancelReserve() {
            this.$axios.get(getBaseUrl() + '&action=cancelReserve&recordId=' + this.selectedItem.recordId).then(res => {
                return this.$axios.get(getBaseUrl() + '&action=getUserReserveRecords&userId=1');
            }).then(res => {
                this.reservationList = res.data.result;
            }).catch(err => {
                console.log(err);
            });
            this.showCancelDialog = false;
        },
        goReserve(item) {
            this.$axios.get(getBaseUrl() + '&action=getScheduleDetail&equipmentId=' + item.equipmentId).then(res => {
                this.$router.push({
                    path: '/reserve',
                    query: {
                        data: JSON.stringify(res.data.result),
                        phone: item.phone,
                        note: item.note
                    }
                });
            }).catch(err => {
                console.log(err);
            });
        }
    },
    computed:{
        icon() {
            return item => {
                if(item) {
                    switch(item.equipmentType) {
                        case '电脑':
                        case '笔记本':
                            return 'computer';
                            break;
                        case '显示屏':
                            return 'display';
                            break;
                        case '键盘':
                            return 'keyboard';
                            break;
                        case '鼠标':
                            return 'mouse';
                            break;
                        default:
                            return 'else'
                    }
                }
            }
        },
        statusText() {
            return status => {
                switch(status) {
                    case '1':
                        return '等待审批中';
                        break;
                    case '2':
                        return '未批准';
                        break;
                    case '3':
                        return '已批准';
                        break;
                    case '4':
                        return '已过时';
                        break;
                    case '5':
                        return '已取消';
                        break;
                    default:
                        return '等待审批中'
                }
            }
        },
        statusClass() {
            return status => {
                switch(status) {
                    case '1':
                        return 'await';
                        break;
                    case '2':
                        return 'refuse';
                        break;
                    case '3':
                        return 'pass';
                        break;
                    case '4':
                        return 'timeout';
                        break;
                    case '5':
                        return 'cancel';
                        break;
                    default:
                        return 'await'
                }
            }
        },
        showItem() {
            return status => {
                if (this.type === 'all') {
                    return true;
                } else if (this.type == 'doing' && status == 1) {
                    return true;
                } else if(this.type == 'done' && status == 3) {
                    return true;
                } else {
                    return false;
                }
            }
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
    }
}
</script>

<style lang="scss">
.mine {
    position: relative;
    .type-header {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FFF;
        color: #409EFF;
        font-size: 14px;
        div {
            position: relative;
            flex: 1;
            text-align: center;
            height: 35px;
            line-height: 35px;
        }
        .active::after {
            content: '';
            display: inline-block;
            width: 30px;
            height: 2px;
            background-color: #409EFF;
            position: absolute;
            bottom: 6px;
            left: 50%;
            transform: translateX(-50%);
        }
        border-bottom: 1px solid #EEE;
    }
    .type-underline {
        height: 2px;
        width: 30px;
        background-color: #409EFF;
        position: absolute;
        top: 30px;
        left: 16.66%;
        transform: translateX(-50%);
        transition: all .5s linear;
    }
    .center {
        left: 50%;
    }
    .right {
        left: 83.33%;
    }
    .equipment-list {
        background-color: #FFF;
        max-height: calc(100% - 41px);
        overflow-x: hidden;
        overflow-y: auto;
        .equipment-item {
            position: relative;
            height: 65px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 1px solid #EEE;
            box-sizing: border-box;
            padding: 0 10px;
            .equipment-icon {
                height: 50px;
                width: 50px;
                background-image: url('../images/computer.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
            .display {
                background-image: url('../images/display.png');
            }
            .keyboard {
                background-image: url('../images/keyboard.png');
            }
            .mouse {
                background-image: url('../images/mouse.png');
            }
            .else {
                background-image: url('../images/else.png');
            }
            .equipment-info {
                flex-grow: 1;
                padding: 0 10px;
                .equipment-name {
                    font-size: 14px;
                    font-weight: bold;
                }
                .status {
                    font-size: 12px;
                    color: #909399;
                    margin: 5px 0;
                    span {
                        margin-left: 10px;
                        font-weight: bold;
                    }
                    .time {
                        float: right;
                        color: #909399;
                        font-weight: normal;
                    }
                }
                .refuse {
                    span {
                        color: #F56C6C;
                    }
                }
                .await {
                    span {
                        color: #E6A23C;
                    }
                }
                .pass {
                    span {
                        color: #67C23A;
                    }
                }
                .available-time {
                    font-size: 12px;
                    color: #909399; 
                    span {
                        color: #409EFF;
                        margin-left: 10px;
                    }
                }
            }
           
            .check-btn {
                background-color: #409EFF;
                margin-right: 5px;
            }
            .reserve-time {
                position: absolute;
                bottom: 3px;
                right: 3px;
                font-size: 12px;
                color: #909399;
            }
        }
    }
    .cancel-dialog, .end-dialog {
        .dialog-title {
            height: 50px;
            line-height: 50px;
            font-size: 15px;
            text-align: center;
            border-bottom: 1px solid #409EFF;
            background-color: #409EFF;
            color: #FFF;
        }
        .remind-text {
            font-size: 12px;
            height: 70px;
            line-height: 70px;
            padding-left: 30px;
        }
        .operate-btns {
            display: flex;
            justify-content: center;
            align-items: center;
            .cancel-btn, .confirm-btn {
                padding: 0 20px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 12px;
                background-color: #409EFF;
                color: #FFF;
                border-radius: 3px;
                margin: 0 10px 20px 10px;
            }
        }
    }
    .detail-dialog {
        .dialog-title {
            height: 50px;
            line-height: 50px;
            font-size: 15px;
            text-align: center;
            border-bottom: 1px solid #409EFF;
            background-color: #409EFF;
            color: #FFF;
        }
        .equipment-info {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 10px 20px 0 20px;
            .equipment-name, .equipment-type, .equipment-address, .available-time, .equipment-note, .reserve-note {
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                color: #AAA;
                margin-bottom: 15px;
                span {
                    flex-basis: 70px;
                }
                .value {
                    color:#303133;;
                    flex-grow: 1;
                }
            }
            .time-list {
                flex-grow: 1;
                font-size: 12px;
                margin-bottom: 10px;
                span {
                    color: #303133;;
                    margin-bottom: 5px;
                    display: block;
                }
            }
            .reservation-note {
                width: 100%;
                text-align: left;
                font-size: 11px;
                color: #409EFF;
            }
            .selected-time-list {
                flex-grow: 1;
                font-size: 12px;
                .period {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    color: #303133;
                    margin-bottom: 8px;
                    display: block;
                    .delete-period-btn {
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        background-color: #F56C6C;
                        color: #FFF;
                        text-align: center;
                        line-height: 10px;
                        border-radius: 50%;
                        cursor: pointer;
                    }
                }
            }
           .add-period-btn {
                color: #409EFF;
                text-decoration: underline;
                font-size: 12px;
                cursor: pointer;
                margin: 10px 0;
            }
            .period-form {
                font-size: 12px;
                color: #303133;
                .yes-btn {
                    width: 25px;
                    height: 25px;
                    line-height: 25px;
                    text-align: center;
                    background-image: url('../images/yes.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    border-radius: 50%;
                    margin-right: 15px;
                }
                .no-btn {
                    box-sizing: border-box;
                    width: 25px;
                    height: 25px;
                    line-height: 25px;
                    text-align: center;
                    background-image: url('../images/no.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    border-radius: 50%;
                }
            }
        }
        .operate-btns {
            display: flex;
            justify-content: center;
            align-items: center;
            .cancel-btn, .confirm-btn, .end-btn, .check-btn, .redo-btn {
                padding: 0 20px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 12px;
                background-color: #409EFF;
                color: #FFF;
                border-radius: 3px;
                margin: 0 10px 20px 10px;
            }
            .end-btn, .cancel-btn {
                background-color: #F56C6C;
            }
            .redo-btn {
                background-color: #67C23A;
            }
             
        }
    }

}
</style>
