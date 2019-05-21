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
                    return schedule.date;
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
        searchEquipment() {
            this.$axios.get(getBaseUrl() + '&action=getAvailableEquipments&pageNum=1&pageSize=20&equipmentName=' + this.searchForm.equipmentName).then(res => {
                this.equipmentList = res.data.result;
            }).catch(err => {
                console.log(err);
            });
        },
        goReserve(item) {
            this.$axios.get(getBaseUrl() + '&action=getScheduleDetail&equipmentId=' + item.equipmentId).then(res => {
                this.$router.push({
                    path: '/reserve',
                    query: {
                        data: JSON.stringify(res.data.result)
                    }
                });
            }).catch(err => {
                console.log(err);
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
        max-height: calc(100vh - 50px);
        padding: 0 10px;
        overflow-x: hidden;
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
                background-color: #67C23A;
                color: #FFF;
                padding: 6px 10px;
                font-size: 14px;
                border-radius: 3px;
                cursor: pointer;
                flex-shrink: 0;
            }
        }
    }
}
</style>
