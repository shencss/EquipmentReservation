<template>
	<div class="statistics">
        <div class="case">
            <div class="title">事件统计</div>
            <div class="reserve-count">
                <span>共计发起预约次数</span>
                <span class="value">{{eventInfo.reserveCount}}</span>
            </div>
            <div class="approve-count">
                <span>共计审批预约次数</span>
                <span class="value">{{eventInfo.approveCount}}</span>
            </div>
        </div>
        <div class="case-list">
            <div class="item-wrap" v-for="(item, index) in eventList" :key="index">
                <div class="case-item" v-if="item.reserveTime">
                    <div class="message-icon"></div>
                    <div class="case-info">
                        <span class="user-name">{{item.userName}} </span>
                        <span class="operate">预约设备</span>
                        <span class="equipemnt-name">{{item.equipment.equipmentName}}</span>
                        <span class="case-time">{{timeText(item.reserveTime)}}</span>
                    </div>
                </div>
                <div class="case-item" v-else>
                    <div class="message-icon"></div>
                    <div class="case-info">
                        <span class="approver-name">{{item.approverName}} </span>
                        <span :class="item.approve ? 'pass' : 'reject'">{{item.approve ? '批准了' : '拒绝了'}}</span>
                        <span class="user-name">{{item.userName}}的预约</span>
                        <span class="case-time">{{timeText(item.approveTime)}}</span>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="rank">
            <div class="title">排行榜</div>
            <div class="rank-type">
                <div class="equipment-ranke" @click="switchRankType('equipment')">设备预约排行</div>
                <div class="user-ranke" @click="switchRankType('user')">用户预约排行</div>
            </div>
            <div class="type-underline" :class="rankType == 'equipment' ? 'left' : 'right'"></div>
            <div class="rank-header" v-if="rankType == 'equipment'">
                <div class="num">排名</div>
                <div class="name">设备名称</div>
                <div class="count">被预约次数</div>
            </div>
            <div class="rank-header" v-else>
                <div class="num">排名</div>
                <div class="name">用户名称</div>
                <div class="count">预约次数</div>
            </div>
        </div>
        <div class="rank-list" v-if="rankType == 'equipment'">
            <div class="rank-item" v-for="(item, index) in rankInfo.equipments" :key="index">
                <div class="num">{{index + 1}}</div>
                <div class="name">{{item.equipmentName}}</div>
                <div class="count">{{item.count}}</div>
            </div>
        </div>
        <div class="rank-list" v-else>
            <div class="rank-item" v-for="(item, index) in rankInfo.users" :key="index">
                <div class="num">{{index + 1}}</div>
                <div class="name">{{item.userName}}</div>
                <div class="count">{{item.count}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { getBaseUrl } from '../common/env'

export default {
    data() {
        return {
            rankType: 'equipment',
            eventInfo: {},
            rankInfo: {},
            eventList: [],
        }
    },
    mounted() {
        this.$axios.get(getBaseUrl() + '&action=getRank').then(res => {
            this.rankInfo = res.data.result;
        }).catch(err => {
            console.log(err);
        });
        this.$axios.get(getBaseUrl() + '&action=getEvents').then(res => {
            this.eventInfo.approveCount = res.data.result.approveCount;
            this.eventInfo.reserveCount = res.data.result.reserveCount;
            // 排序
            let list = res.data.result.approve.concat(res.data.result.reserve);
            list.sort((b, a) => {
                if(a.reserveTime && b.reserveTime) {
                    return a.reserveTime - b.reserveTime
                } else if(a.approveTime && b.approveTime) {
                    return a.approveTime - b.approveTime
                } else if(a.approveTime && b.reserveTime) {
                    return a.approveTime - b.reserveTime
                } else if(a.reserveTime && b.approveTime) {
                    return a.reserveTime - b.approveTime
                }
            });
            this.eventList = list;
        }).catch(err => {
            console.log(err);
        });
    },
    methods: {
        timeText(millisecond) {
            let date = new Date(millisecond);
            let year = date.getFullYear();
            let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
            let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
            let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
            let min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
            return year + '-' + month + '-' + day + '  ' + hour + ':' + min;
        },
        switchRankType(name) {
            this.rankType = name;
        }
    }
}
</script>

<style lang="scss">
.statistics {
    .case {
        background-color: #FFF;
        color: #409EFF;
        padding: 10px 20px;
        .title {
            height: 25px;
        }
        .reserve-count, .approve-count {
            span {
                color: #BBB;
                font-size: 12px;
            }
            .value {
                margin-left: 15px;
                color: #F56C6C;
            }
        }
    }
    .case-list {
        background-color: #FFF;
        border-top: 1px solid #EEE;
        height: 180px;
        overflow-y: auto;
        .case-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 12px;
            padding: 0 10px;
            height: 30px;
            color: #303133;
            border-bottom: 1px solid #EEE;
            box-sizing: border-box;
            .message-icon {
                height: 20px;
                width: 20px;
                background-image: url('../images/message.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
            .case-info {
                flex-grow: 1;
                margin: 0 10px;
                .operate {
                    color: #409EFF;
                }
                .case-time {
                    float: right;
                }
                .pass {
                    color: #67C23A;
                }
                .reject {
                    color: #F56C6C;
                }
            }
        }
    }
    .rank {
        position: relative;
        margin-top: 20px;
        background-color: #FFF;
        padding-top: 10px;
        color: #409EFF;
        width: 100%;
        overflow-x: hidden;
        .title {
            height: 25px;
            padding-left: 20px;
        }
        .rank-type {
            display: flex;
            align-items: center;
            font-size: 12px;
            height: 20px;
            text-align: center;
            div {
                flex: 1;
            }
        }
        .type-underline {
            height: 2px;
            width: 50px;
            background-color: #409EFF;
            position: absolute;
            top: 56px;
            left: 25%;
            transform: translateX(-50%);
            transition: all .5s linear;
        }
        .left {
            left: 25%;
        }
        .right {
            left: 75%;
        }
        .rank-header {
            margin-top: 10px;
            display: flex;
            height: 30px;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: #909399;
            text-align: center;
            .num {
                flex: 1;
                
            }
            .name {
                flex: 4;
            }
            .count {
                flex: 2;
            }
        }
    }
    .rank-list {
        background-color: #FFF;
        font-size: 12px;
        color: #303133;
        max-height: calc(100vh - 457px);
        overflow-y: auto;
        .rank-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            text-align: center;
            border-top: 1px solid #EEE;
            .num {
                flex: 1;
            }
            .name {
                flex: 4;
            }
            .count {
                flex: 2;
                color: #F56C6C;
            }
        }
    }
}
</style>
