<template>
  <div class="w-full bg-slate-50 rounded-md p-4 mb-4">
    <!-- Transaction Info of that Day -->
    <div class="flex justify-between sticky top-0 bg-slate-50 h-10 p-2">
      <div>{{ transactionPaginated.day }} {{ transactionPaginated.transaction_date }}</div>
      <!-- Total Amount -->
      <div :class="transactionPaginated.transaction_type === TransactionType.CREDIT ? 'text-blue-500' : 'text-red-500'">
        {{ prefix(transactionPaginated.transaction_type) }}
        {{ transactionPaginated.absolute_amount }}
      </div>
    </div>
    <!-- That Day's all Transactions -->
    <div v-for="transaction in transactionPaginated.transactions" :key="transaction.id">
      <div class="grid grid-cols-12 my-1 p-4 bg-white hover:bg-slate-100 hover:cursor-pointer group"
        @click="handleEditTransaction(transaction)">
        <div class="col-span-1 flex justify-center items-center">
          <WalletIcon :icon-class="transaction.wallet_icon" font-size="20px" color="green" />
        </div>
        <div class="col-span-8">{{ transaction.description }}</div>
        <div class="col-span-3 text-right mr-2">
          <span :class="transaction.transaction_type === TransactionType.CREDIT ? 'text-blue-500' : 'text-red-500'">
            {{ prefix(transaction.transaction_type) }} {{ transaction.amount }}</span>
          <span class="text-right ml-2 hidden group-hover:inline-block">
            <i v-tooltip.top="'Delete Transaction'" @click.stop="handleDeleteTransaction(transaction)"
              class="pi pi-trash hover:cursor-pointer"></i>
          </span>
        </div>

      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import TransactionDetailCard from "@/components/transaction/TransactionDetailCard.vue";
import { computed, type PropType } from "vue";
import type { TransactionPaginated } from "@/core/dtos/transaction";
import { useAuthStore } from "@/stores/auth/auth";
import { storeToRefs } from "pinia";
import { TransactionType } from "@/core/constants/general";
import WalletIcon from "@/components/wallet/WalletIcon.vue";
import type { TransactionDetail } from "@/core/dtos/transaction";

const authStore = useAuthStore();

const { getUserCurrency } = storeToRefs(authStore);

const emit = defineEmits(['editTransaction', 'deleteTransaction']);

const props = defineProps({
  transactionPaginated: {
    type: Object as PropType<TransactionPaginated>,
    required: true
  }
})

const handleEditTransaction = (transaction: TransactionDetail) => {
  emit('editTransaction', transaction)
}
const handleDeleteTransaction = (transaction: TransactionDetail) => {
  emit('deleteTransaction', transaction)
}

const prefix = (transactionType: TransactionType) => {
  let p = transactionType === TransactionType.CREDIT ? '+' : '-'
  return p + ' ' + getUserCurrency.value;
}
</script>
<style scoped></style>
