<template>
	<div class="usage">
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
            <div class="reserve-title">设备使用情况：</div>
            <div class="usage-list">
                <div class="usage" v-for="(reserve, index) in reserves" :key="index">
                    <span :class="reserve.perform ? 'perform' : 'question'"></span>
                    <span>用户{{reserve.userName}}在{{periodText(reserve)}}期间，预约使用了该设备。</span>
                    <span class="detail-btn" @click="openDialog('DetailDialog', reserve)">查看详情</span>
                    <span v-if="!reserve.perform" class="perform-btn" @click="perform(reserve.recordId)">确认实施</span>
                </div>
                <div class="perform-all-btn" v-if="showAllBtn" @click="performAll">确认所有实施</div>
            </div>
        </div>

        <Dialog :visible="showDetailDialog" @close="closeDialog('DetailDialog')" class="detail-dialog">
            <div class="dialog-title">预约详情</div>
            <div class="reserve-list">
                <div class="reserve">
                    <div class="reserve-info">
                        <div class="user-name">
                            <span>预约者：</span>
                            <span class="value">{{selectedItem.userName}}</span>
                        </div>
                        <div class="phone">
                            <span>联系电话：</span>
                            <span class="value">{{selectedItem.phone}}</span>
                        </div>
                        <div class="note">
                            <span>更多需求：</span>
                            <span class="value">{{selectedItem.note}}</span>
                        </div>
                        <div class="period">
                            <span>使用时间：</span>
                            <span class="value">{{selectedItem.date + ' ' + selectedItem.startTime + '至' + selectedItem.endTime}}</span>
                        </div>
                        <div class="time">
                            <span>预约时间：</span>
                            <span class="value">{{timeText(selectedItem.reserveTime)}}</span>
                        </div>
                        <div class="perform">
                            <span>实施状态：</span>
                            <span class="value">{{selectedItem.perform ? '已实施' : '未实施'}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="operate-btns">
                <div class="perform-btn" v-if="!selectedItem.perform"  @click="perform(selectedItem.recordId)">确认实施</div>
                <div class="cancel-btn" @click="closeDialog('DetailDialog')">关闭</div>
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
            selectedItem: {},
            showDetailDialog: false,
            reserves: {}
        };
    },
    computed: {
        equipment() {
            return JSON.parse(this.$route.query.equipment) || {}
        },
        showAllBtn() {
            for(let i = 0, len = this.reserves.length; i < len; i++) {
                if(!this.reserves[i].perform) {
                    return true;
                }
            }
            return false;
        }
    },
    mounted() {
        this.reserves = JSON.parse(this.$route.query.reserves);
    },
    methods: {
        periodText(reserve) {
            let date = reserve.date.slice(0, 4) + '年' + reserve.date.slice(5, 7) + '月' + reserve.date.slice(8, 20) + '日';
            return date + reserve.startTime + '至' + reserve.endTime;
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
        openDialog(dialogName, reserve) {
            if(dialogName == 'DetailDialog') {
                this.selectedItem = reserve;
                this.showDetailDialog = true;
            }
        },
        closeDialog(dialogName) {
            if(dialogName == 'DetailDialog') {
                this.showDetailDialog = false;
            }
        },
        perform(recordId) {
            let recordIds = [];
            recordIds.push(recordId);
            recordIds = encodeURI(JSON.stringify(recordIds));
            this.$axios.get(getBaseUrl() + '&action=performReserve&recordIds=' + recordIds).then(res => {
                this.showDetailDialog = false;
                return this.$axios.get(getBaseUrl() + '&action=getEquipmentUsage&equipmentId=' + this.equipment.equipmentId);
            }).then(res => {
                this.reserves = res.data.result;
            }).catch(err => {
                console.log(err);
            });
        },
        performAll() {
            let recordIds = [];
            for(let i = 0 , len = this.reserves.length; i < len; i++) {
                if(!this.reserves[i].perform) {
                    recordIds.push(this.reserves[i].recordId);
                }
            }
            recordIds = encodeURI(JSON.stringify(recordIds));
            this.$axios.get(getBaseUrl() + '&action=performReserve&recordIds=' + recordIds).then(res => {
                this.showDetailDialog = false;
                return this.$axios.get(getBaseUrl() + '&action=getEquipmentUsage&equipmentId=' + this.equipment.equipmentId);
            }).then(res => {
                this.reserves = res.data.result;
            }).catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style lang="scss">
.usage {
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
    .detail-dialog {
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
            padding-bottom: 5px;
            .reserve {
                display: flex;
                align-items: center;
                justify-content: space-between;
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
                    .perform {
                        .value {
                            color: #F56C6C;
                        }
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
            .cancel-btn, .perform-btn {
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
            .perform-btn {
                background-color: #67C23A;
            }
        }
    }
    .usage-list {
        background-color: #FFF;
        padding: 10px;
        min-height: calc(100% - 255px);
        box-sizing: border-box;
        .usage {
            line-height: 18px;
            font-size: 14px;
            margin: 10px;
            .perform, .question {
                display: inline-block;  
                width: 15px;
                height: 15px;
                background-image: url('../images/available.png');
                vertical-align: top;
                margin-top: 1px;
            }
            .question {
                background-image: url('../images/question.png');
            }
            .detail-btn {
                color: #409EFF;
                text-decoration: underline;
                cursor: pointer;
            }
            .perform-btn {
                color: #67C23A;
                text-decoration: underline;
                cursor: pointer;
                margin-left: 5px;
            }
        }
        .perform-all-btn {
            height: 30px;
            padding: 0 5px;
            line-height: 30px;
            width: 100px;
            margin: 0 auto;
            margin-top: 50px;
            border-radius: 3px; 
            background-color: #67C23A;
            font-size: 13px;
            text-align: center;
            color: #FFF;
            cursor: pointer;
        }
    }
}
</style>
