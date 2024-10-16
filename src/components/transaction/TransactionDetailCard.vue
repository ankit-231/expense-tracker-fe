<template>
  <div class="w-full bg-slate-50 rounded-md p-4 mb-4">
    <!-- Transaction Info of that Day -->
    <div class="flex justify-between sticky top-0 bg-slate-50">
      <div>{{ transactionPaginated.day }} {{ transactionPaginated.transaction_date }}</div>
      <!-- Total Amount -->
      <div :class="transactionPaginated.transaction_type === TransactionType.CREDIT ? 'text-blue-500' : 'text-red-500'">
        {{ prefix(transactionPaginated.transaction_type) }}
        {{ transactionPaginated.absolute_amount }}
      </div>
    </div>
    <!-- That Day's all Transactions -->
    <div v-for="transaction in transactionPaginated.transactions" :key="transaction.id">
      <div class="grid grid-cols-12 my-1 p-4 bg-white">
        <div class="col-span-1 flex justify-center items-center">
          <WalletIcon :icon-class="transaction.wallet_icon" font-size="20px" color="green" />
        </div>
        <div class="col-span-9">{{ transaction.description }}</div>
        <div class="col-span-2 text-right mr-2"> <span
            :class="transaction.transaction_type === TransactionType.CREDIT ? 'text-blue-500' : 'text-red-500'">
            {{ prefix(transaction.transaction_type) }} {{ transaction.amount }}</span></div>
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

const authStore = useAuthStore();

const { getUserCurrency } = storeToRefs(authStore);

const props = defineProps({
  transactionPaginated: {
    type: Object as PropType<TransactionPaginated>,
    required: true
  }
})


const prefix = (transactionType: TransactionType) => {
  let p = transactionType === TransactionType.CREDIT ? '+' : '-'
  return p + ' ' + getUserCurrency.value;
}
</script>
<style scoped></style>
