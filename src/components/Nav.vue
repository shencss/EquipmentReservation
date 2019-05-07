<template>
	<div class="app-nav">
        <div :class="['nav-item', isActive('home') ? 'active-item' : '']" @click="checkNav('home')">
            <span class="nav-icon nav-icon-home"></span>
            <span class="nav-name">主页</span>
        </div>
        <div :class="['nav-item', isActive('reservation') ? 'active-item' : '']" @click="checkNav('reservation')">
            <span class="nav-icon nav-icon-reservation"></span>
            <span class="nav-name">预约</span>
        </div>
        <!-- <div :class="['nav-item', isActive('mine') ? 'active-item' : '']" @click="checkNav('mine')">
            <span class="nav-icon nav-icon-mine"></span>
            <span class="nav-name">我的</span>
        </div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeItem: 'home'
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
        .nav-icon-home {
            background-image: url('../images/home.png');
        }
        .nav-icon-reservation {
            background-image: url('../images/reservation.png');
        }
        .nav-icon-mine {
            background-image: url('../images/mine.png');
        }
    }
    .active-item {
        .nav-name {
            color: #409EFF;
        }
        .nav-icon-home {
            background-image: url('../images/home_active.png');
        }
        .nav-icon-reservation {
            background-image: url('../images/reservation_active.png');
        }
        .nav-icon-mine {
            background-image: url('../images/mine_active.png');
        }
    }
}
</style>
