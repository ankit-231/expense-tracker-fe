<template>
  <i :class="['fas', iconClass]" :style="{ color: color, fontSize: fontSize }"></i>
</template>
<script setup lang="ts">

const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#007bff'
  },
  fontSize: {
    type: String,
    default: '50px'
  },
  // width: {
  //   type: String,
  //   default: '50px'
  // },
  // height: {
  //   type: String,
  //   default: '50px'
  // }
})


</script>

<style scoped>
.wallet-icon {
  display: flex;
}

.wallet-icon svg {
  height: 100%;
  color: #007bff;
}
</style>