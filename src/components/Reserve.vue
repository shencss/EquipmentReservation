<template>
	<div class="reserve">
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
        <div class="reserve-title">请选择预约时间：</div>
        <div class="date">
            <div class="pre-day-btn" @click="preDay"></div>
            <div class="today">{{dayText}}</div>
            <div class="next-day-btn" @click="nextDay"></div>
        </div>
        <div class="time-list">
            <div :class="['time-block', time.status, time.selected ? 'selected' : '']" v-for="(time, index) in dateList" :key="index" @click="addReserve(time, index)">{{time.startTime}} - {{time.endTime}}</div>
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
            <div class="passed">
                <span class="block"></span>
                <span>过去</span>
            </div>
        </div>
        <div class="reserve-title">更多需求：</div>
        <textarea cols="25" rows="5" maxlength="1000" placeholder="请输入更多需求"  v-model="note" style="margin-left: 20px; width: calc(100% - 40px);
        height: 100px;"></textarea>
        <div class="operator-btns">
            <div class="cancel-btn" @click="goBack">取消</div>
            <div :class="['reserve-btn', reserveList.length > 0 ? '' : 'disabled']" @click="reserve">立即预约</div>
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
            now : '',
            day: '',
            dayText: '',
            schedule: [],
            forbid: [],
            dateList: [],
            reserveList: [],
            note: ''
        };
    },
    computed: {
        equipment() {
            return JSON.parse(this.$route.query.data) || {}
        }
    },
    mounted() {
        // 设置时间
        this.now = new Date();
        this.day = new Date();
        if(this.$route.query.note) {
            this.note = this.$route.query.note
        }
        this.setDayText();
        // schedule排序
        this.schedule = this.equipment.schedules;
        this.forbid = this.equipment.forbids;
        this.schedule = this.schedule.sort((a, b) => {
            return this.isLater(b.startTime, a.startTime) ? -1 : 1;
        });
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
            this.dayText = year + '-' + month + '-' + day + '（' + this.getWeekDay(this.day.getDay()) + '）';
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
        isSameDay(date1, date2) {
            return (date1 - date2) <  24 * 60 * 60 * 1000 && (date1 - date2) >= 0
        },
        isPassed(startTime) {
            let day = new Date(this.day.getTime());
            day.setHours(startTime.split(':')[0], startTime.split(':')[1], 0);
            return this.now.getTime() > day.getTime();
        },
        getDateList() {
            this.dateList = [];
            for(let i = 0, len = this.schedule.length; i < len; i++) {
                if(this.schedule[i].repeat == 'date') {
                    if(this.isSameDay(this.day.getTime(), this.schedule[i].date)) {
                        // 检查时间是否过去
                        if(this.isPassed(this.schedule[i].startTime)) {
                            this.schedule[i].status = 'passed';
                        } else {
                            this.schedule[i].status = 'available';
                        }
                        let date = {...this.schedule[i]}
                        // 检查是否被选
                        for(let k = 0, len3 = this.reserveList.length; k < len3; k++) {
                            if(this.reserveList[k].date == this.day.getTime() && this.reserveList[k].startTime == this.schedule[i].startTime) {
                                date.selected = true;
                                break;
                            }
                        }
                        this.dateList.push(date);
                    }
                } else if(this.schedule[i].repeat == 'day') {
                    // 检查是否被禁止
                    for(let j = 0, len2 = this.forbid.length; j < len2; j++) {
                        if(this.schedule[i].scheduleId == this.forbid[j].scheduleId) {
                            if(this.isSameDay(this.day.getTime(), this.forbid[j].date)) {
                                this.schedule[i].forbid = true;
                                break;
                            } else {
                                this.schedule[i].forbid = false ;
                            }
                        }
                    }
                    if(!this.schedule[i].forbid) {
                        // 检查时间是否过去
                        if(this.isPassed(this.schedule[i].startTime)) {
                            this.schedule[i].status = 'passed';
                        } else {
                            this.schedule[i].status = 'available';
                        }
                        let date = {...this.schedule[i]}
                        // 检查是否被选
                        for(let k = 0, len3 = this.reserveList.length; k < len3; k++) {
                            if(this.reserveList[k].date == this.day.getTime() && this.reserveList[k].startTime == this.schedule[i].startTime) {
                                date.selected = true;
                                break;
                            }
                        }
                        this.dateList.push(date);
                    }
                } else if(this.schedule[i].repeat == 'week') {
                    if(this.day.getDay() == this.schedule[i].week) {
                        for(let j = 0, len2 = this.forbid.length; j < len2; j++) {
                            if(this.schedule[i].scheduleId == this.forbid[j].scheduleId) {
                                if(this.isSameDay(this.day.getTime(), this.forbid[j].date)) {
                                    this.schedule[i].forbid = true;
                                    this.schedule[i].forbidId = this.forbid[j].forbidId;
                                    break;
                                } else {
                                    this.schedule[i].forbid = false;
                                }
                            }
                        }
                        // 检查时间是否过去
                        if(this.isPassed(this.schedule[i].startTime)) {
                            this.schedule[i].status = 'passed';
                        } else {
                            this.schedule[i].status = 'available';
                        }
                        let date = {...this.schedule[i]}
                        // 检查是否被选
                        for(let k = 0, len3 = this.reserveList.length; k < len3; k++) {
                            if(this.reserveList[k].date == this.day.getTime() && this.reserveList[k].startTime == this.schedule[i].startTime) {
                                date.selected = true;
                                break;
                            }
                        }
                        this.dateList.push(date);
                    }
                } else if(this.schedule[i].repeat == 'month') {
                    if(this.day.getDate() == this.schedule[i].month) {
                        for(let j = 0, len2 = this.forbid.length; j < len2; j++) {
                            if(this.schedule[i].scheduleId == this.forbid[j].scheduleId) {
                                if(this.isSameDay(this.day.getTime(), this.forbid[j].date)) {
                                    this.schedule[i].forbid = true;
                                    this.schedule[i].forbidId = this.forbid[j].forbidId;
                                    break;
                                } else {
                                    this.schedule[i].forbid = false;
                                }
                            }
                        }
                        // 检查时间是否过去
                        if(this.isPassed(this.schedule[i].startTime)) {
                            this.schedule[i].status = 'passed';
                        } else {
                            this.schedule[i].status = 'available';
                        }
                        let date = {...this.schedule[i]}
                        // 检查是否被选
                        for(let k = 0, len3 = this.reserveList.length; k < len3; k++) {
                            if(this.reserveList[k].date == this.day.getTime() && this.reserveList[k].startTime == this.schedule[i].startTime) {
                                date.selected = true;
                                break;
                            }
                        }
                        this.dateList.push(date);
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
        addReserve(time, index) {
            if(time.status == 'available') {
                if(time.selected){
                    time.selected = false;
                    this.dateList.splice(index, 1, time);
                    for(let i = 0, len = this.reserveList.length; i < len; i++) {
                        if(this.reserveList[i].date == this.day.getTime() && this.reserveList[i].startTime == time.startTime) {
                            this.reserveList.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    time.selected = true;
                    this.reserveList.push({
                        date: this.day.getTime(),
                        startTime: time.startTime,
                        endTime: time.endTime
                    });
                }
            }
        },
        reserve() {
            if(this.reserveList.length > 0) {
                let dates = encodeURI(JSON.stringify(this.reserveList));
                let url = getBaseUrl() + '&action=reserve&equipmentId=' + this.equipment.equipmentId + '&userId=1' + '&note=' + this.note  + '&dates=' + dates;
                this.$axios.get(url).then(res => {
                    this.$router.push({
                        path: '/mine'
                    });
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss">
.reserve {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
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
}
</style>
