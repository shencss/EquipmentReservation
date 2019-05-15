<template>
	<div class="test">
        <div class="equipment-name">联想笔记本电脑</div>
        <div class="date">
            <div class="pre-day-btn"></div>
            <div class="today">2019-05-15（星期三）</div>
            <div class="next-day-btn"></div>
        </div>
        <div class="time-list">
            <div :class="['time-block', time.status]" v-for="(time, index) in timeList" :key="index">{{timeText(time.block)}}</div>
            <div class="time-block operator">
                <span class="add-icon"></span>
                <span>添加时间</span>
            </div>
        </div>
        <div class="description">
            <div class="reserved">
                <span class="block"></span>
                <span>已约</span>
            </div>
            <div class="idle">
                <span class="block"></span>
                <span>待约</span>
            </div>
            <div class="todo">
                <span class="block"></span>
                <span>待批</span>
            </div>
        </div>
        <div class="repeat">
            <div>将该时间安排同步至：</div>
            <div class="repeat-list">
                <div class="repeat-choice">
                    <label>仅当天</label>
                    <input type="radio" v-model="repeat" name="repeat" value="once" />
                </div>
                <div class="repeat-choice">
                    <label>每天</label>
                    <input type="radio" v-model="repeat" name="repeat" value="day" />
                </div>
                <div class="repeat-choice">
                    <label>每周一</label>
                    <input type="radio" v-model="repeat" name="repeat" value="week" />
                </div>
                <div class="repeat-choice">
                    <label>每月15号</label>
                    <input type="radio" v-model="repeat" name="repeat" value="month" />
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
           repeat: 'once',
           time: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
           timeList: [
               {
                   block: '8',
                   status: 'reserved'
               },
               {
                   block: '9',
                   status: 'idle'
               },
               {
                   block: '10',
                   status: 'idle'
               },
               {
                   block: '11',
                   status: 'idle'
               },
               {
                   block: '12',
                   status: 'idle'
               },
               {
                   block: '13',
                   status: 'reserved'
               },
               {
                   block: '14',
                   status: 'todo'
               },
               {
                   block: '15',
                   status: 'reserved'
               },
               {
                   block: '16',
                   status: 'idle'
               },
               {
                   block: '17',
                   status: 'todo'
               },
               {
                   block: '18',
                   status: 'reserved'
               },
               {
                   block: '19',
                   status: 'todo'
               },
               {
                   block: '20',
                   status: 'idle'
               },
               {
                   block: '21',
                   status: 'idle'
               }
           ]
        };
    },
    computed: {
        timeText() {
            return block => {
                switch(block) {
                    case '0':
                        return '00:00 - 01:00'
                        break;
                    case '1':
                        return '01:00 - 02:00'
                        break;
                    case '2':
                        return '02:00 - 03:00'
                        break;
                    case '3':
                        return '03:00 - 04:00'
                        break;
                    case '4':
                        return '04:00 - 05:00'
                        break;
                    case '5':
                        return '05:00 - 06:00'
                        break;
                    case '6':
                        return '06:00 - 07:00'
                        break;
                    case '7':
                        return '07:00 - 08:00'
                        break;
                    case '8':
                        return '08:00 - 09:00'
                        break;
                    case '9':
                        return '09:00 - 10:00'
                        break;
                    case '10':
                        return '10:00 - 11:00'
                        break;
                    case '11':
                        return '11:00 - 12:00'
                        break;
                    case '12':
                        return '12:00 - 13:00'
                        break;
                    case '13':
                        return '13:00 - 14:00'
                        break;
                    case '14':
                        return '14:00 - 15:00'
                        break;
                    case '15':
                        return '15:00 - 16:00'
                        break;
                    case '16':
                        return '16:00 - 17:00'
                        break;
                    case '17':
                        return '17:00 - 18:00'
                        break;
                    case '18':
                        return '18:00 - 19:00'
                        break;
                    case '19':
                        return '19:00 - 20:00'
                        break;
                    case '20':
                        return '20:00 - 21:00'
                        break;
                    case '21':
                        return '21:00 - 22:00'
                        break;
                    case '22':
                        return '22:00 - 23:00'
                        break;
                    case '23':
                        return '23:00 - 24:00'
                        break;
                    default:
                        return '00:00 - 01:00'
                    
                }
            }
        }
    },
    mounted() {
        
    },
    methods: {
        
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
        .idle {
            color: #67C23A;
            background-color: rgba(103, 194, 58, .5);
        }
        .todo {
            color: #E6A23C;
            background-color: rgba(230, 162, 60, .5);
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
        .reserved, .idle, .todo {
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
        .idle {
            color: #67C23A;
            .block {
                background-color: #67C23A;
            }
        }
        .todo {
            color: #E6A23C;
            .block {
                background-color: #E6A23C;
            }
        }
    }
    .repeat {
        margin-top: 20px;
        padding-left: 20px;
        color: #409EFF;
        .repeat-list {
            display: flex;
            align-items: center;
            margin-top: 5px;
            .repeat-choice {
                font-size: 13px;
                margin-right: 20px;
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>
