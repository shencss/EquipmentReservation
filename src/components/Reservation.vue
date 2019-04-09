<template>
	<div class="reservation">
        <div class="type-header">
            <div :class="typeClass1" >所有预约</div>
            <div :class="typeClass2">预约中</div>
            <div :class="typeClass3">已预约</div>
        </div>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            type: 'all',
            typeClass1:'active',
            typeClass2: '',
            typeClass3:''
        };
    },
    computed:{
    },
    methods: {
        checkType(type) {
            if(type == 'all') {
                this.type = 'all';
                this.typeClass1 = 'active';
                this.typeClass2 = '';
                this.typeClass3 = '';
            } else if(type == 'doing') {
                this.type = 'doing';
                this.typeClass1 = '';
                this.typeClass2 = 'active';
                this.typeClass3 = '';
            } else {
                this.type = 'done';
                this.typeClass1 = '';
                this.typeClass2 = '';
                this.typeClass3 = 'active';
            }
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

}
</style>
