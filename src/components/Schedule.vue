<template>
	<div class="schedule">
        <div class="search-box">
            <input id="search-input" v-model="searchForm.equipmentName" type="text" placeholder="输入设备名称搜索">
            <span class="search-icon" @click="searchEquipment"></span>
        </div>
        <!-- <div class="type-header">
            <div @click="checkType('all')">所有设备</div>
            <div @click="checkType('reserving')">预约中</div>
            <div @click="checkType('using')">使用中</div>
            <div @click="checkType('idle')">闲置设备</div>
            <div class="type-underline" :class="underlineClass"></div>
        </div> -->
        
        <div class="equipment-list">
            <div class="item-warp" v-for="(item, index) in equipmentList" :key=index>
                <div class="equipment-item" v-if="showItem(item.status)">
                    <div :class="['equipment-icon', icon(item)]"></div>
                    <div class="equipment-info">
                        <div class="equipment-name">{{item.equipmentName}}</div>
                        <div class="available-time" style="margin: 5px 0">
                            <span>可预约时间</span> 
                        </div>
                        <div class="time-list" v-if="item.periods.length > 0">
                            <span v-for="(period, index2) in item.periods.slice(0, 2)" :key="index2">{{timeText(period.startTime)}} - {{timeText(period.endTime)}}</span>
                            <span v-if="item.periods && item.periods.length > 2" style="font-size: 10px">......</span>
                        </div>  
                        <div v-else style="text-align: center; font-size: 12px">尚未安排可预约时间,请点击安排</div>
                    </div>
                    <!-- <div class="arrange-btn" v-if="item.status == 3" @click="goReserve(item)">安排预约</div> -->
                    <div class="arrange-btn" @click="goTest">安排时间</div>
                </div>
            </div>
        </div>
        <Dialog :visible="showDialog" @close="closeDialog" class="reservation-dialog">
            <div class="dialog-title">设置设备可预约时间</div>
            <div class="equipment-info">
                <div :class="['equipment-icon', icon(selectedItem)]"></div>
                <div class="equipment-name">{{selectedItem.equipmentName}}</div>
                <div class="line"></div>
                <div class="equipment-type">
                    <span>设备类型</span>
                    <span class="value">{{type(selectedItem)}}</span>
                </div>
                <div class="equipment-address">
                    <span>设备型号</span>
                    <span class="value">{{selectedItem.equipmentModel}}</span>
                </div>
                <div class="equipment-note">
                    <span>注意事项</span>
                    <span class="value">{{selectedItem.note}}</span>
                </div>
                <div class="available-time" style="margin-bottom: 5px">
                    <span>可预约时间</span>
                </div>
                <div class="time-list">
                    <div class="period" v-for="(period, index) in selectedItem.periods" :key="index">
                        <span class="period-text">{{timeText(period.startTime)}} - {{timeText(period.endTime)}}</span>
                        <div class="delete-period-btn" @click="deletePeriod(index)">-</div>
                    </div>
                </div> 
                <div class="add-period-btn" v-if="!showPeriodForm" @click="openPeriodForm">+添加设备可预约时间</div>
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
            </div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog">取消</div>
                <div class="confirm-btn" @click="setEquipmentAvailablePeriods">确定</div>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Dialog from './Dialog'
import { getBaseUrl } from '../common/env'

export default {
    components: {
        Dialog
    },
    data() {
        return {
            equipmentType: 'all',
            underlineClass: 'type-1',
            showDialog: false,
            equipmentList: [],
            selectedItem: {},
            showPeriodForm: false,
            periodForm: {
                startDate: '',
                endDate: '',
                startTime: '',
                endTime: ''
            },
            searchForm: {
                equipmentName: ''
            }
        };
    },
    computed: {
        icon() {
            return item => {
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
        },
        type() {
            return item => {
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
        },
        showItem() {
            return status => {
                if (this.equipmentType === 'all') {
                    return true;
                } else if (this.equipmentType == 'reserving' && status == 1) {
                    return true;
                } else if(this.equipmentType == 'using' && status == 2) {
                    return true;
                } else if(this.equipmentType == 'idle' && status == 3) {
                    return true;
                }
            }
        }
    },
    mounted() {
        this.$axios.get(getBaseUrl() + '&action=getAllEquipments').then(res => {
            this.equipmentList = res.data.result;
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
        openDialog(dialogName, item) {
            if(dialogName == 'ScheduleDialog') {
                this.selectedItem = item;
                this.showDialog = true;
            }
        },
        closeDialog() {
            this.showDialog = false;
        },
        checkType(type) {
            switch(type) {
                case 'all':
                    this.equipmentType = 'all';
                    this.underlineClass = 'type-1';
                    break;
                case 'reserving':
                    this.equipmentType = 'reserving';
                    this.underlineClass = 'type-2';
                    break;
                case 'using':
                    this.equipmentType = 'using';
                    this.underlineClass = 'type-3';
                    break;
                case 'idle':
                    this.equipmentType = 'idle';
                    this.underlineClass = 'type-4';
                    break;
                default:
                    this.equipmentType = 'all';
                    this.underlineClass = 'type-1';
                
            }
        },
        openPeriodForm() {
            this.showPeriodForm = true;
        },
        cancelAddPeriod() {
            this.showPeriodForm = false;
        },
        addPeriod() {
            this.showPeriodForm = false;
            let startTime = new Date(this.periodForm.startDate + ' ' + this.periodForm.startTime + ':00').getTime();
            let endTime = new Date(this.periodForm.endDate + ' ' + this.periodForm.endTime + ':00').getTime();            
            this.selectedItem.periods.push({
                startTime: startTime,
                endTime: endTime
            });
        },
        deletePeriod(index) {
            this.selectedItem.periods.splice(index, 1);
        },
        searchEquipment() {
            this.$axios.get(getBaseUrl() + '&action=getAllEquipments&equipmentName=' + this.searchForm.equipmentName).then(res => {
                this.equipmentList = res.data.result;
            }).catch(err => {
                console.log(err);
            });
        },
        setEquipmentAvailablePeriods() {
            let periods = encodeURIComponent(JSON.stringify(this.selectedItem.periods));
            
            this.$axios.get(getBaseUrl() + '&action=setEquipmentAvailablePeriods&equipmentId=' + this.selectedItem.equipmentId + '&periods=' + periods).then(res => {
                return this.$axios.get(getBaseUrl() + '&action=getAllEquipments');
            }).then(res => {
                this.equipmentList = res.data.result;
            }).catch(err => {
                console.log(err);
            });
            this.showDialog = false;
        },
        goTest() {
          this.$router.push('/arrangement')  
        }
    }
}
</script>

<style lang="scss">
.schedule {
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
    .type-header {
        position: relative;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FFF;
        color: #409EFF;
        font-size: 12px;
        div {
            position: relative;
            flex: 1;
            text-align: center;
            height: 35px;
            line-height: 35px;
        }
        .type-underline {
            height: 2px;
            width: 30px;
            background-color: #409EFF;
            position: absolute;
            top: 30px;
            left: 12.5%;
            transform: translateX(-50%);
            transition: all .5s linear;
        }
        .type-1 {
            left: 12.5%;
        }
        .type-2 {
            left: 37.5%;
        }
        .type-3 {
            left: 62.5%;
        }
        .type-4 {
            left: 87.5%;
        }
    }
    .equipment-list {
        height: calc(100vh - 135px);
        overflow-y: auto;
        background-color: rgb(245, 245, 245);
        .equipment-item {
            min-height: 80px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 1px solid #EEE;
            box-sizing: border-box;
            padding: 10px;
            background-color: #FFF;
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
            .reservation-btn, .arrange-btn {
                background-color: #409EFF;
                color: #FFF;
                padding: 5px;
                font-size: 12px;
                border-radius: 3px;
                cursor: pointer;
                flex-shrink: 0;
            }
            .arrange-btn {
                background-color: #67C23A;
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
            .equipment-name {
                font-weight: bold;
                font-size: 15px;
            }
            .line {
                width: 100%;
                height: 2px;
                background-color: #409EFF;
                margin: 10px 0 20px 0;
            }
            .equipment-type, .equipment-address, .available-time, .equipment-note {
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                color: #909399;
                margin-bottom: 20px;
                span {
                    flex-basis: 90px;
                }
                .value {
                    color: #000;
                    flex-grow: 1;
                }
            }
            .time-list {
                flex-grow: 1;
                font-size: 12px;
                .period {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    color: #000;
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
                line-height: 40px;
            }
            .period-form {
                font-size: 12px;
                color: #303133;
                .yes-btn {
                    width: 25px;
                    height: 25px;
                    margin-right: 15px;
                    background-image: url('../images/yes.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
                .no-btn {
                    box-sizing: border-box;
                    width: 25px;
                    height: 25px;
                    background-image: url('../images/no.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
            }
            .reservation-note {
                width: 100%;
                text-align: left;
                font-size: 11px;
                color: #409EFF;
            }
           .start-date, .end-date {
               display: flex;
               align-items: center;
               width: 100%;
               margin: 10px 0;
               label {
                   font-size: 13px;
                   margin-right: 20px;
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
