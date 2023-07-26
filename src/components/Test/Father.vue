<template>
  <div>
    <h1>i am father</h1>
    <h2>收到的data： {{ data }}</h2>
    <button @click="change">点我</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: String,
})
const change = () => {
  props.data = 'hello'
}
</script>

<style scoped></style>
