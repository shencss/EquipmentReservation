<template>
	<div class="reservation">
        <div class="type-header">
            <div @click="checkType('all')">所有预约</div>
            <div @click="checkType('doing')">预约中</div>
            <div @click="checkType('done')">已预约</div>
        </div>
        <div class="type-underline" :class="underlineClass"></div>
        <div class="equipment-list">
            <div class="equipment-item">
                <div class="equipment-icon"></div>
                <div class="equipment-info">
                    <div class="equipment-name">联想电脑GT009</div>
                    <div class="status await">当前状态
                        <span>等待批准中</span>
                    </div>
                    <div class="available-time">预约时间
                        <span>2019.04.01 - 2019.06.01</span>
                    </div>
                </div>
                <div class="cancel-btn" @click="goReserve">取消预约</div>
            </div>
            <div class="equipment-item">
                <div class="equipment-icon"></div>
                <div class="equipment-info">
                    <div class="equipment-name">联想电脑GT009</div>
                    <div class="status">当前状态
                        <span>未批准</span>
                    </div>
                    <div class="available-time">预约时间
                        <span>2019.04.01 - 2019.06.01</span>
                    </div>
                </div>
            </div>
            <div class="equipment-item">
                <div class="equipment-icon"></div>
                <div class="equipment-info">
                    <div class="equipment-name">联想电脑GT009</div>
                    <div class="status passed">当前状态
                        <span>已通过</span>
                    </div>
                    <div class="available-time">预约时间
                        <span>2019.04.01 - 2019.06.01</span>
                    </div>
                </div>
            </div>
        </div>
        <Dialog :visible="showDialog" @close="closeDialog" class="cancel-dialog">
            <div class="dialog-title">取消预约该设备</div>
            <div class="remind-text">
                确定取消预约该设备吗？
            </div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog">取消</div>
                <div class="confirm-btn">确定</div>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Dialog from './Dialog.vue';

export default {
    data() {
        return {
            type: 'all',
            showDialog: true,
            underlineClass: 'left'
        };
    },
    components: {
        Dialog
    },
    methods: {
        checkType(e, type) {
            if(type == 'all') {
                this.type = 'all';
               this.underlineClass = 'left';
               console.log(this.underlineClass)
               
            } else if(type == 'doing') {
                this.type = 'doing';
                this.underlineClass = 'center';
              
            } else {
                this.type = 'done';
                this.underlineClass = 'right';
            }
        },
        closeDialog() {
            this.showDialog = false;
        },
        goReserve() {

        }
    }
}
</script>

<style lang="scss">
.reservation {
    position: relative;
    .type-header {
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FFF;
        color: #2196F3;
        font-size: 12px;
        div {
            position: relative;
            flex: 1;
            text-align: center;
            height: 35px;
            line-height: 35px;
        }
        .active::after {
            content: '';
            display: inline-block;
            width: 30px;
            height: 2px;
            background-color: #2196F3;
            position: absolute;
            bottom: 6px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .type-underline {
        height: 2px;
        width: 30px;
        background-color: #2196F3;
        position: absolute;
        top: 30px;
        left: 16.66%;
        transform: translateX(-50%);
        transition: all .5s linear;
    }
    .center {
        left: 50%;
    }
    .right {
        left: 83.33%;
    }
    .equipment-list {
        .equipment-item {
            height: 80px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 1px solid #EEE;
            box-sizing: border-box;
            padding: 10px;
            .equipment-icon {
                height: 50px;
                width: 50px;
                background-image: url('../images/computer.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
            .equipment-info {
                flex-grow: 1;
                padding: 0 10px;
                .equipment-name {
                    font-size: 14px;
                    font-weight: bold;
                }
                .status {
                    font-size: 12px;
                    color: #BBB;
                    margin: 5px 0;
                    span {
                        color: #f83600;
                        margin-left: 10px;
                        font-weight: bold;
                    }
                }
                .await {
                    span {
                        color: #f9d423;
                    }
                }
                .passed {
                    span {
                        color: #2af598;
                    }
                }
                .available-time {
                    font-size: 12px;
                    color: #BBB; 
                    span {
                        color: #2196F3;
                        margin-left: 10px;
                    }
                }
            }
            .cancel-btn {
                background-color: #f83600;
                color: #FFF;
                padding: 5px;
                font-size: 12px;
                border-radius: 3px;
                cursor: pointer;
            }
        }
    }
    .cancel-dialog {
        .dialog-title {
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            text-align: center;
            border-bottom: 1px solid #2196F3;
            background-color: #2196F3;
            color: #FFF;
        }
        .remind-text {
            text-align: center;
            color: #2196F3;
            font-weight: 15px;
            font-weight: bold;
            margin-top: 50px;
            margin-bottom: 30px;
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
                background-color: #2196F3;
                color: #FFF;
                border-radius: 3px;
                margin: 20px 10px;
            }
        }
    }

}
</style>
