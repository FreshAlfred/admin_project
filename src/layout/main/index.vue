<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">

</script>

<script lang="ts">
export default {
  name: 'Main',
}
</script>


<style scoped>
.fade-enter-from {
    opacity: 0;
}
.fade-enter-to {
    opacity: 1;
    display:none
}
.fade-enter-active {
    transition: all 0.3s ease;
}
</style>