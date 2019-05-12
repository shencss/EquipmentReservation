<template>
	<div class="management">
        <div class="search-box">
            <input id="search-input" type="text" placeholder="搜索设备">
            <span class="search-icon"></span>
        </div>
        <div class="equipment-list">
            <div class="item-warp" v-for="(item, index) in equipmentList" :key=index>
                <div class="equipment-item">
                    <div :class="['equipment-icon', icon(item)]"></div>
                    <div class="equipment-info">
                        <div class="equipment-name">{{item.equipmentName}}</div>
                        <div class="count">当前状态
                            <span :style="statusStyle(item)">{{status(item)}}</span>
                        </div>
                        <div class="operate-btns">
                            <div class="check-btn" @click="openDialog('DetailDialog')">使用情况</div>
                            <div class="modify-btn" @click="openDialog('ModifyDialog', item)">修改信息</div>
                            <div class="delete-btn" @click="openDialog('DeleteDialog')">删除设备</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Dialog :visible="showDeleteDialog" @close="closeDialog('DeleteDialog')" class="delete-dialog">
            <div class="dialog-title">删除设备</div>
            <div class="remind-text">确认删除该设备？</div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog('DeleteDialog')">取消</div>
                <div class="confirm-btn" @click="closeDialog('DeleteDialog')">确定</div>
            </div>
        </Dialog>

        <Dialog :visible="showAddDialog" @close="closeDialog('AddDialog')" class="add-dialog">
            <div class="dialog-title">添加设备</div>
            <div class="add-form">
                <label>设备名称：</label>
                <input type="text" v-model="addForm.equipmentName" placeholder="请输入设备名称"><br>
                <label>设备类型：</label>
                <select name="equipmentType" v-model="addForm.equipmentType">
                    <option value="1">电脑</option>
                    <option value="2">笔记本</option>
                    <option value="3">键盘</option>
                    <option value="4">鼠标</option>
                </select><br>
                <label>设备型号：</label>
                <input type="text" placeholder="请输入设备型号" v-model="addForm.equipmentModel"><br>
                <label>注意事项：</label>
                <textarea cols="25" rows="5" maxlength="100" placeholder="请输入设备的使用注意事项" v-model="addForm.note"></textarea>
            </div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog('AddDialog')">取消</div>
                <div class="confirm-btn" @click="addEquipment">确定</div>
            </div>
        </Dialog>

        <Dialog :visible="showModifyDialog" @close="closeDialog('ModifyDialog')" class="modify-dialog">
            <div class="dialog-title">修改设备</div>
            <div class="add-form">
                <label>设备名称：</label>
                <input type="text" v-model="modifyForm.equipmentName" placeholder="请输入设备名称"><br>
                <label>设备类型：</label>
                <select name="equipmentType" v-model="modifyForm.equipmentType">
                    <option value="1">电脑</option>
                    <option value="2">显示屏</option>
                    <option value="3">键盘</option>
                    <option value="4">鼠标</option>
                </select><br>
                <label>设备型号：</label>
                <input type="text" v-model="modifyForm.equipmentModel" placeholder="请输入设备型号"><br>
                <label>注意事项：</label>
                <textarea cols="25" rows="5" maxlength="100" v-model="modifyForm.note" placeholder="请输入设备的使用注意事项"></textarea>
            </div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog('ModifyDialog')">取消</div>
                <div class="confirm-btn" @click="closeDialog('ModifyDialog')">确定</div>
            </div>
        </Dialog>

        <Dialog :visible="showDetailDialog" @close="closeDialog('DetailDialog')" class="detail-dialog">
            <div class="dialog-title">使用情况</div>
            <div class="detail-info">
                <div class="equipment-name">
                    <span>设备名称:</span>
                    <span class="vaule">联想电脑</span>
                </div>
                <div class="use-count">
                    <span>被使用次数:</span>
                    <span class="vaule">99</span>
                </div>
                <div>使用记录：</div>
                <div class="record-list">
                    <div class="record-item" v-for="(item, index) in recordList" :key="index">
                        <span class="record-icon"></span>
                        <div class="record-text">
                            <span>用户</span>
                            <span class="user-text">{{item.userName}}</span>
                            <span>在</span>
                            <span v-for="(period, pIndex) in item.periods" :key="pIndex">
                                <span class="period-text">{{period.startTime}}</span>
                                <span>至</span>
                                <span class="period-text">{{period.endTime}}</span>    
                                <span v-if="pIndex != (item.periods.length - 1)">、</span>
                            </span>
                            <span>期间预约使用了该设备</span>
                            <span>{{'(' + item.time + ')'}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog('DetailDialog')">关闭</div>
            </div>
        </Dialog>

        <div class="add-btn" @click="openDialog('AddDialog')"></div>
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
            equipmentType: 'all',
            showDeleteDialog: false,
            showAddDialog: false,
            showModifyDialog: false,
            showDetailDialog: false,
            equipmentList: [],
            addForm: {
                equipmentName: '',
                equipmentType: '',
                equipmentModel: '',
                note: ''
            },
            modifyForm: {
                equipmentName: '',
                equipmentType: '',
                equipmentModel: '',
                note: ''
            },
            recordList: [
                {
                    userName: '沈承胜',
                    periods: [
                        {
                            startTime: '2019.5.2 18:00',
                            endTime: '2019.5.3 18:00'
                        },
                        {
                            startTime: '2019.5.2 18:00',
                            endTime: '2019.5.3 18:00'
                        },
                        {
                            startTime: '2019.5.2 18:00',
                            endTime: '2019.5.3 18:00'
                        }
                    ],
                    time: '2019.5.2 13:00'
                },
                {
                    userName: '沈承胜',
                    periods: [
                        {
                            startTime: '2019.5.2 18:00',
                            endTime: '2019.5.3 18:00'
                        },
                        {
                            startTime: '2019.5.2 18:00',
                            endTime: '2019.5.3 18:00'
                        },
                        {
                            startTime: '2019.5.2 18:00',
                            endTime: '2019.5.3 18:00'
                        }
                    ],
                    time: '2019.5.2 13:00'
                },
                {
                    userName: '沈承胜',
                    periods: [
                        {
                            startTime: '2019.5.2 18:00',
                            endTime: '2019.5.3 18:00'
                        },
                        {
                            startTime: '2019.5.2 18:00',
                            endTime: '2019.5.3 18:00'
                        },
                        {
                            startTime: '2019.5.2 18:00',
                            endTime: '2019.5.3 18:00'
                        }
                    ],
                    time: '2019.5.2 13:00'
                }
            ]
        };
    },
    computed: {
        icon() {
            return item => {
                switch(item.equipmentType) {
                    case '1':
                        return 'computer';
                        break;
                    case '2':
                        return 'display';
                        break;
                    case '3':
                        return 'keyboard';
                        break;
                    case '4':
                        return 'mouse';
                        break;
                    default:
                        return 'computer'
                }
            }
        },
        type() {
            return item => {
                switch(item.equipmentType) {
                    case '1':
                        return '电脑';
                        break;
                    case '2':
                        return '显示屏';
                        break;
                    case '3':
                        return '键盘';
                        break;
                    case '4':
                        return '鼠标';
                        break;
                    default:
                        return '电脑'
                }
            }
        },
        status() {
            return item => {
                switch(item.status) {
                    case '1':
                        return '等待预约';
                        break;
                    case '2':
                        return '被使用中';
                        break;
                    case '3':
                        return '未安排时间';
                        break;
                    default:
                        return '等待预约'
                }
            }
        },
        statusStyle() {
            return item => {
                switch(item.status) {
                    case '1':
                        return {color: '#67C23A'};
                        break;
                    case '2':
                        return {color: '#409EFF'};
                        break;
                    case '3':
                        return {color: '#F56C6C'};
                        break;
                    default:
                        return {color: '#67C23A'}
                }
            }
        }
    },
    mounted() {
        this.$axios.get(getBaseUrl() + '&action=getAllEquipments').then(res => {
            this.equipmentList = res.data.result;
        }).catch(err => {
            console.log(err);
        });
    },
    methods: {
        closeDialog(dialogName) {
            if (dialogName == 'DeleteDialog') {
                this.showDeleteDialog = false;
            } else if (dialogName == 'AddDialog') {
                this.showAddDialog = false;
            } else if (dialogName == 'ModifyDialog') {
                this.showModifyDialog = false;
            } else if (dialogName == 'DetailDialog') {
                this.showDetailDialog = false;
            }
        },
        openDialog(dialogName, model = {}) {
            if (dialogName == 'DeleteDialog') {
                this.showDeleteDialog = true;
            } else if (dialogName == 'AddDialog') {
                this.showAddDialog = true;
            } else if (dialogName == 'ModifyDialog') {
                this.showModifyDialog = true;
                this.modifyForm = model;
            } else if (dialogName == 'DetailDialog') {
                this.showDetailDialog = true;
            }
        },
        modifyEquipment(item) {
            
        },
        deleteEquipment(item) {

        },
        addEquipment() {
            
        }
    }
}
</script>

<style lang="scss">
.management {
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
            .equipment-info {
                flex-grow: 1;
                padding: 0 10px;
                .equipment-name {
                    font-size: 14px;
                    font-weight: bold;
                }
                .count {
                    font-size: 12px;
                    color: #BBB;
                    margin: 5px 0;
                    span {
                        color: #F56C6C;
                        margin-left: 10px;
                    }
                }
                .operate-btns {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-left: 50px;
                    margin-top: 10px;
                    .check-btn, .modify-btn, .delete-btn {
                        background-color: #409EFF;
                        color: #FFF;
                        padding: 5px;
                        font-size: 12px;
                        border-radius: 3px;
                        cursor: pointer;
                    }
                    .delete-btn {
                        background-color: #F56C6C;
                       
                    }
                }
            }
        }
    }
    .delete-dialog, .add-dialog, .modify-dialog, .detail-dialog {
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
            font-size: 12px;
            height: 70px;
            line-height: 70px;
            padding-left: 30px;
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
                font-size: 12px;
                background-color: #409EFF;
                color: #FFF;
                border-radius: 3px;
                margin: 0 10px 20px 10px;
            }
        }
        .add-form {
            font-size: 12px;
            padding: 20px;
            label {
                vertical-align: top;
            }
            input, select {
                margin-bottom: 10px;
            }
            textarea {
                vertical-align: middle;
            }
        }
        .detail-info {
            padding: 15px;
            font-size: 12px;
            color: #909399;
            .equipment-name {
                .vaule {
                    color: #222;
                    margin-left: 10px;
                    font-weight: bold;
                }
            }
            .use-count {
                margin: 15px 0;
                .vaule {
                    color: #F56C6C;
                    margin-left: 10px;
                }
            }
            .record-list {
                margin-top: 10px;
                max-height: 220px;
                overflow-y: auto;
                .record-item {
                    margin-bottom: 10px;
                    display: flex;
                    align-items: flex-start;
                    .record-icon {
                        display: inline-block;
                        flex-basis: 15px;
                        flex-shrink: 0;
                        height: 15px;
                        background-image: url('../images/record.png');
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                    .record-text {
                        line-height: 15px;
                        color: #222;
                        .period-text, .user-text {
                            color: #409EFF;
                        }
                    }
                }
            }
        }
    }
    .add-btn {
        position: fixed;
        top: 7.5px;
        right: 20px;
        width: 25px;
        height: 25px;
        background-image: url('../images/add.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        z-index: 10;
    }
}
</style>
