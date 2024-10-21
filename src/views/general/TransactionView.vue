<template>
  <div class="h-full">
    <div class="h-[10%] flex justify-between items-center">
      <div class="text-2xl">Your Transactions</div>
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
import { onMounted } from 'vue';
import { useTransactionStore } from '@/stores/transaction/transaction';
import { storeToRefs } from 'pinia';
import { useDialog } from 'primevue/usedialog';
import TransactionAdd from '@/components/transaction/TransactionAdd.vue';
import { useWalletStore } from '@/stores/wallet/wallet';
import type { TransactionPayload } from '@/core/dtos/transaction';
import type { TransactionDetail } from '@/core/dtos/transaction';
import { TransactionType } from '@/core/constants/general';
import customDialog from '@/core/services/dialog';



const dialog = useDialog();

const walletStore = useWalletStore();

const transactionStore = useTransactionStore();

const { getTransactionListPaginated, getTransactionDetailPaginated } = storeToRefs(transactionStore)

onMounted(async () => {

  await transactionStore.fetchTransactionListPaginated()
  await walletStore.fetchWalletList()
  await transactionStore.fetchTransactionCategoryList(TransactionType.DEBIT)
  console.log(getTransactionListPaginated, "getTransactionListPaginated")
  // showTransactionModal()

})

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
      await transactionStore.fetchTransactionListPaginated()
    },
  });
}

const showTransactionModal = (transaction: TransactionDetail | null = null) => {
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
    }
  })
}
</script>
<style></style>
