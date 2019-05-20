<template>
	<div class="arrangement">
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
                    <span class="value">{{equipment.equipmentModel ? equipment.equipmentModel : '无'}}</span>
                </div>
                <div class="address">
                    <span>设备地点：</span>
                    <span class="value">{{equipment.address ? equipment.address : '无'}}</span>
                </div>
                <div class="address">
                    <span>联系电话：</span>
                    <span class="value">{{equipment.phone ? equipment.phone : '无'}}</span>
                </div>
                <div class="address">
                    <span>收费信息：</span>
                    <span class="value">{{equipment.cost ? equipment.cost : '无'}}</span>
                </div>
                <div class="address">
                    <span>使用注意：</span>
                    <span class="value">{{equipment.note ? equipment.note : '无'}}</span>
                </div>
            </div>
            
            <div class="block-list">
                <div class="arrangement-block">
                    <div class="block-title">配置当日时间块：</div>
                    <div class="date">
                        <div class="pre-day-btn" @click="preDay"></div>
                        <div class="today">{{dayText}}</div>
                        <div class="next-day-btn" @click="nextDay"></div>
                    </div>
                    <div class="time-list">
                        <div :class="['time-block', time.forbid ? 'forbid' : 'available']" v-for="(time, index) in dateList" :key="index">
                            <span>{{time.startTime}} - {{time.endTime}}</span>
                            <span v-if="time.repeat == 'date'" class="delete-icon" @click="openDialog('DeleteDialog', 'date', time)"></span>
                            <span v-if="time.repeat !== 'date' && !time.forbid" class="available-icon" @click="openDialog('ForbidDialog', 'date' ,time)"></span>
                            <span v-if="time.repeat !== 'date' && time.forbid" class="forbid-icon" @click="openDialog('AvailableDialog', 'date', time)"></span>
                            <span class="repeat-text" v-if="time.repeat !== 'date'">{{time.repeat == 'day' ? '每天' : (time.repeat == 'week' ? weekText[time.week] : monthText[time.month - 1])}}</span>
                        </div>
                        <div class="time-block operator" @click="openDialog('AddDialog', 'date')">
                            <span class="add-icon"></span>
                            <span>可约</span>
                        </div> 
                        <div class="time-block"></div>
                    </div>
                    <div class="description">
                        <div class="available">
                            <span class="block"></span>
                            <span>可约</span>
                        </div>
                        <div class="forbid">
                            <span class="block"></span>
                            <span>不可约</span>
                        </div>
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
                            <span>可约</span>
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
                            <span>可约</span>
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
                            <span>可约</span>
                        </div>  
                        <div class="time-block"></div>
                    </div>
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
                    <span>{{errorText}}</span>
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
        <Dialog :visible="showForbidDialog" @close="closeDialog('ForbidDialog')" class="forbid-dialog">
            <div class="dialog-title">禁用时间块</div>
            <div class="remind-text">确认禁用该时间块？</div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog('ForbidDialog')">取消</div>
                <div class="confirm-btn" @click="forbidTimeBlock">确定</div>
            </div>
        </Dialog>
        <Dialog :visible="showAvailableDialog" @close="closeDialog('AvailableDialog')" class="available-dialog">
            <div class="dialog-title">启用时间块</div>
            <div class="remind-text">确认启用该时间块？</div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog('AvailableDialog')">取消</div>
                <div class="confirm-btn" @click="availableTimeBlock">确定</div>
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
            schedule: [],
            forbid: [],
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
            addType: 'date',
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
            errorText: '该时间块和已有时间块重复，请重新选择',
            showDeleteDialog: false,
            selectedItem: {},
            deleteType: 'date',
            showForbidDialog: false,
            showAvailableDialog: false,
        };
    },
    computed: {
        equipment() {
            return JSON.parse(this.$route.query.data) || {};
        }
    },
    async mounted() {
        await this.$axios.get(getBaseUrl() + '&action=getSchedules&equipmentId=' + this.equipment.equipmentId).then(res => {
            this.schedule = res.data.result.schedule;
            this.forbid = res.data.result.forbid;
        }).catch(err => {
            console.log(err);
        });
        // 设置时间
        this.day= new Date();
        this.weekIndex = this.day.getDay();
        this.monthIndex = this.day.getDate() - 1;
        this.setDayText();
        // schedule排序
        this.schedule.sort((a, b) => {
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
                    for(let j = 0, len2 = this.forbid.length; j < len2; j++) {
                        if(this.schedule[i].scheduleId == this.forbid[j].scheduleId) {
                            if(this.isNameDay(this.day.getTime(), this.forbid[j].date)) {
                                this.schedule[i].forbid = true;
                                this.schedule[i].forbidId = this.forbid[j].forbidId;
                                break;
                            }
                        }
                    }
                    this.dateList.push(this.schedule[i]);
                    this.dayList.push(this.schedule[i]);
                    break;
                case 'week':
                    if(this.day.getDay() == this.schedule[i].week) {
                        for(let j = 0, len2 = this.forbid.length; j < len2; j++) {
                            if(this.schedule[i].scheduleId == this.forbid[j].scheduleId) {
                                if(this.isNameDay(this.day.getTime(), this.forbid[j].date)) {
                                    this.schedule[i].forbid = true;
                                    this.schedule[i].forbidId = this.forbid[j].forbidId;
                                    break;
                                }
                            }
                        }
                        this.dateList.push(this.schedule[i]);
                    }
                    if(this.weekList.length == 0) {
                        this.weekList.push(this.schedule[i]);
                        this.weekIndex = this.schedule[i].week
                    } else if(this.schedule[i].week == this.weekIndex) {
                        this.weekList.push(this.schedule[i]);
                    }
                    break;
                case 'month':
                    if(this.day.getDate() == this.schedule[i].month) {
                        for(let j = 0, len2 = this.forbid.length; j < len2; j++) {
                            if(this.schedule[i].scheduleId == this.forbid[j].scheduleId) {
                                if(this.isNameDay(this.day.getTime(), this.forbid[j].date)) {
                                    this.schedule[i].forbid = true;
                                    this.schedule[i].forbidId = this.forbid[j].forbidId;
                                    break;
                                }
                            }
                        }
                        this.dateList.push(this.schedule[i]);
                    }
                    if(this.monthList.length == 0) {
                        this.monthList.push(this.schedule[i]);
                        this.monthIndex = this.schedule[i].month - 1;
                    } else if(this.schedule[i].month == this.monthIndex) {
                        this.monthList.push(this.schedule[i]);
                    }
                default:
            }
        }
    },
    methods: {
        openDialog(dialogName, type, time) {
            if(dialogName == 'AddDialog') {
                this.addType = type;
                this.showAddDialog = true;
                if(type == 'date') {
                    this.dialogTitle = '添加当日时间块';
                } else if(type == 'day') {
                    this.dialogTitle = '添加每天时间块';
                } else if(type == 'week') {
                    this.dialogTitle = '添加每周时间块';
                } else if(type == 'month') {
                    this.dialogTitle = '添加每月时间块';
                }
            } else if(dialogName == 'DeleteDialog') {
                this.showDeleteDialog = true;
                this.selectedItem = time;
                this.deleteType = type;
            } else if(dialogName == 'ForbidDialog') {
                this.showForbidDialog = true;
                this.selectedItem = time; 
            } else if(dialogName == 'AvailableDialog') {
                this.showAvailableDialog = true;
                this.selectedItem = time; 
            }

        },
        closeDialog(dialogName) {
            if(dialogName == 'AddDialog') {
                this.showAddDialog = false;
            } else if(dialogName == 'DeleteDialog') {
                this.showDeleteDialog = false;
            } else if(dialogName == 'ForbidDialog') {
                this.showForbidDialog = false;
            } else if(dialogName == 'AvailableDialog') {
                this.showAvailableDialog = false;
            }
        }, 
        getDateList() {
            this.dateList = [];
            for(let i = 0, len = this.schedule.length; i < len; i++) {
                if(this.schedule[i].repeat == 'date') {
                    if(this.isNameDay(this.day.getTime(), this.schedule[i].date)) {
                        this.dateList.push(this.schedule[i]);
                    }
                } else if(this.schedule[i].repeat == 'day') {
                    for(let j = 0, len2 = this.forbid.length; j < len2; j++) {
                        if(this.schedule[i].scheduleId == this.forbid[j].scheduleId) {
                            if(this.isNameDay(this.day.getTime(), this.forbid[j].date)) {
                                this.schedule[i].forbid = true;
                                this.schedule[i].forbidId = this.forbid[j].forbidId;
                                break;
                            } else {
                                this.schedule[i].forbid = false;
                                break;
                            }
                        }
                    }
                    this.dateList.push(this.schedule[i]);
                } else if(this.schedule[i].repeat == 'week') {
                    if(this.day.getDay() == this.schedule[i].week) {
                        for(let j = 0, len2 = this.forbid.length; j < len2; j++) {
                            if(this.schedule[i].scheduleId == this.forbid[j].scheduleId) {
                                if(this.isNameDay(this.day.getTime(), this.forbid[j].date)) {
                                    this.schedule[i].forbid = true;
                                    this.schedule[i].forbidId = this.forbid[j].forbidId;
                                    break;
                                } else {
                                    this.schedule[i].forbid = false;
                                    break;
                                }
                            }
                        }
                        this.dateList.push(this.schedule[i]);
                    }
                } else if(this.schedule[i].repeat == 'month') {
                    if(this.day.getDate() == this.schedule[i].month) {
                        for(let j = 0, len2 = this.forbid.length; j < len2; j++) {
                            if(this.schedule[i].scheduleId == this.forbid[j].scheduleId) {
                                if(this.isNameDay(this.day.getTime(), this.forbid[j].date)) {
                                    this.schedule[i].forbid = true;
                                    this.schedule[i].forbidId = this.forbid[j].forbidId;
                                    break;
                                } else {
                                    this.schedule[i].forbid = false;
                                    break;
                                }
                            }
                        }
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
                if(this.schedule[i].repeat == 'day') {
                    this.dayList.push(this.schedule[i]);
                }
            }
        },
        getWeekList() {
            this.weekList = [];
            for(let i = 0, len = this.schedule.length; i < len; i++) {
                if(this.schedule[i].repeat == 'week') {
                    if(this.schedule[i].week == this.weekIndex) {
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
                if(this.schedule[i].repeat == 'month') {
                    if(this.schedule[i].month - 1 == this.monthIndex) {
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
        isNameDay(date1, date2) {
            return (date1 - date2) <  24 * 60 * 60 * 1000 && (date1 - date2) >= 0
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
            let url = getBaseUrl() +  '&action=addSchedule&equipmentId=' + this.equipment.equipmentId + '&startTime=' + this.addForm.startTime + '&endTime=' + this.addForm.endTime + '&repeat=' + this.addType + '&date=' + this.day.getTime() +'&week=' + this.weekIndex +'&month=' + this.monthIndex;
            this.$axios.get(url).then(res => {
                return this.$axios.get(getBaseUrl() + '&action=getSchedules&equipmentId=' + this.equipment.equipmentId);
            }).then(res => {
                this.schedule = res.data.result.schedule;
                // schedule排序
                this.schedule.sort((a, b) => {
                    return this.isLater(b.startTime, a.startTime) ? -1 : 1;
                });
                this.forbid = res.data.result.forbid;
                this.getDateList();
                if(this.addType == 'day') {
                    this.getDayList();
                } else if(this.addType == 'week') {
                    this.getWeekList();
                } else if(this.addType == 'month') {
                    this.getMonthList();
                }
            }).catch(err => {
                console.log(err);
            });
            
        },
        addTimeBlock() {
            let canAdd = false;
            let date = new Date();
            
            if(!this.isLater(this.addForm.endTime, this.addForm.startTime)) {
                this.showErrorText = true;
                this.errorText = "开始时间不能晚于结束时间";
                return;
            }
            let timeList = [...this.dateList];
            if(this.addType == 'day') {
                timeList = [...this.dayList];
            } else if(this.addType == 'week') {
                timeList = [...this.weekList];
            } else if(this.addType == 'month') {
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
            if(timeList.length == 0) {
                this.addSchedule();
                canAdd = true;
            }
            if(!canAdd) {
                this.showErrorText = true;
                this.errorText = "该时间块和已有时间块重复，请重新选择";
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
            let url = getBaseUrl() +  '&action=deleteSchedule&scheduleId=' + this.selectedItem.scheduleId + '&equipmentId=' + this.equipment.equipmentId;
            this.$axios.get(url).then(res => {
                this.showDeleteDialog = false;
                return this.$axios.get(getBaseUrl() + '&action=getSchedules&equipmentId=' + this.equipment.equipmentId);
            }).then(res => {
                this.schedule = res.data.result.schedule;
                // schedule排序
                this.schedule.sort((a, b) => {
                    return this.isLater(b.startTime, a.startTime) ? -1 : 1;
                });
                this.forbid = res.data.result.forbid;
                this.getDateList();
                if(this.addType == 'day') {
                    this.getDayList();
                } else if(this.addType == 'week') {
                    this.getWeekList();
                } else if(this.addType == 'month') {
                    this.getMonthList();
                }
            }).catch(err => {
                console.log(err);
            });
        },
        forbidTimeBlock() {
            let url = getBaseUrl() +  '&action=addForbid&scheduleId=' + this.selectedItem.scheduleId + '&date=' + this.day.getTime() + '&equipmentId=' + this.equipment.equipmentId;
            this.$axios.get(url).then(res => {
                this.showForbidDialog = false;
                return this.$axios.get(getBaseUrl() + '&action=getSchedules&equipmentId=' + this.equipment.equipmentId);
            }).then(res => {
                this.forbid = res.data.result.forbid;
                this.schedule = res.data.result.schedule;
                // schedule排序
                this.schedule.sort((a, b) => {
                    return this.isLater(b.startTime, a.startTime) ? -1 : 1;
                });
                this.getDateList();
            }).catch(err => {
                console.log(err);
            });
        },
        availableTimeBlock() {
            let url = getBaseUrl() +  '&action=deleteForbid&forbidId=' + this.selectedItem.forbidId;
            this.$axios.get(url).then(res => {
                this.showAvailableDialog = false;
                return this.$axios.get(getBaseUrl() + '&action=getSchedules&equipmentId=' + this.equipment.equipmentId);
            }).then(res => {
                this.forbid = res.data.result.forbid;
                this.schedule = res.data.result.schedule;
                // schedule排序
                this.schedule.sort((a, b) => {
                    return this.isLater(b.startTime, a.startTime) ? -1 : 1;
                });
                this.getDateList();
            }).catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style lang="scss">
.arrangement {
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
            line-height: 20px;
        }
        .value {
            color: #303133;
        }
    }
    .block-list{
        box-sizing: border-box;
        padding-bottom: 20px;
        padding-top: 15px;
    }
    .arrangement-block:not(:last-of-type) {
        margin-bottom: 30px;
    }
    .arrangement-block {
        .block-title {
            color: #303133;
            height: 30px;
            font-size: 15px;
            line-height: 30px; 
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
            .delete-icon, .forbid-icon, .available-icon {
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
            .forbid-icon {
                width: 14px;
                height: 14px;
                background-image: url('../images/forbid.png');
            }
            .available-icon {
                background-image: url('../images/available.png');
            }
            .repeat-text {
                position: absolute;
                bottom: 2px;
                right: 2px;;
                font-size: 14px;
                height: 35px;
            }
        }
        .available {
            color: #67C23A;
            background-color: rgba(103, 194, 58, .5);
        }
        .forbid {
            color: #909399;
            background-color: rgba(144, 147, 153, .5);
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
    .description {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 30px;
        margin-top: 10px;
        .available, .forbid {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: #67C23A;
            margin-right: 20px;
            .block {
                width: 17px;
                height: 17px;
                background-color: #67C23A;
                margin-right: 5px
            }
        }
        .forbid {
            color: #909399;
            .block {
                background-color: #909399;
            }
        }
    }
    .add-dialog, .delete-dialog, .forbid-dialog, .available-dialog {
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
            font-size: 14px;
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
