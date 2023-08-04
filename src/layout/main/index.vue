<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component v-if="flag" :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import { ref, watch, nextTick } from 'vue'
const layOutSettingStore = useLayoutSettingStore()
let flag = ref(true)
watch(
  () => layOutSettingStore.refresh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
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
  display: none;
}
.fade-enter-active {
  transition: all 0.3s ease;
}
</style>
