<template>
	<div class="arrangement">
        <div class="equipment-name">联想笔记本电脑</div>
        <div class="block-list">
            <div class="arrangement-block">
                <div class="block-title">配置当日时间块：</div>
                <div class="date">
                    <div class="pre-day-btn" @click="preDay"></div>
                    <div class="today">{{dayText}}</div>
                    <div class="next-day-btn" @click="nextDay"></div>
                </div>
                <div class="time-list">
                    <div class="time-block available" v-for="(time, index) in dateList" :key="index">
                        <span>{{time.startTime}} - {{time.endTime}}</span>
                        <span class="delete-icon" @click="openDialog('DeleteDialog', 'date', time)"></span>
                    </div>
                    <div class="time-block operator" @click="openDialog('AddDialog', 'date')">
                        <span class="add-icon"></span>
                        <span>待约</span>
                    </div> 
                    <div class="time-block"></div>
                </div>
            </div>  
            <div class="arrangement-block">
                <div class="block-title">配置每天时间块：</div>
                <div class="date" style="justify-content: center">
                    <span>每天</span>
                </div>
                <div class="time-list">
                    <div class="time-block available" v-for="(time, index) in dayList" :key="index">
                        <span>{{time.startTime}} - {{time.endTime}}</span>
                        <span class="delete-icon" @click="openDialog('DeleteDialog', 'day', time)"></span>
                    </div>
                    <div class="time-block operator" @click="openDialog('AddDialog', 'day')">
                        <span class="add-icon"></span>
                        <span>待约</span>
                    </div> 
                    <div class="time-block"></div>
                </div>
            </div>
            <div class="arrangement-block">
                <div class="block-title">配置每周时间块：</div>
                <div class="date">
                    <div class="pre-day-btn" @click="preWeekDay"></div>
                    <div class="today">{{weekText[weekIndex]}}</div>
                    <div class="next-day-btn" @click="nextWeekDay"></div>
                </div>
                <div class="time-list">
                    <div class="time-block available" v-for="(time, index) in weekList" :key="index">
                        <span>{{time.startTime}} - {{time.endTime}}</span>
                        <span class="delete-icon" @click="openDialog('DeleteDialog', 'week', time)"></span>
                    </div>
                    <div class="time-block operator" @click="openDialog('AddDialog', 'week')">
                        <span class="add-icon"></span>
                        <span>待约</span>
                    </div>  
                    <div class="time-block"></div>
                </div>
            </div>
            <div class="arrangement-block">
                <div class="block-title">配置每月时间块：</div>
                <div class="date">
                    <div class="pre-day-btn" @click="preMonthDay"></div>
                    <div class="today">{{monthText[monthIndex]}}</div>
                    <div class="next-day-btn" @click="nextMonthDay"></div>
                </div>
                <div class="time-list">
                    <div class="time-block available" v-for="(time, index) in monthList" :key="index">
                        <span>{{time.startTime}} - {{time.endTime}}</span>
                        <span class="delete-icon" @click="openDialog('DeleteDialog', 'month', time)"></span>
                    </div>
                    <div class="time-block operator" @click="openDialog('AddDialog', 'month')">
                        <span class="add-icon"></span>
                        <span>待约</span>
                    </div>  
                    <div class="time-block"></div>
                </div>
            </div>
        </div>
        <Dialog :visible="showAddDialog" @close="closeDialog('AddDialog')" class="add-dialog">
            <div class="dialog-title">{{dialogTitle}}</div>
            <div class="add-form">
                <div class="form-item">
                    <label>开始时间：</label>
                    <input type="time" placeholder="请输入起始时间" style="width: 150px; height: 30px;" v-model="addForm.startTime"><br>
                </div>
                <div class="form-item">
                    <label>结束时间：</label>
                    <input type="time" placeholder="请输入结束时间" style="width: 150px; height: 30px;"  v-model="addForm.endTime"><br>
                </div>
                <div class="error-text" v-if="showErrorText">
                    <span class="error-icon"></span>
                    <span>该时间块和已有时间块重复，请重新选择</span>
                </div>
            </div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog('AddDialog')">取消</div>
                <div class="confirm-btn" @click="addTimeBlock">确定</div>
            </div>
        </Dialog>
        <Dialog :visible="showDeleteDialog" @close="closeDialog('DeleteDialog')" class="delete-dialog">
            <div class="dialog-title">删除时间块</div>
            <div class="remind-text">确认删除该时间块？</div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog('DeleteDialog')">取消</div>
                <div class="confirm-btn" @click="deleteTime">确定</div>
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
            day: '',
            dayText: '',
            weekText: ['每周日','每周一', '每周二','每周三','每周四','每周五','每周六'],
            weekIndex: 0,
            monthText: ['每月1号', '每月2号', '每月3号', '每月4号', '每月5号', '每月6号', '每月7号', '每月8号', '每月9号', '每月10号', '每月11号', '每月12号', '每月13号', '每月14号', '每月15号', '每月16号', '每月17号', '每月18号', '每月19号', '每月20号', '每月21号', '每月22号', '每月23号', '每月24号', '每月25号', '每月26号', '每月27号', '每月28号', '每月29号', '每月30号', '每月31号', ],
            monthIndex: 0,
            dateList: [],
            dayList: [],
            weekList: [],
            monthList: [],
            showAddDialog: false,
            dialogType: 'date',
            dialogTitle: '添加当日时间块',
            addForm: {
                startTime: '',
                endTime: '',
                date: 0,
                week: 0,
                month: 0,
                repeat: 'date'
            },
            showErrorText: false,
            schedule: [
                {
                    id: 1,
                    startTime: '14:00',
                    endTime: '15:00',
                    month: 22,
                    repeat: 'month'
                },
                {
                    id: 2,
                    startTime: '17:00',
                    endTime: '18:00',
                    month: 24,
                    repeat: 'month'
                },
                {
                    id: 3,
                    startTime: '11:00',
                    endTime: '12:00',
                    date: 1558177542136,
                    repeat: 'date'
                },
                {
                    id: 4,
                    startTime: '13:00',
                    endTime: '14:00',
                    week: 2,
                    repeat: 'week'
                },
                {
                    id: 5,
                    startTime: '12:00',
                    endTime: '13:00',
                    repeat: 'day'
                }
            ],
            showDeleteDialog: false,
            deleteItem: {},
            deleteType: 'date'
        };
    },
    computed: {
    },
    mounted() {
        // 设置时间
        this.day= new Date();
        this.weekIndex = this.day.getDay();
        this.monthIndex = this.day.getDate() - 1;
        this.setDayText();
        // schedule排序
        this.schedule = this.schedule.sort((a, b) => {
            return this.isLater(b.startTime, a.startTime) ? -1 : 1;
        });
        // 设置各个时间块
        for(let i = 0, len = this.schedule.length; i < len; i++) {
            switch(this.schedule[i].repeat) {
                case 'date':
                    if((this.day.getTime() - this.schedule[i].date) <  24 * 60 * 60 * 1000 && (this.day.getTime() - this.schedule[i].date) > 0) {
                        this.dateList.push(this.schedule[i]);
                    }
                    break;
                case 'day': 
                    this.dateList.push(this.schedule[i]);
                    this.dayList.push(this.schedule[i]);
                    break;
                case 'week':
                    if(this.day.getDay() === this.schedule[i].week) {
                        this.dateList.push(this.schedule[i]);
                    }
                    if(this.weekList.length === 0) {
                        this.weekList.push(this.schedule[i]);
                        this.weekIndex = this.schedule[i].week
                    } else if(this.schedule[i].week === this.weekIndex) {
                        this.weekList.push(this.schedule[i]);
                    }
                    break;
                case 'month':
                    if(this.day.getDate() === this.schedule[i].month) {
                        this.dateList.push(this.schedule[i]);
                    }
                    if(this.monthList.length === 0) {
                        this.monthList.push(this.schedule[i]);
                        this.monthIndex = this.schedule[i].month - 1;
                    } else if(this.schedule[i].month === this.monthIndex) {
                        this.monthList.push(this.schedule[i]);
                    }
                default:
            }
        }
    },
    methods: {
        openDialog(dialogName, type, time) {
            if(dialogName === 'AddDialog') {
                this.dialogType = type;
                this.showAddDialog = true;
                if(type === 'date') {
                    this.dialogTitle = '添加当日时间块';
                } else if(type === 'day') {
                    this.dialogTitle = '添加每天时间块';
                } else if(type === 'week') {
                    this.dialogTitle = '添加每周时间块';
                } else if(type === 'month') {
                    this.dialogTitle = '添加每月时间块';
                }
            } else {
                this.showDeleteDialog = true;
                this.deleteItem = time;
                this.deleteType = type;
            }
        },
        closeDialog(dialogName) {
            if(dialogName === 'AddDialog') {
                this.showAddDialog = false;
            } else {
                this.showDeleteDialog = false;
            }
        }, 
        getDateList() {
            this.dateList = [];
            for(let i = 0, len = this.schedule.length; i < len; i++) {
                if(this.schedule[i].repeat === 'date') {
                    if((this.day.getTime() - this.schedule[i].date) <  24 * 60 * 60 * 1000 && (this.day.getTime() - this.schedule[i].date) >= 0) {
                        this.dateList.push(this.schedule[i]);
                    }
                } else if(this.schedule[i].repeat === 'day') {
                    this.dateList.push(this.schedule[i]);
                } else if(this.schedule[i].repeat === 'week') {
                    if(this.day.getDay() === this.schedule[i].week) {
                        this.dateList.push(this.schedule[i]);
                    }
                } else if(this.schedule[i].repeat === 'month') {
                    if(this.day.getDate() === this.schedule[i].month) {
                        this.dateList.push(this.schedule[i]);
                    }
                }
            }
        },
        preDay() {
            this.day = new Date(this.day.getTime() - 24 * 60 * 60 * 1000);
            this.setDayText();
            this.getDateList();
        },
        nextDay() {
            this.day = new Date(this.day.getTime() + 24 * 60 * 60 * 1000);
            this.setDayText();
            this.getDateList();
        },
        getDayList() {
            this.dayList = [];
            for(let i = 0, len = this.schedule.length; i < len; i++) {
                if(this.schedule[i].repeat === 'day') {
                    this.dayList.push(this.schedule[i]);
                }
            }
        },
        getWeekList() {
            this.weekList = [];
            for(let i = 0, len = this.schedule.length; i < len; i++) {
                if(this.schedule[i].repeat === 'week') {
                    if(this.schedule[i].week === this.weekIndex) {
                        this.weekList.push(this.schedule[i]);
                    }
                }
            }
        },
        nextWeekDay() {
            if(this.weekIndex < 6) {
                this.weekIndex++;
                this.getWeekList();
            } else {
                this.weekIndex = 0;
                this.getWeekList();
            }
        },
        preWeekDay() {
            if(this.weekIndex > 0) {
                this.weekIndex--;
                this.getWeekList();
            } else {
                this.weekIndex = 6;
                this.getWeekList();
            }
        },
        getMonthList() {
            this.monthList = [];
            for(let i = 0, len = this.schedule.length; i < len; i++) {
                if(this.schedule[i].repeat === 'month') {
                    if(this.schedule[i].month - 1 === this.monthIndex) {
                        this.monthList.push(this.schedule[i]);
                    }
                }
            }
        },
        nextMonthDay() {
            if(this.monthIndex < 30) {
                this.monthIndex++;
                this.getMonthList();
            } else {
                this.monthIndex = 0;
                this.getMonthList();
            }
        },
        preMonthDay() {
            if(this.monthIndex > 0) {
                this.monthIndex--;
                this.getMonthList();
            } else {
                this.monthIndex = 30;
                this.getMonthList();
            }
        },
        isLater(time1, time2) {
            let date= new Date();
            time1 = date.setHours(time1.split(':')[0], time1.split(':')[1]);
            time2 = date.setHours(time2.split(':')[0], time2.split(':')[1]);
            return time1 >= time2;
        },
        setDayText() {
            let year = this.day.getFullYear();
            let month = this.day.getMonth() + 1;
            month = month > 9 ? month : '0' + month;
            let day = this.day.getDate();
            day = day > 9 ? day : '0' + day;
            this.dayText = year + '-' + month + '-' + day + '（' + this.getWeekDay(this.day.getDay()) + '）';
        },
        addSchedule() {
            console.log(this.dialogType)
            if(this.dialogType === 'date') {
                this.schedule.push({
                    startTime: this.addForm.startTime,
                    endTime: this.addForm.endTime,
                    date: this.day.getTime(),
                    repeat: 'date'
                });
                this.getDateList();
            } else if(this.dialogType === 'day') {
                this.schedule.push({
                    startTime: this.addForm.startTime,
                    endTime: this.addForm.endTime,
                    repeat: 'day'
                });
                console.log(this.schedule)
                this.getDateList();
                this.getDayList();
            } else if(this.dialogType === 'week') {
                this.schedule.push({
                    startTime: this.addForm.startTime,
                    endTime: this.addForm.endTime,
                    week: this.weekIndex,
                    repeat: 'week'
                });
                this.getDateList();
                this.getWeekList();
            } else if(this.dialogType === 'month') {
                this.schedule.push({
                    startTime: this.addForm.startTime,
                    endTime: this.addForm.endTime,
                    month: this.monthIndex + 1,
                    repeat: 'month'
                });
                this.getDateList();
                this.getMonthList();
            }
        },
        addTimeBlock() {
            let canAdd = false;
            let date = new Date();
            let timeList = [...this.dateList];
            if(this.dialogType === 'day') {
                timeList = [...this.dayList];
            } else if(this.dialogType === 'week') {
                timeList = [...this.weekList];
            } else if(this.dialogType === 'month') {
                timeList = [...this.monthList];
            }
            for(let i = 0, len = timeList.length; i < len; i++) {
                if(i == 0) {
                    if(this.isLater(timeList[0].startTime, this.addForm.endTime)) {
                        this.addSchedule();
                        canAdd = true;
                        break;
                    }
                }
                if(i == len - 1) {
                    if(this.isLater(this.addForm.startTime, timeList[i].endTime)) {
                        this.addSchedule();
                        canAdd = true;
                        break;
                    }
                }
                if(this.isLater(this.addForm.startTime, timeList[i - 0].endTime) && this.isLater(timeList[i].startTime, this.addForm.endTime)) {
                    this.addSchedule();
                    canAdd = true;
                    break;
                }
            }
            if(timeList.length === 0) {
                this.addSchedule();
                canAdd = true;
            }
            if(!canAdd) {
                this.showErrorText = true;
            } else {
                this.showAddDialog = false;
                this.showErrorText = false;
            }
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
        deleteTime() {
            switch(this.deleteType) {
                case 'date':
                        break;
                case 'day':
                    for(let i = 0, len = this.schedule.length; i < len; i++) {
                        if(this.schedule[i].id === this.deleteItem.id) {
                            this.schedule.splice(i, 1);
                            break;
                        }
                    }
                    this.getDateList();
                    this.getDayList();
                    break;
                case 'week':
                     for(let i = 0, len = this.schedule.length; i < len; i++) {
                        if(this.schedule[i].id === this.deleteItem.id) {
                            this.schedule.splice(i, 1);
                            break;
                        }
                    }
                    this.getDateList();
                    this.getWeekList();
                case 'month':
                     for(let i = 0, len = this.schedule.length; i < len; i++) {
                        if(this.schedule[i].id === this.deleteItem.id) {
                            this.schedule.splice(i, 1);
                            break;
                        }
                    }
                    this.getDateList();
                    this.getMonthList();
                default:

            }
            this.showDeleteDialog = false;
        }
    }
}
</script>

<style lang="scss">
.arrangement {
    .equipment-name {
        background-color: #FFF;
        text-align: center;
        color: #409EFF;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: bold;
    }
    .block-list{
        height: calc(100% - 40px);
        overflow-x: hidden;
        overflow-y: auto;
    }
    .arrangement-block:not(:last-of-type) {
        margin-bottom: 30px;
    }
    .arrangement-block {
        .block-title {
            color: #409EFF;
            height: 30px;
            font-size: 15px;
            line-height: 30px;  
        }
        .date {
            background-color: rgba(64, 158, 255, .5);
            color: #FFF;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 25px;
            text-align: center;
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
    }
    
    .time-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        background-color: #FFF;
         padding: 1px;
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
            .delete-icon {
                position: absolute;
                top: 2px;
                right: 2px;;
                display: block;
                width: 15px;
                height: 15px;
                background-image: url('../images/delete.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
        }
        .available {
            color: #67C23A;
            background-color: rgba(103, 194, 58, .5);
        }
        .operator {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #67C23A;
            background-color: rgba(103, 194, 58, .5);
            .add-icon {
                width: 15px;
                height: 15px;
                background-size: 100%;
                background-repeat: no-repeat;
                background-image: url('../images/more.png');
                margin-right: 5px;
            }
        }
    }
    .add-dialog, .delete-dialog {
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
            font-size: 14px;
            height: 70px;
            line-height: 70px;
            padding-left: 30px;
        }
        .error-text {
            color: #F56C6C;
            line-height: 15px;
            font-size: 12px;
            display: flex;
            align-items: center;
            margin-top: 5px;
            .error-icon {
                margin-right: 2px;
                display: inline-block;
                width: 12px;
                height: 12px;
                background-size: 100% 100%;
                background-image: url('../images/error.png');
                background-repeat: no-repeat;
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
                font-size: 14px;
                background-color: #409EFF;
                color: #FFF;
                border-radius: 3px;
                margin: 0 10px 20px 10px;
            }
        }
        .add-form {
            font-size: 16px;
            padding: 20px;
            .form-item {
                display: flex;
                align-items: center;
                margin-bottom: 15px;
                justify-content: center;
            }
            
        }
    }
}
</style>
