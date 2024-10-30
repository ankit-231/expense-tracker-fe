<template>
  <div class="h-full">
    <div class="h-[10%] flex justify-between items-center">
      <div class="flex items-center justify-center gap-x-5">
        <div class="text-2xl font-bold">Your Transactions</div>
        <div class="text-sm font-bold">Balance: {{ getUserCurrency }} {{ getFinancialDetail.balance }}</div>
      </div>
      <div>
        <DatePicker v-model="transactionDateRange" selectionMode="range" :manualInput="false" />
        <span class="ml-2">
          <!-- <Button severity="info" class="" label="Apply" @click="handleApplyFilter" /> -->
          <Button icon="pi pi-check" v-tooltip.top="'Apply Filter'" text rounded aria-label="Filter"
            @click="handleApplyFilter" severity="info" />
          <Button v-if="appliedFilter" icon="pi pi-times" v-tooltip.top="'Clear Filter'" text rounded aria-label="Filter"
            @click="clearFilter" severity="danger" />
          <!-- <div v-if="appliedFilter"
            class="ml-2 w-1 text-sm text-red-500 border-2 border-red-500 rounded-lg hover:cursor-pointer"
            @click="clearFilter">x
          </div> -->
        </span>
      </div>
      <div>
      </div>
      <div>
        <Button @click="showTransactionModal()" class="ml-4" label="Add Transaction" />

      </div>
    </div>
    <div class="overflow-y-auto h-[90%]">
      <TransactionDetailCard @edit-transaction="handleEditTransaction" @delete-transaction="handleDeleteTransaction"
        v-for="transactionPaginated in getTransactionListPaginated" :transaction-paginated="transactionPaginated" />
    </div>
  </div>
</template>
<script setup lang="ts">
import TransactionDetailCard from '@/components/transaction/TransactionDetailCard.vue';
import { onMounted, ref } from 'vue';
import { useTransactionStore } from '@/stores/transaction/transaction';
import { storeToRefs } from 'pinia';
import { useDialog } from 'primevue/usedialog';
import TransactionAdd from '@/components/transaction/TransactionAdd.vue';
import { useWalletStore } from '@/stores/wallet/wallet';
import type { TransactionPayload } from '@/core/dtos/transaction';
import type { TransactionDetail } from '@/core/dtos/transaction';
import { TransactionType } from '@/core/constants/general';
import customDialog from '@/core/services/dialog';
import { useUserStore } from '@/stores/users/user';
import { useAuthStore } from '@/stores/auth/auth';
import { useKeyboardShortcut } from '@/core/composables/useKeyboardShortcut';
import { getTransactionDate } from '@/core/services/utilities';

const appliedFilter = ref(false)

const dialog = useDialog();

const walletStore = useWalletStore();

const transactionStore = useTransactionStore();

const userStore = useUserStore();

const authStore = useAuthStore();

const { getTransactionListPaginated, getTransactionDetailPaginated } = storeToRefs(transactionStore)
const { getFinancialDetail } = storeToRefs(userStore)

const { getUserCurrency } = storeToRefs(authStore);

const transactionDateRange = ref()

const handleApplyFilter = async () => {
  if (!transactionDateRange.value) return
  let start_date = getTransactionDate(transactionDateRange.value[0])
  let end_date = getTransactionDate(transactionDateRange.value[1])
  let params = {
    start_date: start_date,
    end_date: end_date
  }
  await transactionStore.fetchTransactionListPaginated(params)
  console.log(transactionDateRange.value, "transactionDateRange.value")
  appliedFilter.value = true
}

const clearFilter = () => {
  transactionDateRange.value = null
  appliedFilter.value = false
  refreshData()
}

onMounted(async () => {
  await refreshData()
  await walletStore.fetchWalletList('enabled')
  await transactionStore.fetchTransactionCategoryList(TransactionType.DEBIT)
  console.log(getTransactionListPaginated, "getTransactionListPaginated")
  // showTransactionModal()

})

const refreshData = async () => {
  await userStore.fetchFinancialDetail()
  await transactionStore.fetchTransactionListPaginated()
}

const handleEditTransaction = (transaction: TransactionDetail) => {
  console.log(transaction, "handleEditTransaction")
  showTransactionModal(transaction)
}

const handleDeleteTransaction = (transaction: TransactionDetail) => {
  console.log(transaction, "handleDeleteTransaction")
  customDialog.show({
    title: "Confirmation",
    message: "Are you sure you want to proceed?",
    onConfirm: async () => {
      await transactionStore.deleteTransaction(transaction.id)
      await refreshData()
    },
  });
}

const isAddTransactionOpen = ref(false)

const showTransactionModal = (transaction: TransactionDetail | null = null) => {
  isAddTransactionOpen.value = true
  dialog.open(TransactionAdd, {
    props: {
      header: 'Add Transaction',
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
      transaction: transaction,
      testing: 'test'
    },
    onClose: (event) => {
      console.log(event, "dd")
      isAddTransactionOpen.value = false
    }
  })
}

const handleTPress = () => {
  if (isAddTransactionOpen.value) return
  showTransactionModal()
}

useKeyboardShortcut("t", handleTPress)

</script>
<style></style>
