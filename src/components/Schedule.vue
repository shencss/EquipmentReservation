<template>
	<div class="schedule">
        <div class="search-box">
            <input id="search-input" v-model="searchForm.equipmentName" type="text" placeholder="输入设备名称搜索">
            <span class="search-icon" @click="searchEquipment"></span>
        </div>
        
        <div class="equipment-list">
            <div class="item-warp" v-for="(item, index) in equipmentList" :key=index>
                <div class="equipment-item">
                    <div :class="['equipment-icon', icon(item)]"></div>
                    <div class="equipment-info">
                        <div class="equipment-name">
                            <span>{{item.equipmentName}}</span>
                        </div>
                        <div class="remind">有3名用户正在预约该设备，请进行审批</div>
                        <div class="available-time">
                            <span>可预约时间</span> 
                        </div>
                        <div class="time-list" v-if="item.schedules.length > 0">
                            <span v-for="(schedule, index2) in item.schedules.slice(0, 2)" :key="index2">
                                <span>{{timeText(schedule)}}: {{schedule.startTime}} - {{schedule.endTime}}</span>
                                <span v-if="index2 == 0 && item.schedules.length > 1">,</span>
                            </span>
                            <div v-if="item.schedules.length > 2" style="font-size: 10px">......</div>
                        </div>   
                        <div v-else style="text-align: center; font-size: 14px; margin-top: 5px;">尚未安排可预约时间,请点击安排</div>
                    </div>
                    <div class="operator-btns">
                        <div class="arrange-btn" @click="goArrangement(item)">安排时间</div>
                        <div class="approve-btn" @click="goApprove(item)">审批预约</div>
                    </div>
                </div>
            </div>
        </div>
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
                switch(item.equipmentType) {
                    case '笔记本':
                    case '电脑':
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
        },
    },
    mounted() {
        this.$axios.get(getBaseUrl() + '&action=getAllEquipments').then(res => {
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
            this.$axios.get(getBaseUrl() + '&action=getAllEquipments&equipmentName=' + this.searchForm.equipmentName).then(res => {
                this.equipmentList = res.data.result;
            }).catch(err => {
                console.log(err);
            });
        },
        goArrangement(item) {
            this.$router.push({
                path: '/arrangement',
                query: {
                    data: item
                }
            });
        },
        goApprove(item) {

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
        font-size: 14px;
        div {
            position: relative;
            flex: 1;
            text-align: center;
            height: 35px;
            line-height: 35px;
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
                .remind {
                    font-size: 12px;
                    color: #F56C6C;
                    margin: 2px 0 3px 0;
                }
                .available-time {
                    display: flex;
                    justify-content: flex-start;
                    font-size: 14px;
                    color: #909399; 
                }
                .time-list {
                    flex-shrink: 1;
                    color: #409EFF;
                    font-size: 12px;
                    margin-top: 5px;
                    span {
                        margin-top: 5px;
                    }
                }
            }
            .approve-btn, .arrange-btn {
                background-color: #67C23A;
                color: #FFF;
                padding: 5px;
                font-size: 14px;
                border-radius: 3px;
                cursor: pointer;
                flex-shrink: 0;
            }
            .approve-btn {
                background-color: #F56C6C;
                margin-top: 5px;
            }
        }
    }
}
</style>
