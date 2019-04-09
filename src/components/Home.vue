<template>
	<div class="home">
        <div class="search-box">
            <span class="search-icon"></span>
            <input id="search-input" type="text" placeholder="搜索设备">
        </div>
        <div class="equipment-list">
            <div class="equipment-item">
                <div class="equipment-icon"></div>
                <div class="equipment-info">
                    <div class="equipment-name">联想电脑GT009</div>
                    <div class="count">剩余数量
                        <span>32</span>
                    </div>
                    <div class="available-time">可预约时间
                        <span>2019.04.01 - 2019.06.01</span>
                    </div>
                </div>
                <div class="reservation-btn" @click="goReserve">预约</div>
            </div>
            <div class="equipment-item">
                <div class="equipment-icon"></div>
                <div class="equipment-info">
                    <div class="equipment-name">联想电脑GT009</div>
                    <div class="count">剩余数量
                        <span>32</span>
                    </div>
                    <div class="available-time">可预约时间
                        <span>2019.04.01 - 2019.06.01</span>
                    </div>
                </div>
                <div class="reservation-btn">预约</div>
            </div><div class="equipment-item">
                <div class="equipment-icon"></div>
                <div class="equipment-info">
                    <div class="equipment-name">联想电脑GT009</div>
                    <div class="count">剩余数量
                        <span>32</span>
                    </div>
                    <div class="available-time">可预约时间
                        <span>2019.04.01 - 2019.06.01</span>
                    </div>
                </div>
                <div class="reservation-btn">预约</div>
            </div><div class="equipment-item">
                <div class="equipment-icon"></div>
                <div class="equipment-info">
                    <div class="equipment-name">联想电脑GT009</div>
                    <div class="count">剩余数量
                        <span>32</span>
                    </div>
                    <div class="available-time">可预约时间
                        <span>2019.04.01 - 2019.06.01</span>
                    </div>
                </div>
                <div class="reservation-btn">预约</div>
            </div><div class="equipment-item">
                <div class="equipment-icon"></div>
                <div class="equipment-info">
                    <div class="equipment-name">联想电脑GT009</div>
                    <div class="count">剩余数量
                        <span>32</span>
                    </div>
                    <div class="available-time">可预约时间
                        <span>2019.04.01 - 2019.06.01</span>
                    </div>
                </div>
                <div class="reservation-btn">预约</div>
            </div><div class="equipment-item">
                <div class="equipment-icon"></div>
                <div class="equipment-info">
                    <div class="equipment-name">联想电脑GT009</div>
                    <div class="count">剩余数量
                        <span>32</span>
                    </div>
                    <div class="available-time">可预约时间
                        <span>2019.04.01 - 2019.06.01</span>
                    </div>
                </div>
                <div class="reservation-btn">预约</div>
            </div><div class="equipment-item">
                <div class="equipment-icon"></div>
                <div class="equipment-info">
                    <div class="equipment-name">联想电脑GT009</div>
                    <div class="count">剩余数量
                        <span>32</span>
                    </div>
                    <div class="available-time">可预约时间
                        <span>2019.04.01 - 2019.06.01</span>
                    </div>
                </div>
                <div class="reservation-btn">预约</div>
            </div><div class="equipment-item">
                <div class="equipment-icon"></div>
                <div class="equipment-info">
                    <div class="equipment-name">联想电脑GT009</div>
                    <div class="count">剩余数量
                        <span>32</span>
                    </div>
                    <div class="available-time">可预约时间
                        <span>2019.04.01 - 2019.06.01</span>
                    </div>
                </div>
                <div class="reservation-btn">预约</div>
            </div><div class="equipment-item">
                <div class="equipment-icon"></div>
                <div class="equipment-info">
                    <div class="equipment-name">联想电脑GT009</div>
                    <div class="count">剩余数量
                        <span>32</span>
                    </div>
                    <div class="available-time">可预约时间
                        <span>2019.04.01 - 2019.06.01</span>
                    </div>
                </div>
                <div class="reservation-btn">预约</div>
            </div>
        </div>
        <Dialog :visible="showDialog" @close="closeDialog" class="reservation-dialog">
            <div class="dialog-title">预约该设备</div>
            <div class="equipment-info">
                <div class="equipment-icon"></div>
                <div class="equipment-name">联想电脑GT009</div>
                <div class="line"></div>
                <div class="equipment-type">
                    <span>设备类型</span>
                    <span class="value">电脑</span>
                </div>
                <div class="equipment-address">
                    <span>设备地址</span>
                    <span class="value">华工软件学院学院路B7108室</span>
                </div>
                <div class="available-time">
                    <span>可预约时间</span>
                    <span class="value">2019.04.01 - 2019.06.01</span>
                </div>
                <div class="equipment-note">
                    <span>注意事项</span>
                    <span class="value">该设备属于贵重物品请注意保护，小心使用！</span>
                </div>
                <div class="reservation-note">请选择预约时间：</div>
                <div class="start-date">
                    <label for="start-date">开始时间</label>
                    <input v-model="startDate" type="date" name="start-date">
                </div>
                <div class="end-date">
                    <label for="end-date">开始时间</label>
                    <input v-model="endDate" type="date" name="end-date">
                </div>
            </div>
            <div class="operate-btns">
                <div class="cancel-btn" @click="closeDialog">取消</div>
                <div class="confirm-btn">确定</div>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Dialog from './Dialog'

export default {
    components: {
        Dialog
    },
    data() {
        return {
            showDialog: false,
            startDate: '',
            endDate: ''
        };
    },
    mounted() {

    },
    methods: {
        goReserve() {
            this.showDialog = true;
        },
        closeDialog() {
            this.showDialog = false;
        }
    }
}
</script>

<style lang="scss">
.home {
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
            left: 25px;
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
            padding-left: 34px;
            border-radius: 10px;
        }
    }
    .equipment-list {
        max-height: calc(100vh - 135px);
        padding: 0 10px;
        overflow-y: auto;
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
                .count {
                    font-size: 12px;
                    color: #BBB;
                    margin: 5px 0;
                    span {
                        color: #f83600;
                        margin-left: 10px;
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
            .reservation-btn {
                background-color: #2196F3;
                color: #FFF;
                padding: 5px;
                font-size: 12px;
                border-radius: 3px;
                cursor: pointer;
            }
        }
    }
    .reservation-dialog {
        .dialog-title {
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            text-align: center;
            border-bottom: 1px solid #2196F3;
            background-color: #2196F3;
            color: #FFF;
        }
        .equipment-info {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 0 20px;
            .equipment-icon {
                height: 50px;
                width: 50px;
                background-image: url('../images/computer.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
            .equipment-name {
                font-weight: bold;
                font-size: 15px;
            }
            .line {
                width: 100%;
                height: 2px;
                background-color: #2196F3;
                margin: 10px 0 20px 0;
            }
            .equipment-type, .equipment-address, .available-time, .equipment-note {
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                color: #AAA;
                margin-bottom: 20px;
                span {
                    flex-basis: 90px;
                }
                .value {
                    color: #000;
                    flex-grow: 1;
                }
            }
            .reservation-note {
                width: 100%;
                text-align: left;
                font-size: 11px;
                color: #2196F3;
            }
           .start-date, .end-date {
               display: flex;
               align-items: center;
               width: 100%;
               margin: 10px 0;
               label {
                   font-size: 13px;
                   margin-right: 20px;
               }
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
