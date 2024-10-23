<script setup lang="ts">
import { computed, onMounted, ref, watch, onBeforeMount } from 'vue';
import Sidebar from '@/components/Frontend/Sidebar.vue';
import Navbar from '@/components/Frontend/Navbar.vue';
import LeftMenu from '@/components/navigation/LeftMenu.vue';
import RightMenu from '@/components/navigation/RightMenu.vue';
import FooterMenu from '@/components/navigation/FooterMenu.vue';
import { useRoute, useRouter } from 'vue-router';
import type { Breadcrumb } from "@/core/dtos/general";
// import import_sidebar from '@/assets/js/sidebar';
import { useAuthStore } from '@/stores/auth/auth';
import { storeToRefs } from 'pinia';
import HelpIcon from '@/components/general/HelpIcon.vue';

const authStore = useAuthStore();

const { getUserMe } = storeToRefs(authStore);


var isSidenavOpen = ref(true);
const route = useRoute();
const toggleSideNav = () => {
  isSidenavOpen.value = !isSidenavOpen.value;
}
console.log(route.matched, "route.matched")
const items = computed(() => {
  return route.matched.reduce((acc: Breadcrumb[], record: any) => {
    if (Array.isArray(record.meta?.breadcrumbs)) {
      acc.push(...record.meta.breadcrumbs);
    }
    return acc;
  }, []);
});

const role = localStorage.getItem('role');


</script>

<template>
  <div class="w-[60%] h-[100vh] m-auto border border-gray-300">
    <div class="h-[10%] border-b border-gray-300">
      <Navbar />
    </div>
    <div class="p-2 h-[87%]">
      <RouterView />
    </div>
    <div class="fixed bottom-0 w-[60%] h-[3%]">
      <FooterMenu />
    </div>
    <HelpIcon />
  </div>
</template>


<style scoped>
/* .main-background {
  background-color: rgb(255, 250, 245);
} */
</style>