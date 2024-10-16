<template>
  <div class="h-screen flex flex-col items-center justify-center ">
    <div class="bg-white p-6 rounded shadow-md w-full lg:w-2/6">
      <h1 class="text-3xl font-semibold mb-6">Login</h1>
      <!-- <Slider v-model="sliderValue" class="w-56" /> -->
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-gray-700">Username</label>
          <input v-model="form.username" type="text"
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required />
        </div>
        <div>
          <label class="block text-gray-700">Password</label>
          <div class="relative">
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'"
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required />
            <span :class="showPassword ? 'hideicon' : 'showicon'"
              class="cursor-pointer text-gray-500 hover:text-gray-700 active:text-gray-900"
              @click="showPassword = !showPassword">
              <i class="pi pi-eye" v-if="!showPassword" />
              <i class="pi pi-eye-slash" v-else />
            </span>
          </div>
        </div>
        <button type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth';
import { ref } from 'vue';
import type { LoginPayload } from '@/core/dtos/general';
import Slider from 'primevue/slider';

const router = useRouter();
const authStore = useAuthStore();
const form = ref<LoginPayload>({
  username: '',
  password: '',
});

const showPassword = ref(false);

const login = async () => {
  let _redirectUrl = router.currentRoute.value.query._redirectUrl;
  if (!_redirectUrl) {
    _redirectUrl = null;
  }
  await authStore.login(form.value, _redirectUrl as string | null);
}

const sliderValue = ref(0);
</script>

<style scoped>
.showicon {
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  /* -mt-2; */
  z-index: 10;
}

.hideicon {
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  z-index: 10;
}
</style>