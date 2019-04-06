<template>
    <transition name="fade-in" mode="out-in">
        <div class="dialog" v-if="visible">
            <div class="dialog-content">
                <slot></slot>
                <div class="close-btn" @click="closeDialog"></div>
            </div>
            
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        visible:  {
            type: Boolean,
            default: false
        },
        close: {
            type: Function,
            default: () => () => {}
        }
    },
    data() {
        return {

        };
    },
    methods: {
        closeDialog() {
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss">
.fade-in-enter-active, .fade-in-leave-active {
	transition: all .5s;
}
.fade-in-enter, .fade-in-leave-to {
	opacity: 0;
}
.dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);
    padding: 20px;
    z-index: 100;
    .dialog-content {
        width: 300px;
        padding: 20px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #FFF;
        border-radius: 10px;
        .close-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 30px;
            height: 30px;
            background-image: url('../images/close.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
    }
    
}
</style>
