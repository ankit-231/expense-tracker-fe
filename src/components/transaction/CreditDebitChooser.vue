<template>

  <div class="flex justify-start mb-4 border border-gray-300 rounded-md w-min">
    <button type="button" class="px-4 py-2 rounded-md text-sm font-medium"
      :class="transactionType === TransactionType.CREDIT ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'"
      @click="transactionType = TransactionType.CREDIT">
      Income
    </button>
    <button type="button" class="px-4 py-2 rounded-md text-sm font-medium "
      :class="transactionType === TransactionType.DEBIT ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-100'"
      @click="transactionType = TransactionType.DEBIT">
      Expense
    </button>
  </div>
</template>

<script setup lang="ts">

import { TransactionType } from '@/core/constants/general';

const transactionType = defineModel<TransactionType>(TransactionType.DEBIT)

</script>