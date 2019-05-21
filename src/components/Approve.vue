<template>
	<div class="approve">
        <div class="overflow">
            <div class="equipment-info">
                <div class="equipment-name">
                    <span>设备名称：</span>
                    <span class="value">{{equipment.equipmentName}}</span>
                </div>
                <div class="equipment-type">
                    <span>设备类型：</span>
                    <span class="value">{{equipment.equipmentType}}</span>
                </div>
                <div class="equipment-model">
                    <span>设备型号：</span>
                    <span class="value">{{equipment.equipmentModel}}</span>
                </div>
                <div class="address">
                    <span>设备地点：</span>
                    <span class="value">{{equipment.address}}</span>
                </div>
                <div class="address">
                    <span>联系电话：</span>
                    <span class="value">{{equipment.phone}}</span>
                </div>
                <div class="address">
                    <span>收费信息：</span>
                    <span class="value">{{equipment.cost}}</span>
                </div>
                <div class="address">
                    <span>使用注意：</span>
                    <span class="value">{{equipment.note}}</span>
                </div>
            </div>
            <div class="reserve-title">审批使用预约：</div>
            <div class="date">
                <div class="pre-day-btn" @click="preDay"></div>
                <div class="today">{{dayText + '（' + weekText[day.getDay()] + '）'}}</div>
                <div class="next-day-btn" @click="nextDay"></div>
            </div>
            <div class="time-list">
                <div :class="['time-block', time.status]" v-for="(time, index) in dateList" :key="index" @click="openDialog(time)">{{time.startTime}} - {{time.endTime}}</div>
                <div class="time-block"></div>
            </div>
            <div class="description">
                <div class="reserved">
                    <span class="block"></span>
                    <span>已约</span>
                </div>
                <div class="available">
                    <span class="block"></span>
                    <span>可约</span>
                </div>
                <div class="approve">
                    <span class="block"></span>
                    <span>待批</span>
                </div>
                <div class="passed">
                    <span class="block"></span>
                    <span>过去</span>
                </div>
            </div>
        </div>
        <Dialog :visible="showApproveDialog" @close="closeDialog('ApproveDialog')" class="approve-dialog">
            <div class="dialog-title">预约列表</div>
            <div class="reserve-list">
                <div class="reserve" v-for="index in selectedItem.reserveIndex" :key="index">
                    <div class="reserve-info">
                        <div class="user-name">
                            <span>预约者：</span>
                            <span class="value">{{reserves[index].userName}}</span>
                        </div>
                        <div class="phone">
                            <span>联系电话：</span>
                            <span class="value">{{reserves[index].phone}}</span>
                        </div>
                        <div class="note">
                            <span>更多需求：</span>
                            <span class="value">{{reserves[index].note}}</span>
                        </div>
                        <div class="time">
                            <span>预约时间：</span>
                            <span class="value">{{timeText(reserves[index].reserveTime)}}</span>
                        </div>
                    </div>
                    <div class="operator-btns">
                        <div class="approve-btn" @click="passReserve(index)">同意</div>
                        <div class="reject-btn" @click="rejectReserve(index)">拒绝</div>
                    </div>
                </div>
            </div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog('ApproveDialog')">关闭</div>
            </div>
        </Dialog>
        <Dialog :visible="showReservedDialog" @close="closeDialog('ReservedDialog')" class="reserved-dialog">
            <div class="dialog-title">预约详情</div>
            <div class="reserve-list">
                <div class="reserve" v-for="index in selectedItem.reserveIndex" :key="index">
                    <div class="reserve-info">
                        <div class="user-name">
                            <span>预约者：</span>
                            <span class="value">{{reserves[index].userName}}</span>
                        </div>
                        <div class="phone">
                            <span>联系电话：</span>
                            <span class="value">{{reserves[index].phone}}</span>
                        </div>
                        <div class="note">
                            <span>更多需求：</span>
                            <span class="value">{{reserves[index].note}}</span>
                        </div>
                        <div class="time">
                            <span>预约时间：</span>
                            <span class="value">{{timeText(reserves[index].reserveTime)}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog('ReservedDialog')">关闭</div>
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
            now : '',
            day: new Date(),
            dayText: '',
            schedule: [],
            forbid: [],
            dateList: [],
            reserves: [],
            selectedItem: {},
            showApproveDialog:  false,
            showReservedDialog: false,
            weekText: ['星期日','星期一', '星期二','星期三','星期四','星期五','星期六'],
        };
    },
    computed: {
        equipment() {
            return JSON.parse(this.$route.query.data)|| {}
        }
    },
    mounted() {
        // 设置时间
        this.now = new Date();
        this.schedule = this.equipment.schedules;
        this.forbid = this.equipment.forbids;
        this.reserves = this.equipment.reserves;
        // schedule排序
        this.schedule.sort((a, b) => {
            return this.isLater(b.startTime, a.startTime) ? -1 : 1;
        });
        // reserves排序
        this.reserves.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        if(this.reserves.length > 0) {
            for(let i = 0, len = this.reserves.length; i < len; i++) {
                if(this.reserves[i].status == 1) {
                    this.day = new Date(this.reserves[i].date);
                    break;
                }
            }
        } else {
            this.day = new Date();
        }
        this.setDayText();
        // 设置时间块
        this.getDateList();
    },
    methods: {
        setDayText() {
            let year = this.day.getFullYear();
            let month = this.day.getMonth() + 1;
            month = month > 9 ? month : '0' + month;
            let day = this.day.getDate();
            day = day > 9 ? day : '0' + day;
            this.dayText = year + '-' + month + '-' + day;
        },
        timeText(millisecond) {
            let date = new Date(millisecond);
            let year = date.getFullYear();
            let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
            let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
            let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
            let min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
            return year + '-' + month + '-' + day + '  ' + hour + ':' + min;
        },
        getWeekDay(day) {
            switch(day) {
                case 1:
                    return '星期一';
                    break;
                case 2:
                    return '星期二';
                    break;
                case 3: 
                    return '星期三';
                    break;
                case 4: 
                    return '星期四';
                    break;
                case 5: 
                    return '星期五';
                    break;
                case 6: 
                    return '星期六';
                    break;
                case 0: 
                    return '星期日';
                    break;   
                default:
                    return '星期一';
            }
        },
        isLater(time1, time2) {
            let date= new Date();
            time1 = date.setHours(time1.split(':')[0], time1.split(':')[1]);
            time2 = date.setHours(time2.split(':')[0], time2.split(':')[1]);
            return time1 > time2;
        },
        isSameDay(date) {
            return date === this.dayText;
        },
        isPassed(startTime) {
            let day = new Date(this.day.getTime());
            day.setHours(startTime.split(':')[0], startTime.split(':')[1], 0);
            return this.now.getTime() > day.getTime();
        },
        getDateList() {
            this.dateList = [];
            //获取dateList
            for(let i = 0, len = this.schedule.length; i < len; i++) {
                let date = {...this.schedule[i]};
                if(date.repeat == 'date') {
                    if(this.isSameDay(date.date)) {
                        // 检查是否被禁止
                        for(let j = 0, len2 = this.forbid.length; j < len2; j++) {
                            if(date.scheduleId == this.forbid[j].scheduleId) {
                                if(this.isSameDay(this.forbid[j].date)) {
                                    date.forbid = true;
                                    break;
                                } else {
                                    date.forbid = false ;
                                }
                            }
                        }
                        if(date.forbid) continue;
                        // 检查时间块是否需要合并
                        if(this.dateList.length > 0) {
                            let lastDate = this.dateList[this.dateList.length - 1];
                            if(this.isLater(lastDate.endTime, date.startTime)) {
                                lastDate.endTime = date.endTime;
                                this.dateList.splice(this.dateList.length - 1, 1, lastDate);
                                continue;
                            }
                        }
                        this.dateList.push(date);
                    }
                } else if(date.repeat == 'day') {
                    // 检查是否被禁止
                    for(let j = 0, len2 = this.forbid.length; j < len2; j++) {
                        if(date.scheduleId == this.forbid[j].scheduleId) {
                            if(this.isSameDay(this.forbid[j].date)) {
                                date.forbid = true;
                                break;
                            } else {
                                date.forbid = false ;
                            }
                        }
                    }
                    if(date.forbid) continue;
                    // 检查时间块是否需要合并
                    if(this.dateList.length > 0) {
                        let lastDate = this.dateList[this.dateList.length - 1];
                        if(this.isLater(lastDate.endTime, date.startTime)) {
                            lastDate.endTime = date.endTime;
                            this.dateList.splice(this.dateList.length - 1, 1, lastDate);
                            continue;
                        }
                    }
                    this.dateList.push(date);
                } else if(date.repeat == 'week') {
                    if(this.day.getDay() == date.week) {
                        // 检查是否被禁止
                        for(let j = 0, len2 = this.forbid.length; j < len2; j++) {
                            if(date.scheduleId == this.forbid[j].scheduleId) {
                                if(this.isSameDay(this.forbid[j].date)) {
                                    date.forbid = true;
                                    break;
                                } else {
                                    date.forbid = false ;
                                }
                            }
                        }
                        if(date.forbid) continue;
                        if(this.dateList.length > 0) {
                            let lastDate = this.dateList[this.dateList.length - 1];
                            if(this.isLater(lastDate.endTime, date.startTime)) {
                                lastDate.endTime = date.endTime;
                                this.dateList.splice(this.dateList.length - 1, 1, lastDate);
                                continue;
                            }
                        }
                        this.dateList.push(date);
                    }
                } else if(date.repeat == 'month') {
                    if(this.day.getDate() == date.month) {
                        // 检查是否被禁止
                        for(let j = 0, len2 = this.forbid.length; j < len2; j++) {
                            if(date.scheduleId == this.forbid[j].scheduleId) {
                                if(this.isSameDay(this.forbid[j].date)) {
                                    date.forbid = true;
                                    break;
                                } else {
                                    date.forbid = false ;
                                }
                            }
                        }
                        if(date.forbid) continue;
                        if(this.dateList.length > 0) {
                            let lastDate = this.dateList[this.dateList.length - 1];
                            if(this.isLater(lastDate.endTime, date.startTime)) {
                                lastDate.endTime = date.endTime;
                                this.dateList.splice(this.dateList.length - 1, 1, lastDate);
                                continue;
                            }
                        }
                        this.dateList.push(date);
                    }
                }
            }
            // 设置dateList状态
            for(let i = 0, len = this.dateList.length; i < len; i++) {
                this.dateList[i].reserveIndex= [];
                //  是否过时
                if(this.isPassed(this.dateList[i].startTime)) {
                    this.dateList[i].status = 'passed';
                } else {
                    this.dateList[i].status = 'available';
                }
                for(let j = 0, len2 = this.reserves.length; j < len2; j++) {
                    // 是否被预约
                    if(this.reserves[j].startTime == this.dateList[i].startTime && this.reserves[j].endTime == this.dateList[i].endTime && this.isSameDay(this.reserves[j].date)) {
                        if(this.dateList[i].status == 'available') {
                            if(this.reserves[j].status == 1) {
                                this.dateList[i].status = 'approve';
                            } else if(this.reserves[j].status == 3) {
                                this.dateList[i].status = 'reserved';
                            }
                        }
                        this.dateList[i].reserveIndex.push(j);
                    }
                }
            }
        },
        preDay() {
            this.now = new Date();
            this.day = new Date(this.day.getTime() - 24 * 60 * 60 * 1000);
            this.setDayText();
            this.getDateList();
        },
        nextDay() {
            this.now = new Date();
            this.day = new Date(this.day.getTime() + 24 * 60 * 60 * 1000);
            this.setDayText();
            this.getDateList();
        },
        openDialog(time) {
            if(time.status == 'approve') {
                this.showApproveDialog = true;
            } else if(time.status == 'reserved') {
                this.showReservedDialog = true;
            }
            this.selectedItem = time;
        },
        closeDialog(dialogName) {
            if(dialogName == 'ApproveDialog') {
                this.showApproveDialog = false;
            } else if(dialogName == 'ReservedDialog') {
                this.showReservedDialog = false;
            }
        },
        passReserve(index) {
            let recordId = this.reserves[index].recordId;
            let rejectIds = [];
            for(let i = 0, len = this.selectedItem.reserveIndex.length; i < len; i++) {
                if(this.selectedItem.reserveIndex[i] != index) {
                    rejectIds.push(this.reserves[this.selectedItem.reserveIndex[i]].recordId);
                }
            }
            rejectIds = encodeURI(JSON.stringify(rejectIds));
            this.$axios.get(getBaseUrl() + '&action=passReserve&recordId=' + recordId + '&userId=2' + '&rejectIds=' + rejectIds).then(res => {
                this.showApproveDialog = false;
                this.selectedItem = {};
                return this.$axios.get(getBaseUrl() + '&action=getScheduleDetail&equipmentId=' + this.equipment.equipmentId);
            }).then(res => {
                this.schedule = res.data.result.schedules;
                this.forbid = res.data.result.forbids;
                this.reserves = res.data.result.reserves;
                // schedule排序
                this.schedule.sort((a, b) => {
                    return this.isLater(b.startTime, a.startTime) ? -1 : 1;
                });
                // reserves排序
                this.reserves.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
                if(this.reserves.length > 0) {
                    for(let i = 0, len = this.reserves.length; i < len; i++) {
                        if(this.reserves[i].status == 1) {
                            this.day = new Date(this.reserves[i].date);
                            break;
                        }
                    }
                } else {
                    this.day = new Date();
                }
                this.setDayText();
                // 设置时间块
                this.getDateList();
            }).catch(err => {
                console.log(err);
            });
        },
        rejectReserve(index) {
            let recordId = this.reserves[index].recordId
            this.$axios.get(getBaseUrl() + '&action=rejectReserve&recordId=' + recordId + '&userId=2').then(res => {
                this.showApproveDialog = false;
                this.selectedItem = {};
                return this.$axios.get(getBaseUrl() + '&action=getScheduleDetail&equipmentId=' + this.equipment.equipmentId);
            }).then(res => {
                this.schedule = res.data.result.schedules;
                this.forbid = res.data.result.forbids;
                this.reserves = res.data.result.reserves;
                // schedule排序
                this.schedule.sort((a, b) => {
                    return this.isLater(b.startTime, a.startTime) ? -1 : 1;
                });
                // reserves排序
                this.reserves.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
                if(this.reserves.length > 0) {
                    for(let i = 0, len = this.reserves.length; i < len; i++) {
                        if(this.reserves[i].status == 1) {
                            this.day = new Date(this.reserves[i].date);
                            break;
                        }
                    }
                } else {
                    this.day = new Date();
                }
                this.setDayText();
                // 设置时间块
                this.getDateList();
            }).catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style lang="scss">
.approve {
    .overflow {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .equipment-info {
        background-color: #FFF;
        color: #909399;
        padding: 20px;
        div {
            line-height: 25px;
        }
        .value {
            color: #303133;
        }
    }
    .reserve-title {
        color: #303133;
        height: 40px;
        font-size: 15px;
        line-height: 40px; 
        padding-left: 20px; 
    }
    .date {
        background-color: rgba(64, 158, 255, .5);
        color: #FFF;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 25px;
        .pre-day-btn, .next-day-btn {
            width: 28px;
            height: 28px;
            background-size: 100%;
            background-repeat: no-repeat;
            background-image: url('../images/pre.png');
        }
        .next-day-btn {
            background-image: url('../images/next.png');
        }
    }
    .time-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        background-color: #FFF;
        .time-block {
            position: relative;
            display: inline-block;
            width: 33.33%;
            height: 55px;
            line-height: 55px;
            text-align: center;
            font-weight: bold;
            border: 1px solid #FFF;
            box-sizing: border-box;
            font-size: 14px;
        }
        .reserved {
            color: #F56C6C;
            background-color: rgba(244, 107, 107, .5);
        }
        .available {
            color: #67C23A;
            background-color: rgba(103, 194, 58, .5);
        }
        .approve {
            color: #E6A23C;
            background-color: rgba(230, 162, 60, .5);
        }
        .passed {
            color: #909399;
            background-color: rgba(144, 147, 153, .5);
        }
        .selected::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 3px solid #F56C6C;
        }
    }
    .description {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 30px;
        margin-top: 20px;
        margin-bottom: 10px;
        .reserved, .available, .approve, .passed {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: #F56C6C;
            margin-right: 20px;
            .block {
                width: 17px;
                height: 17px;
                background-color: #F56C6C;
                margin-right: 5px
            }
        }
        .reserved {
            color: #F56C6C;
            .block {
                background-color: #F56C6C;
            }
        }
        .available {
            color: #67C23A;
            .block {
                background-color: #67C23A;
            }
        }
        .approve {
            color: #E6A23C;
            .block {
                background-color: #E6A23C;
            }
        }
        .passed {
            color: #909399;
            .block {
                background-color: #909399;
            }
        }
    }
    .operator-btns {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 60px;
        margin-top: 20px;
        .cancel-btn, .reserve-btn {
            height: 35px;
            background-color: #409EFF;
            color: #FFF;
            font-size: 14px;
            line-height: 35px;
            text-align: center;
            margin: 0 10px;
            width: 80px;
            border-radius: 5px;
            cursor: pointer;
        }
        .disabled {
            background-color: #909399;
        }
    }
    .approve-dialog, .reserved-dialog {
        .dialog-title {
            height: 50px;
            line-height: 50px;
            font-size: 15px;
            text-align: center;
            border-bottom: 1px solid #409EFF;
            background-color: #409EFF;
            color: #FFF;
        }
        .reserve-list {
            padding: 0 15px;
            padding-bottom: 25px;
            .reserve {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #409EFF;
                padding: 15px 0;
                .reserve-info {
                    font-size: 14px;
                    div {
                        height: 20px;
                        line-height: 20px;
                        color: #909399;
                    }
                    .value {
                        color: #303133;
                    }

                }
                .operator-btns {
                    flex-shrink: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0;
                    .approve-btn, .reject-btn {
                        height: 25px;
                        background-color: #F56C6C;
                        color: #FFF;
                        font-size: 12px;
                        line-height: 25px;
                        text-align: center;
                        width: 50px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    .approve-btn {
                        background-color: #67C23A;
                        margin-right: 5px;
                    }
                }
            }
        }
        .operate-btns {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            .cancel-btn, .confirm-btn {
                padding: 0 20px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 14px;
                background-color: #409EFF;
                color: #FFF;
                border-radius: 3px;
                margin: 0 10px 20px 10px;
            }
        }
    }
    .reserved-dialog {
        .reserve-list {
            .reserve {
                border-bottom: none;
            }
        }
    }
}
</style>
