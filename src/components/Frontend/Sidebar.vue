<template>

    <aside id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-[225px] h-screen transition-transform bg-white border-r border-gray-200"
        :class="isSidenavOpen ? '' : '-translate-x-full'" aria-label="Sidebar">
        <div>
            <div class="flex flex-col h-full">
                <div class="flex items-center justify-between px-4 pt-4 shrink-0">
                    <span class="inline-flex items-center gap-2">
                        <span class="font-semibold text-2xl text-primary-500 dark:text-primary-400 mb-4">Hi {{
            getUserMe?.username }}!
                        </span>
                    </span>
                </div>
                <hr class="mb-4">
                <div v-for="(item, index) in sidebarItems" :key="'nav' + index" class="overflow-y-auto mb-2">
                    <ul v-if="item.to" class="list-none px-4 m-0">
                        <RouterLink :to="item.to" v-ripple
                            class="flex items-center cursor-pointer p-3 rounded-md text-surface-700 dark:text-surface-0/80 hover:bg-surface-100 dark:hover:bg-surface-700 duration-200 transition-colors"
                            :class="{ 'bg-surface-100': isActive(item.to) }">
                            <i class="mr-2" :class="item.icon"></i>
                            <span class="font-medium">{{ item.label }}</span>
                        </RouterLink>
                    </ul>
                    <ul v-if="item.children" class="list-none px-4 m-0">
                        <li>
                            <div v-ripple v-styleclass="{
            selector: '@next',
            enterClass: 'hidden',
            enterActiveClass: 'slidedown',
            leaveToClass: 'hidden',
            leaveActiveClass: 'slideup'
        }" class="p-3 flex items-center justify-between text-surface-600 dark:text-surface-400 cursor-pointer rounded-md">
                                <span class="font-medium">{{ item.label }}</span>
                                <i class="pi pi-chevron-down"></i>
                            </div>
                            <ul class="list-none p-0 m-0 overflow-hidden">
                                <li v-for="(child, index) in item.children" :key="'nav_child' + index">
                                    <RouterLink v-if="child.to" :to="child.to" v-ripple
                                        class="flex items-center cursor-pointer p-3 rounded-md text-surface-700 dark:text-surface-0/80 hover:bg-surface-100 dark:hover:bg-surface-700 duration-200 transition-colors"
                                        :class="{ 'bg-surface-100': isActive(child.to) }">
                                        <i class="mr-2" :class="child.icon"></i>
                                        <span class="font-medium">{{ child.label }}</span>
                                    </RouterLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <!-- <div class="mt-auto">
                    <hr class="mb-3 mx-3 border-t-1 border-none border-surface-200 dark:border-surface-700" />
                    <a v-ripple
                        class="m-3 flex items-center cursor-pointer p-3 gap-2 rounded-md text-surface-700 dark:text-surface-0/80 hover:bg-surface-100 dark:hover:bg-surface-700 duration-200 transition-colors">
                    </a>
                </div> -->
            </div>

        </div>

    </aside>
</template>

<script setup lang="ts">
import type { SideBarNavItemType } from '@/dtos/general'
import { onMounted, type PropType } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';
import { storeToRefs } from 'pinia';
import type { RouteLocationRaw } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();

const authStore = useAuthStore();

const { getUserMe } = storeToRefs(authStore);

const isActive = (to: RouteLocationRaw) => {
    if (typeof to === 'object' && 'name' in to) {
        return to.name === router.currentRoute.value.name
    } return false
}

defineProps({
    isSidenavOpen: Boolean,
    sidebarItems: { type: Object as PropType<SideBarNavItemType[]>, required: true, }
})

onMounted(() => {
})
</script>