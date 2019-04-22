<template>
	<div class="app-nav">
        <div :class="['nav-item', isActive('schedule') ? 'active-item' : '']" @click="checkNav('schedule')">
            <span class="nav-icon nav-icon-schedule"></span>
            <span class="nav-name">排约</span>
        </div>
        <div :class="['nav-item', isActive('approval') ? 'active-item' : '']" @click="checkNav('approval')">
            <span class="nav-icon nav-icon-approval"></span>
            <span class="nav-name">审批</span>
        </div>
        <div :class="['nav-item', isActive('statistics') ? 'active-item' : '']" @click="checkNav('statistics')">
            <span class="nav-icon nav-icon-statistics"></span>
            <span class="nav-name">统计</span>
        </div>
        <div :class="['nav-item', isActive('management') ? 'active-item' : '']" @click="checkNav('management')">
            <span class="nav-icon nav-icon-management"></span>
            <span class="nav-name">管理</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeItem: 'schedule'
        };
    },
    mounted() {
    },
    methods: {
        checkNav(itemName) {
            this.activeItem = itemName;
            this.$router.replace({
                name: itemName
            });
            this.$store.commit('switchNav', itemName);
        }
    },
    computed: {
        isActive() {
            return itemName => {
                if(this.activeItem == itemName) {
                    return true;
                }
            }
        }
    }
}
</script>

<style lang="scss">
.app-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background-color: rgb(250, 250, 250);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .15);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    .nav-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
        .nav-icon {
            width: 20px;
            height: 20px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .nav-name {
            margin-top: 3px;
            font-size: 10px;
            color: #AAA;
        }
        .nav-icon-schedule {
            background-image: url('../images/reservation.png');
        }
        .nav-icon-approval {
            background-image: url('../images/approval.png');
        }
        .nav-icon-statistics {
            background-image: url('../images/statistics.png');
        }
        .nav-icon-management {
            background-image: url('../images/management.png');
        }
    }
    .active-item {
        .nav-name {
            color: #2196F3;
        }
        .nav-icon-schedule {
            background-image: url('../images/reservation_active.png');
        }
        .nav-icon-approval {
            background-image: url('../images/approval_active.png');
        }
        .nav-icon-statistics {
            background-image: url('../images/statistics_active.png');
        }
        .nav-icon-management {
            background-image: url('../images/management_active.png');
        }
    }
}
</style>
