<template>
	<div class="reservation">
        <div class="search-box">
            <input id="search-input" v-model="searchForm.equipmentName" type="text" placeholder="搜索设备">
            <span class="search-icon" @click="searchEquipment"></span>
        </div>
        <div class="equipment-list">
            <div class="equipment-item" v-for="(item, index) in equipmentList" :key=index>
                <div :class="['equipment-icon', icon(item)]"></div>
                <div class="equipment-info">
                    <div class="equipment-name">{{item.equipmentName}}</div>
                    <div class="available-time" style="margin-top: 5px;">
                        <span>可预约时间</span> 
                    </div>
                    <div class="time-list" v-if="item.schedules.length > 0">
                        <span v-for="(schedule, index2) in item.schedules.slice(0, 2)" :key="index2">
                            {{timeText(schedule)}}: {{schedule.startTime}} - {{schedule.endTime}}
                            <span v-if="index2 == 0 && item.schedules.length > 1">,</span>
                        </span>
                        <div v-if="item.schedules.length > 2" style="font-size: 10px">......</div>
                    </div> 
                </div>
                <div class="reservation-btn" @click="goReserve(item)">预约</div>
            </div>
        </div>
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
            equipmentList: [],
            selectedItem: {},
            searchForm: {
                equipmentName: ''
            },
            weekText: ['每周日','每周一', '每周二','每周三','每周四','每周五','每周六'],
            monthText: ['每月1号', '每月2号', '每月3号', '每月4号', '每月5号', '每月6号', '每月7号', '每月8号', '每月9号', '每月10号', '每月11号', '每月12号', '每月13号', '每月14号', '每月15号', '每月16号', '每月17号', '每月18号', '每月19号', '每月20号', '每月21号', '每月22号', '每月23号', '每月24号', '每月25号', '每月26号', '每月27号', '每月28号', '每月29号', '每月30号', '每月31号', ],
        };
    },
    computed: {
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
        timeText(schedule) {
            switch(schedule.repeat) {
                case 'date':
                    return this.setDayText(schedule.date);
                    break;
                case 'day':
                    return '每天';
                    break;
                case 'week':
                    return this.weekText[schedule.week];
                    break;
                case 'month':
                    return this.monthText[schedule.month - 1];
                    break;
                default:
            }
        },
        setDayText(time) {
            time = new Date(time);
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            month = month > 9 ? month : '0' + month;
            let day = time.getDate();
            day = day > 9 ? day : '0' + day;
            return year + '-' + month + '-' + day;
        },
        searchEquipment() {
            this.$axios.get(getBaseUrl() + '&action=getAvailableEquipments&pageNum=1&pageSize=20&equipmentName=' + this.searchForm.equipmentName).then(res => {
                this.equipmentList = res.data.result;
            }).catch(err => {
                console.log(err);
            });
        },
        goReserve(item) {
            this.$router.push({
                path: '/reserve',
                query: {
                    data: JSON.stringify(item)
                }
            });
        }
    }
}
</script>

<style lang="scss">
.reservation {
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
        background-color: #FFF;
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
                flex-shrink: 0;
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
