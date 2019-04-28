<template>
	<div class="approval">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            approvePeriods: []
        };
    },
}
</script>

<style lang="scss">
.approval {
    width: 100%;
    background-color: rgb(245, 245, 245);
}
</style>
