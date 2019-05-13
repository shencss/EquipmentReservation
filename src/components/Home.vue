<template>
	<div class="home">
        <div class="search-box">
            <input id="search-input" v-model="searchForm.equipmentName" type="text" placeholder="搜索设备">
            <span class="search-icon" @click="searchEquipment"></span>
        </div>
        <div class="equipment-list">
            <div class="equipment-item" v-for="(item, index) in equipmentList" :key=index>
                <div :class="['equipment-icon', icon(item)]"></div>
                <div class="equipment-info">
                    <div class="equipment-name">{{item.equipmentName}}</div>
                    <div class="count">设备型号
                        <span>{{item.equipmentModel}}</span>
                    </div>
                    <div class="available-time">
                        <span>可预约时间</span> 
                    </div>
                    <div class="time-list">
                        <span v-for="(period, index2) in item.periods" :key="index2">{{timeText(period.startTime)}} - {{timeText(period.endTime)}}</span>
                        <span v-if="item.periods && item.periods.length > 3" style="font-size: 10px">......</span>
                    </div> 
                </div>
                <div class="reservation-btn" @click="openDialog(item)">预约</div>
            </div>
        </div>
        <Dialog :visible="showReserveDialog" @close="closeDialog" class="reservation-dialog">
            <div class="dialog-title">预约该设备</div>
            <div class="equipment-info">
                <div class="equipment-head">
                    <div :class="['equipment-icon', icon(selectedItem)]"></div>
                    <div class="equipment-name">{{selectedItem.equipmentName}}</div>
                </div>
                <div class="line"></div>
                <div class="equipment-type">
                    <span>设备类型</span>
                    <span class="value">{{type(selectedItem)}}</span>
                </div>
                <div class="equipment-address">
                    <span>设备型号</span>
                    <span class="value">{{selectedItem.equipmentModel}}</span>
                </div>
                <div class="available-time" style="margin-bottom: 10px">
                    <span>可预约时间</span>
                </div>
                <div class="time-list">
                    <span v-for="(period, index) in selectedItem.periods" :key="index">{{timeText(period.startTime)}} - {{timeText(period.endTime)}}</span>
                </div>
                <div class="equipment-note">
                    <span>注意事项</span>
                    <span class="value">{{selectedItem.note}}</span>
                </div>
                <div class="available-time" style="margin-bottom: 5px">
                    <span>预约时间</span>
                </div>
                <div class="selected-time-list" v-if="reserveForm.selectedPeriodList.length > 0">
                    <div class="period" v-for="(period, index) in reserveForm.selectedPeriodList" :key="index">
                        <span class="period-text">{{period.startDate + ' ' + period.startTime}} - {{period.endDate + ' ' +period.endTime}}</span>
                        <div class="delete-period-btn" @click="deletePeriod(index)">-</div>
                    </div>
                </div> 
                <div class="add-period-btn" v-if="!showPeriodForm" @click="openPeriodForm">+添加预约时间</div>
                <div class="period-form" v-else>
                    <label>起始时间：</label>
                    <input type="date" v-model="periodForm.startDate">
                    <input type="time" v-model="periodForm.startTime"><br>
                    <label>结束时间：</label>
                    <input type="date" v-model="periodForm.endDate" style="margin: 10px 0">
                    <input type="time" v-model="periodForm.endTime"><br>
                    <div class="operate-btns">
                        <div class="yes-btn" @click="addPeriod"></div>
                        <div class="no-btn" @click="cancelAddPeriod"></div>
                    </div>
                </div>
                 <div class="reserve-note" style="margin-top: 10px">
                    <span>备注信息</span>
                    <textarea v-model="reserveForm.note" cols="30" rows="5" maxlength="100" placeholder="请输入备注信息"></textarea>
                </div>
            </div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog">取消</div>
                <div class="confirm-btn" @click="reserve">确定</div>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Dialog from './Dialog';
import { getBaseUrl } from '../common/env';


export default {
    components: {
        Dialog
    },
    data() {
        return {
            showReserveDialog: false,
            startDate: '',
            endDate: '',
            showPeriodForm: false,
            periodForm: {
                startDate: '',
                endDate: '',
                startTime: '',
                endTime: ''
            },
            reserveForm: {
                selectedPeriodList: [],
                note: ''
            },
            equipmentList: [],
            selectedItem: {},
            searchForm: {
                equipmentName: ''
            }
        };
    },
    computed: {
        icon() {
            return item => {
                if(item) {
                    switch(item.equipmentType) {
                        case '1':
                            return 'computer';
                            break;
                        case '2':
                            return 'display';
                            break;
                        case '3':
                            return 'keyboard';
                            break;
                        case '4':
                            return 'mouse';
                            break;
                        case '5':
                            return 'else';
                            break;
                        default:
                            return 'computer'
                    }
                }
            }
        },
        type() {
            return item => {
                if(item) {
                    switch(item.equipmentType) {
                        case '1':
                            return '电脑';
                            break;
                        case '2':
                            return '显示屏';
                            break;
                        case '3':
                            return '键盘';
                            break;
                        case '4':
                            return '鼠标';
                            break;
                        case '5':
                            return '其他';
                            break;
                        default:
                            return '电脑'
                    }
                }
            }
        }
    },
    mounted() {
        this.$axios.get(getBaseUrl() + '&action=getAvailableEquipments').then(res => {
            this.equipmentList = res.data.result;
        }).catch(err => {
            console.log(err);
        });
    },
    methods: {
        openDialog(item) {
            this.selectedItem = item;
            this.showReserveDialog = true;
        },
        closeDialog() {
            this.showReserveDialog = false;
        },
        openPeriodForm() {
            this.showPeriodForm = true;
        },
        cancelAddPeriod() {
            this.showPeriodForm = false;
        },
        addPeriod() {
            this.showPeriodForm = false;
            this.reserveForm.selectedPeriodList.push({
                startDate: this.periodForm.startDate,
                startTime: this.periodForm.startTime,
                endDate: this.periodForm.endDate,
                endTime: this.periodForm.endTime,
            });
        },
        deletePeriod(index) {
            this.reserveForm.selectedPeriodList.splice(index, 1);
        },
        reserve() {
            let periods = [];
            for(let i = 0, len = this.reserveForm.selectedPeriodList.length; i < len; i++) {
                periods.push({
                    startTime: new Date(this.reserveForm.selectedPeriodList[i].startDate + ' ' + this.reserveForm.selectedPeriodList[i].startTime + ':00').getTime(),
                    endTime: new Date(this.reserveForm.selectedPeriodList[i].endDate + ' '  + this.reserveForm.selectedPeriodList[i].endTime + ':00').getTime()
                })
            }
            periods = encodeURIComponent(JSON.stringify(periods));
            let url = getBaseUrl() + '&action=reserve&userId=1&equipmentId=' + this.selectedItem.equipmentId + '&note=' + this.reserveForm.note + '&periods=' + periods;
            this.$axios.get(url).then(res => {
                
            }).catch(err => {
                console.log(err);
            });
            this.showReserveDialog = false;
        },
        timeText(millisecond) {
            let date = new Date(millisecond);
            let year = date.getFullYear();
            let month = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
            let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
            let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
            let min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
            return year + '-' + month + '-' + day + '  ' + hour + ':' + min;
        },
        searchEquipment() {
            this.$axios.get(getBaseUrl() + '&action=getAvailableEquipments&pageNum=1&pageSize=20&equipmentName=' + this.searchForm.equipmentName).then(res => {
                this.equipmentList = res.data.result;
            }).catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style lang="scss">
.home {
    width: 100%;
    box-sizing: border-box;
    max-height: 100vh;
    overflow: hidden;
    .search-box {
        position: relative;
        box-sizing: border-box;
        height: 50px;
        padding: 10px 15px;
        background-color: rgb(245, 245, 245);
        .search-icon {
            position: absolute;
            top: 15px;
            right: 25px;
            display: inline-block;
            width: 20px;
            height: 20px;
            background-image: url('../images/search.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        #search-input {
            box-sizing: border-box;
            height: 30px;
            width: 100%;
            outline: none;
            border: none;
            padding-left: 15px;
            padding-right: 34px;
            border-radius: 10px;
        }
    }
    .equipment-list {
        max-height: calc(100vh - 135px);
        padding: 0 10px;
        overflow-y: auto;
        .equipment-item {
            min-height: 80px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 1px solid #EEE;
            box-sizing: border-box;
            padding: 10px;
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
                    color: #303133;
                }
                .count {
                    font-size: 12px;
                    color: #909399;
                    margin: 5px 0;
                    span {
                        color: #F56C6C;
                        margin-left: 10px;
                    }
                }
                .available-time {
                    display: flex;
                    justify-content: flex-start;
                    font-size: 12px;
                    color: #909399; 
                }
                .time-list {
                    margin-top: 5px;
                    flex-shrink: 1;
                    color: #409EFF;
                    font-size: 12px;
                    span {
                        display: block;
                        margin-top: 5px;
                    }
                }
            }
            .reservation-btn {
                background-color: #409EFF;
                color: #FFF;
                padding: 5px;
                font-size: 12px;
                border-radius: 3px;
                cursor: pointer;
            }
        }
    }
    .reservation-dialog {
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
            padding: 0 20px;
            .equipment-head {
                 display: flex;
                justify-content: center;
                align-items: center;
                margin: 5px 0;
            }
            .equipment-icon {
                height: 50px;
                width: 50px;
                background-image: url('../images/computer.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                margin-right: 5px;
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
            .equipment-name {
                font-weight: bold;
                font-size: 15px;
            }
            .line {
                width: 100%;
                height: 2px;
                background-color: #409EFF;
                margin-bottom: 10px;
            }
            .equipment-type, .equipment-address, .available-time, .equipment-note, .reserve-note {
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
                    color: #303133;
                    flex-grow: 1;
                }
            }
            .reserve-note {
                justify-content: flex-start;
            }
            .time-list {
                flex-grow: 1;
                font-size: 12px;
                margin-bottom: 10px;
                span {
                    color: #303133;
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
            .cancel-btn, .confirm-btn {
                padding: 0 20px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 12px;
                background-color: #409EFF;
                color: #FFF;
                border-radius: 3px;
                margin: 20px 10px;
            }
        }
    }

}
</style>
