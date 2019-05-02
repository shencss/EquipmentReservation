<template>
	<div class="statistics">
        <div class="case">
            <div class="title">事件统计</div>
            <div class="reserve-count">
                <span>共计发起预约次数</span>
                <span class="value">99</span>
            </div>
            <div class="approve-count">
                <span>共计审批预约次数</span>
                <span class="value">88</span>
            </div>
        </div>
        <div class="case-list">
            <div class="item-wrap" v-for="(item, index) in caseList" :key="index">
                <div class="case-item" v-if="item.type === 'reserve'">
                    <div class="message-icon"></div>
                    <div class="case-info">
                        <span class="user-name">{{item.userName}} </span>
                        <span class="operate">预约设备</span>
                        <span class="equipemnt-name">{{item.equipmentName}}</span>
                        <span class="case-time">{{item.time}}</span>
                    </div>
                </div>
                <div class="case-item" v-else>
                    <div class="message-icon"></div>
                    <div class="case-info">
                        <span class="approver-name">{{item.approverName}} </span>
                        <span :class="item.approve ? 'pass' : 'reject'">{{item.approve ? '批准了' : '拒绝了'}}</span>
                        <span class="user-name">{{item.userName}}的预约</span>
                        <span class="case-time">{{item.time}}</span>
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
            <div class="rank-item" v-for="(item, index) in equipmentRankList" :key="index">
                <div class="num">{{index + 1}}</div>
                <div class="name">{{item.name}}</div>
                <div class="count">{{item.count}}</div>
            </div>
        </div>
        <div class="rank-list" v-else>
            <div class="rank-item" v-for="(item, index) in userRankList" :key="index">
                <div class="num">{{index + 1}}</div>
                <div class="name">{{item.name}}</div>
                <div class="count">{{item.count}}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            rankType: 'equipment',
            caseList: [
                {
                    type: 'reserve',
                    userName: '沈承胜',
                    equipmentName: '联想电脑',
                    time: '2019.4.28 18:00'
                },
                {
                    type: 'reserve',
                    userName: '沈承胜',
                    equipmentName: '戴尔笔记本',
                    time: '2019.4.28 18:00'
                },
                {
                    type: 'approval',
                    approverName: '张三',
                    userName: '沈承胜',
                    time: '2019.4.28 18:00',
                    approve: true
                },
                {
                    type: 'reserve',
                    userName: '沈承胜',
                    equipmentName: 'AOC显示屏',
                    time: '2019.4.28 18:00'
                },
                {
                    type: 'approve',
                    approverName: '李四',
                    userName: '沈承胜',
                    time: '2019.4.28 18:00',
                    approve: false
                },
                {
                    type: 'reserve',
                    userName: '沈承胜',
                    equipmentName: '惠普电脑',
                    time: '2019.4.28 18:00'
                },
            ],
            equipmentRankList: [
                {
                    name: '联想电脑',
                    count: 99
                },
                {
                    name: 'AOC显示屏',
                    count: 88
                },
            ],
            userRankList: [
                {
                    name: '沈承胜',
                    count: 99
                },
                {
                    name: '张三',
                    count: 88
                },
            ]
        }
    },
    methods: {
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
        color: #2196F3;
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
                color: #f83600;
            }
        }
    }
    .case-list {
        background-color: #FFF;
        border-top: 1px solid #EEE;
        max-height: 300px;
        overflow-y: auto;
        .case-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 12px;
            padding: 0 10px;
            height: 30px;
            color: #222;
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
                    color: #2196F3;
                }
                .case-time {
                    float: right;
                }
                .pass {
                    color: #1afa29;
                }
                .reject {
                    color: #f83600;
                }
            }
        }
    }
    .rank {
        position: relative;
        margin-top: 20px;
        background-color: #FFF;
        padding-top: 10px;
        color: #2196F3;
        .title {
            height: 25px;
            margin: 0 20px;
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
            background-color: #2196F3;
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
            color: #222;
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
        color: #BBB;
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
                color: #f83600;
            }
        }
    }
}
</style>
