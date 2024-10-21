<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { dialogState, default as dialog } from "@/core/services/dialog";

</script>

<template>
  <div>
    <Toast />
    <Dialog v-model:visible="dialogState.visible" :header="dialogState.title" modal>
      <p>{{ dialogState.message }}</p>
      <template #footer>
        <Button severity="success" label="OK" @click="dialog.confirm" />
        <Button severity="danger" label="Cancel" @click="dialog.hide" />
      </template>
    </Dialog>
    <DynamicDialog />
    <RouterView />
  </div>

</template>

<style scoped></style>
