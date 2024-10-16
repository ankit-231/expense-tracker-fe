<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import router from '@/router';



const isClicked = ref(true)

const handleClick = function () {
  isClicked.value = !isClicked.value
}


const logout = async () => {
}

</script>

<template>
  <header class="shadow-lg fixed top-0 w-full aspect-[15/1] z-50 min-h-[6rem] header-background flex items-center  ">
    <nav class="container mx-auto p-4 flex flex-wrap justify-between">
      <RouterLink to="/" class="font-bold text-blue-600">Mavorion
      </RouterLink>

      <button class="block sm:hidden" @click="handleClick">Show Menu</button>

      <div class="w-full mt-10 sm:w-auto sm:block sm:mt-auto" :class="{ 'hidden': isClicked }">
        <ul class="sm:flex sm:items-center sm:gap-4">
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="#" class="btn">Contact Us</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'login' }" class="btn">Login</RouterLink>
          </li>

        </ul>
      </div>

    </nav>
  </header>
</template>

<style>


.header-background {
  background: url("@/assets/images/headerrrr.jpg") center/cover no-repeat;
  /* background-color: rgb(50, 50, 53); */
}
</style>