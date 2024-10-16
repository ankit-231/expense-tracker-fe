<template>
    <nav class="w-full h-full  ">
        <div class="h-full grid grid-cols-4 items-center justify-center bg-gray-50">
            <RouterLink v-for="routerLink in routerLinks" :to="{ name: routerLink.name }"
                class="w-full h-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                active-class="custom-active-class">
                <i :class="routerLink.icon" style="font-size: 1.5rem"></i>
                <span class="ml-2">{{ routerLink.label }}</span>
            </RouterLink>
        </div>
    </nav>
</template>

<script setup lang="ts">

import { useConfirm } from "primevue/useconfirm";
import { useAuthStore } from '@/stores/auth/auth';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { type RouteRecordRaw } from 'vue-router'

const emit = defineEmits(['toggleSideNav'])
defineProps({
    isSidenavOpen: Boolean
})

const routerLinks = [
    {
        label: "Transaction",
        name: "transaction",
        icon: "pi pi-sliders-h"
    },
    // {
    //     label: "Calendar",
    //     name: "calendar",
    //     icon: "pi pi-calendar"
    // },
    {
        label: "Statistics",
        name: "statistics",
        icon: "pi pi-chart-bar"
    },
    {
        label: "Wallet",
        name: "wallet",
        icon: "pi pi-wallet"
    },
    {
        label: "Settings",
        name: "settings",
        icon: "pi pi-cog"
    }
]

const isUserMenuOpen = ref(false);

const confirm = useConfirm();
const authStore = useAuthStore();

const { getUserMe } = storeToRefs(authStore);

const handleLogoutHandler = () => {
    console.log("clokk")
    confirm.require({
        message: 'Are you sure you want to logout',
        header: 'Logout',

        rejectClass: '!bg-red-500 !border-none',
        acceptClass: '!border-none',
        defaultFocus: "accept",
        // acceptProps: {
        //     label: 'Save'
        // },
        accept: async () => {
            await authStore.logout();

            // handle logouut here 
        },
        reject: () => {
            // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}
</script>
<style scoped>
.custom-active-class {
    background-color: #f0f0f0;
    color: #333;
}

.custom-active-class i {
    color: #007BFF;
}
</style>