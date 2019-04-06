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
        <Dialog :visible="showDialog" @close="closeDialog">
            <div class="equipment-name">联想电脑GT009</div>
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
            showDialog: false
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
                        color: #209cff;
                        margin-left: 10px;
                    }
                }
            }
            .reservation-btn {
                background-color: #A1C4FD;
                color: #FFF;
                padding: 5px;
                font-size: 12px;
                border-radius: 3px;
                cursor: pointer;
            }
        }
    }
    

}
</style>
