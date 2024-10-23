<template>
  <div>
    <h1 class=" text-3xl font-bold">Hi {{ getUserMe.username }}</h1>
    <div class=" p-2 rounded-md">
      <div @click="logout"
        class="border-2 border-dashed border-surface shadow-sm hover:shadow-lg hover:cursor-pointer p-2 rounded-md font-bold">
        Log Out</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth/auth';
import { storeToRefs } from 'pinia';
import customDialog from '@/core/services/dialog';

const authStore = useAuthStore();

const { getUserMe } = storeToRefs(authStore)

const logout = async () => {
  customDialog.show({
    title: "Confirmation",
    message: "Are you sure you want to proceed?",
    onConfirm: async () => {
      await authStore.logout();
    },
  });
}

</script>

<style></style>
