<template>
	<div class="test">
        <div class="equipment-name">联想笔记本电脑</div>
        <div class="date">
            <div class="pre-day-btn"></div>
            <div class="today">2019-05-15（星期三）</div>
            <div class="next-day-btn"></div>
        </div>
        <div class="time-list">
            <div :class="['time-block', time.status]" v-for="(time, index) in timeList" :key="index">{{time.startTime}} - {{time.endTime}}</div>
            <div class="time-block operator" @click="openDialog('addDialog')">
                <span class="add-icon"></span>
                <span>待约</span>
            </div>
        </div>
        <div class="description">
            <div class="reserved">
                <span class="block"></span>
                <span>已约</span>
            </div>
            <div class="available">
                <span class="block"></span>
                <span>待约</span>
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
        <Dialog :visible="showAddDialog" @close="closeDialog('AddDialog')" class="add-dialog">
            <div class="dialog-title">添加待约时间</div>
            <div class="add-form">
                <div class="form-item">
                    <label>开始时间：</label>
                    <input type="time" placeholder="请输入起始时间" style="width: 100px" v-model="addForm.startTime"><br>
                </div>
                <div class="form-item">
                    <label>结束时间：</label>
                    <input type="time" placeholder="请输入结束时间" style="width: 100px"  v-model="addForm.endTime"><br>
                </div>
                <div>将该时间安排同步至：</div>
                <div class="repeat-list">
                    <div class="repeat-choice">
                        <label>仅当天</label>
                        <input type="radio" v-model="addForm.repeat" name="repeat" value="once" />
                    </div>
                    <div class="repeat-choice">
                        <label>每天</label>
                        <input type="radio" v-model="addForm.repeat" name="repeat" value="day" />
                    </div>
                    <div class="repeat-choice">
                        <label>每周一</label>
                        <input type="radio" v-model="addForm.repeat" name="repeat" value="week" />
                    </div>
                    <div class="repeat-choice">
                        <label>每月15号</label>
                        <input type="radio" v-model="addForm.repeat" name="repeat" value="month" />
                    </div>
                </div>
                <div class="error-text" v-if="showErrorText">
                    <span class="error-icon"></span>
                    <span>该时间段和已有时间段重复，请重新选择</span>
                </div>
            </div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog('AddDialog')">取消</div>
                <div class="confirm-btn" @click="addTimeBlock">确定</div>
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
            timeList: [
                {
                    startTime: '08:00',
                    endTime: '09:00',
                    repeat: 'once',
                    status: 'passed'
                },
                {
                    startTime: '09:00',
                    endTime: '10:00',
                    repeat: 'once',
                    status: 'available'
                },
                {
                    startTime: '10:00',
                    endTime: '11:00',
                    repeat: 'once',
                    status: 'reserved'
                },
                {
                    startTime: '11:00',
                    endTime: '12:00',
                    repeat: 'once',
                    status: 'available'
                },
                {
                    startTime: '12:00',
                    endTime: '13:00',
                    repeat: 'once',
                    status: 'available'
                },
                {
                    startTime: '13:00',
                    endTime: '14:00',
                    repeat: 'once',
                    status: 'approve'
                },
                {
                    startTime: '15:00',
                    endTime: '16:00',
                    repeat: 'once',
                    status: 'available'
                },
                {
                    startTime: '16:00',
                    endTime: '17:00',
                    repeat: 'once',
                    status: 'available'
                }
            ],
            showAddDialog: false,
            addForm: {
                startTime: '',
                endTime: '',
                repeat: 'once'
            },
            showErrorText: false
        };
    },
    computed: {
    },
    mounted() {
        
    },
    methods: {
        openDialog(dialogName) {
            this.showAddDialog = true;
        },
        closeDialog(dialogName) {
            if(dialogName === 'AddDialog') {
                this.showAddDialog = false;
            }
        },
        addTimeBlock() {
            let canAdd = true;
            let date= new Date();
            for(let i = 0, len = this.timeList.length; i < len; i++) {
                let startTime1 = date.setHours(this.addForm.startTime.split(':')[0], this.addForm.startTime.split(':')[1]);
                let endTime1 = date.setHours(this.addForm.endTime.split(':')[0], this.addForm.endTime.split(':')[1]);
                let startTime2 = date.setHours(this.timeList[i].startTime.split(':')[0], this.timeList[i].startTime.split(':')[1]);
                let endTime2 = date.setHours(this.timeList[i].endTime.split(':')[0], this.timeList[i].endTime.split(':')[1]);
                console.log(startTime1 , endTime1)
                console.log( startTime2, endTime2)
                 if(!(startTime1 >= endTime2 || endTime1 <= startTime2)) {
                    canAdd = false;
                    break;
                 }
            }
            if(canAdd) {
                this.timeList.push({
                    startTime: this.addForm.startTime,
                    endTime: this.addForm.endTime,
                    repeat: this.addForm.repeat,
                    status: 'available'
                });
                this.showAddDialog = false;
            } else {
                this.showErrorText = true;
            }
            
        }
    }
}
</script>

<style lang="scss">
.test {
    .equipment-name {
        background-color: #FFF;
        text-align: center;
        color: #409EFF;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
          font-weight: bold;
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
    .add-dialog, {
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
            }
            .repeat-list {
                color: #409EFF;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                margin-top: 5px;
                .repeat-choice {
                    font-size: 15px;
                    margin-right: 20px;
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
}
</style>
