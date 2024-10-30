<template>
  <div class="h-full relative">
    <div class="h-[10%] flex justify-between items-center">
      <div class="flex items-center justify-center gap-x-5">
        <div class="text-2xl font-bold">Categories</div>
      </div>
      <div>
        <CreditDebitChooser v-model="categoryType" />
      </div>
      <div>
        <Button @click="showCategoryModal()" class="ml-4" label="Add Category" />
      </div>
    </div>
    <div class="h-[80%] overflow-y-auto ">
      <div v-for="category in getTransactionCategoryList" :key="category.id" class="grid grid-cols-12 my-1 p-4
        bg-slate-50 hover:bg-slate-100 hover:cursor-pointer group" @click="handleEditTransactionCategory(category)">
        <WalletIcon :icon-class="category.icon_class" font-size="20px" color="green" />
        <span class="col-span-10">{{ category.name }}</span>
        <span class="text-right ml-2 hidden group-hover:inline-block">
          <i v-tooltip.top="'Delete Category'" @click.stop="handleDeleteTransactionCategory(category)"
            class="pi pi-trash hover:cursor-pointer hover:text-red-500"></i>
        </span>
      </div>
    </div>
    <div class="h-[10%]">
      <div v-tooltip.top="'Go Back'" class="absolute bottom-0 left-0 mt-4 ml-4">
        <Button @click="$router.push({ name: 'settings' })" icon="pi pi-arrow-left" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useTransactionStore } from '@/stores/transaction/transaction';
import { storeToRefs } from 'pinia';
import { useDialog } from 'primevue/usedialog';
import CategoryAdd from '@/components/transaction/CategoryAdd.vue';
import { useWalletStore } from '@/stores/wallet/wallet';
import type { TransactionCategoryDetail, TransactionPayload } from '@/core/dtos/transaction';
import { TransactionType } from '@/core/constants/general';
import customDialog from '@/core/services/dialog';
import { useUserStore } from '@/stores/users/user';
import { useAuthStore } from '@/stores/auth/auth';
import WalletIcon from '@/components/wallet/WalletIcon.vue';
import CreditDebitChooser from '@/components/transaction/CreditDebitChooser.vue';
import { useCoreStore } from '@/stores/core/core';



const dialog = useDialog();

const coreStore = useCoreStore();
const walletStore = useWalletStore();
const transactionStore = useTransactionStore();
const userStore = useUserStore();
const authStore = useAuthStore();

const { getTransactionCategoryList } = storeToRefs(transactionStore)
const { getFinancialDetail } = storeToRefs(userStore)

const { getUserCurrency } = storeToRefs(authStore);

const categoryType = ref<TransactionType>(TransactionType.DEBIT)

onMounted(async () => {
  await refreshData()
  await walletStore.fetchWalletList('enabled')
  await transactionStore.fetchTransactionCategoryList(categoryType.value)
  await coreStore.fetchIconList()
  // showCategoryModal()

})

watch(categoryType, async () => {
  await refreshData()
})

const refreshData = async () => {
  await transactionStore.fetchTransactionCategoryList(categoryType.value)
}

const handleEditTransactionCategory = (category: TransactionCategoryDetail) => {
  console.log(category, "handleEditTransactionCategory")
  showCategoryModal(category)
}

const handleDeleteTransactionCategory = (category: TransactionCategoryDetail) => {
  console.log(category, "handleDeleteTransactionCategory")
  customDialog.show({
    title: "Confirmation",
    message: "Are you sure you want to proceed?",
    onConfirm: async () => {
      await transactionStore.deleteTransactionCategory(category.id)
      await refreshData()
    },
  });
}


const showCategoryModal = (category: TransactionCategoryDetail | null = null) => {
  dialog.open(CategoryAdd, {
    props: {
      header: 'Category',
      style: {
        width: '50vw',
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      modal: true,
    },
    data: {
      category: category,
      categoryType: categoryType.value,
      testing: 'test'
    },
    onClose: (opt) => {

      console.log(opt, "opt")

      if (opt?.data?.refreshData) {
        refreshData()
      }
    }
  })
}


</script>
<style></style>
