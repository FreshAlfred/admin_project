<template>
  <div>
    <h1>我自己的data {{ data }}</h1>
    <Father :data="data"></Father>
  </div>
</template>

<script setup lang="ts">
import Father from '@/components/Test/Father.vue'

const data = 'alfred'
</script>

<style scoped></style>
