<template>
	<div class="schedule">
        <div class="search-box">
            <input id="search-input" type="text" placeholder="搜索设备">
            <span class="search-icon"></span>
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
                        <div class="count">设备型号
                            <span>{{item.equipmentModel}}</span>
                        </div>
                        <div class="available-time">
                            <span>可预约时间</span> 
                            <div class="time-list">
                                <span v-for="(period, index2) in item.periodList.slice(0, 2)" :key="index2">{{period.startDate}} - {{period.endDate}}</span>
                                <span v-if="item.periodList && item.periodList.length > 3" style="font-size: 10px">......</span>
                            </div>   
                            
                        </div>
                    </div>
                    <!-- <div class="arrange-btn" v-if="item.status == 3" @click="goReserve(item)">安排预约</div> -->
                    <div class="arrange-btn" @click="goReserve(item)">安排预约</div>
                </div>
            </div>
        </div>
        <Dialog :visible="showDialog" @close="closeDialog" class="reservation-dialog">
            <div class="dialog-title">预约该设备</div>
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
                <div class="available-time">
                    <span>可预约时间</span>
                    <div class="time-list">
                        <span v-for="(period, index) in selectedItem.periodList" :key="index">{{period.startDate}} - {{period.endDate}}</span>
                    </div> 
                </div>
                <div class="equipment-note">
                    <span>注意事项</span>
                    <span class="value">{{selectedItem.note}}</span>
                </div>
                <div class="reservation-note">请选择预约时间：</div>
                <div class="start-date">
                    <label for="start-date">开始时间</label>
                    <input v-model="startDate" type="date" name="start-date">
                </div>
                <div class="end-date">
                    <label for="end-date">结束时间</label>
                    <input v-model="endDate" type="date" name="end-date">
                </div>
            </div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog">取消</div>
                <div class="confirm-btn">确定</div>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Dialog from './Dialog'
import Service from '../service/base_service'

export default {
    components: {
        Dialog
    },
    data() {
        return {
            equipmentType: 'all',
            underlineClass: 'type-1',
            showDialog: false,
            startDate: '',
            endDate: '',
            equipmentList: [
                {
                    equipmentName:'联想电脑',
                    equipmentModel: 'GT009',
                    equipmentType: 1,
                    periodList: [
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                    ],
                    note: '该设备属于贵重物品请注意保护，小心使用！',
                    status: 1
                },
                {
                    equipmentName:'戴尔显示屏',
                    equipmentModel: 'SGK004',
                    equipmentType: 2,
                    periodList: [
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                    ],
                    note: '该设备属于贵重物品请注意保护，小心使用！',
                    status: 1
                },
                {
                    equipmentName:'CHERRY键盘',
                    equipmentModel: 'T-405H',
                    equipmentType: 3,
                    periodList: [
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        }
                    ],
                    note: '该设备属于贵重物品请注意保护，小心使用！',
                    status: 3
                },
                {
                    equipmentName:'罗技鼠标',
                    equipmentModel: 'P8TY-P',
                    equipmentType: 4,
                     periodList: [
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        }
                    ],
                    note: '该设备属于贵重物品请注意保护，小心使用！',
                    status: 2
                },
                {
                    equipmentName:'罗技鼠标',
                    equipmentModel: 'P8TY-P',
                    equipmentType: 4,
                    periodList: [
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        }
                    ],
                    note: '该设备属于贵重物品请注意保护，小心使用！',
                    status: 2
                },
                {
                    equipmentName:'罗技鼠标',
                    equipmentModel: 'P8TY-P',
                    equipmentType: 4,
                    periodList: [
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        }
                    ],
                    note: '该设备属于贵重物品请注意保护，小心使用！',
                    status: 1
                },
                {
                    equipmentName:'罗技鼠标',
                    equipmentModel: 'P8TY-P',
                    equipmentType: 4,
                    periodList: [
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        }
                    ],
                    note: '该设备属于贵重物品请注意保护，小心使用！',
                    status: 2
                },
                {
                    equipmentName:'罗技鼠标',
                    equipmentModel: 'P8TY-P',
                    equipmentType: 4,
                    periodList: [
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        },
                        {
                            startDate: '2019.04.01',
                            endDate: '2019.05.01'
                        }
                    ],
                    note: '该设备属于贵重物品请注意保护，小心使用！',
                    status: 3
                }
            ],
            selectedItem: {}
        };
    },
    computed: {
        icon() {
            return item => {
                switch(item.equipmentType) {
                    case 1:
                        return 'computer';
                        break;
                    case 2:
                        return 'display';
                        break;
                    case 3:
                        return 'keyboard';
                        break;
                    case 4:
                        return 'mouse';
                        break;
                    default:
                        return 'computer'
                }
            }
        },
        type() {
            return item => {
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
    methods: {
        goReserve(item) {
            this.selectedItem = item;
            this.showDialog = true;
        },
        closeDialog() {
            this.showDialog = false;
        },
        async test() {
            const result = await Service.queryTemplate(
                {
                    test: 'test001'
                },
                {
                    onSuccess: res => {
                        console.log('res....', res);
                    },
                    onFail: err => {
                        console.log('err....', err);
                    }
                }
            );
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
        color: #2196F3;
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
            background-color: #2196F3;
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
        max-height: calc(100vh - 170px);
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
            .equipment-info {
                flex-grow: 1;
                padding: 0 10px;
                .equipment-name {
                    font-size: 14px;
                    font-weight: bold;
                }
                .count {
                    font-size: 12px;
                    color: #BBB;
                    margin: 5px 0;
                    span {
                        color: #f83600;
                        margin-left: 10px;
                    }
                }
                .available-time {
                    display: flex;
                    justify-content: flex-start;
                    font-size: 12px;
                    color: #BBB; 
                    .time-list {
                        flex-shrink: 1;
                        color: #2196F3;
                        margin-left: 10px;
                        span {
                            text-align: center;
                            display: block;
                        }
                    }
                }
            }
            .reservation-btn, .arrange-btn {
                background-color: #2196F3;
                color: #FFF;
                padding: 5px;
                font-size: 12px;
                border-radius: 3px;
                cursor: pointer;
            }
            .arrange-btn {
                background-color: #2af598;
            }
        }
    }
    .reservation-dialog {
        .dialog-title {
            height: 50px;
            line-height: 50px;
            font-size: 15px;
            text-align: center;
            border-bottom: 1px solid #2196F3;
            background-color: #2196F3;
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
            .equipment-name {
                font-weight: bold;
                font-size: 15px;
            }
            .line {
                width: 100%;
                height: 2px;
                background-color: #2196F3;
                margin: 10px 0 20px 0;
            }
            .equipment-type, .equipment-address, .available-time, .equipment-note {
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                color: #AAA;
                margin-bottom: 20px;
                span {
                    flex-basis: 90px;
                }
                .value {
                    color: #000;
                    flex-grow: 1;
                }
                .time-list {
                    flex-grow: 1;
                    span {
                        color: #000;
                        margin-bottom: 5px;
                        display: block;
                    }
                }
                
            }
            .reservation-note {
                width: 100%;
                text-align: left;
                font-size: 11px;
                color: #2196F3;
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
                background-color: #2196F3;
                color: #FFF;
                border-radius: 3px;
                margin: 20px 10px;
            }
        }
    }

}
</style>
