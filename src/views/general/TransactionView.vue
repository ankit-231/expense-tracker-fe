<template>
  <div class="h-full">
    <div class="h-[10%] flex justify-between items-center">
      <div class="text-2xl">Your Transactions</div>
      <div>
        <!-- <Button class="ml-4" label="Add Transaction" @click="transactionStore.showTransactionModal()" /> -->
        <Button class="ml-4" label="Add Transaction" />

      </div>
    </div>
    <div class="overflow-y-auto h-[90%]">
      <TransactionDetailCard v-for="transactionPaginated in getTransactionListPaginated"
        :transaction-paginated="transactionPaginated" />
      <TransactionDetailCard v-for="transactionPaginated in getTransactionListPaginated"
        :transaction-paginated="transactionPaginated" />
      <TransactionDetailCard v-for="transactionPaginated in getTransactionListPaginated"
        :transaction-paginated="transactionPaginated" />
    </div>
  </div>
</template>
<script setup lang="ts">
import TransactionDetailCard from '@/components/transaction/TransactionDetailCard.vue';
import { onMounted } from 'vue';
import { useTransactionStore } from '@/stores/transaction/transaction';
import { storeToRefs } from 'pinia';

const transactionStore = useTransactionStore();

const { getTransactionListPaginated, getTransactionDetailPaginated } = storeToRefs(transactionStore)

onMounted(async () => {

  await transactionStore.fetchTransactionListPaginated()
  console.log(getTransactionListPaginated, "getTransactionListPaginated")

})
</script>
<style></style>
