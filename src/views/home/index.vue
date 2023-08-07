<template>
  <div>
    <h1>{{ userStore.username }}</h1>
    <img :src="userStore.avatar" alt="" />
  </div>
</template>

<script setup lang="ts">

import useUserStore from '@/store/modules/user'

let userStore = useUserStore()

</script>

<style scoped></style>
