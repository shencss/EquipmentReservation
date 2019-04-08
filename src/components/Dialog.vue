<template>
    <transition name="fade-in" mode="out-in">
        <div class="dialog" v-if="visible">
            <div class="dialog-content">
                <slot></slot>
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
        width: 75%  ;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #FFF;
        border-radius: 5px;
        overflow: hidden;
    }
    
}
</style>
