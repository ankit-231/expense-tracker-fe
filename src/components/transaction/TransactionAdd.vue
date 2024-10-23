<template>
  <div class="w-full h-full bg-white rounded-md p-4">

    <form @submit.prevent="handleAddTransaction">
      <!-- {{ errors }} -->
      <!-- {{ amount }} -->
      <!-- {{ getTransactionCategoryList }} -->
      <div class="flex justify-start mb-4 border border-gray-300 rounded-md w-min">
        <button type="button" class="px-4 py-2 rounded-md text-sm font-medium"
          :class="transaction_type === TransactionType.CREDIT ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'"
          @click="transaction_type = TransactionType.CREDIT">
          Income
        </button>
        <button type="button" class="px-4 py-2 rounded-md text-sm font-medium "
          :class="transaction_type === TransactionType.DEBIT ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-100'"
          @click="transaction_type = TransactionType.DEBIT">
          Expense
        </button>
      </div>
      <div class="mt-4">
        <label for="time" class="block text-sm font-medium text-gray-700">Time</label>
        <DatePicker v-tooltip.top="errors?.transaction_date_time" id="datepicker-12h" v-model="transaction_date_time"
          showTime hourFormat="12" fluid :invalid="!!errors?.transaction_date_time" />
      </div>

      <div class="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
          <InputNumber v-tooltip.top="errors?.amount" :invalid="!!errors?.amount" name="amount" id="inputnumber"
            v-model="amount" class="mt-1 w-full .p-inputnumber" />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <InputText v-tooltip.top="errors?.description" :invalid="!!errors?.description" type="text" name="description"
            id="description" v-model="description" class="mt-1 w-full" />
        </div>
        <div>
          <label for="wallet" class="block text-sm font-medium text-gray-700">Wallet</label>
          <Select v-tooltip.top="errors?.wallet" :invalid="!!errors?.wallet" name="wallet" id="wallet" v-model="wallet"
            :options="getWalletList" option-label="name" option-value="id" placeholder="Select Wallet"
            class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm">
            <!-- <template #value="slotProps">
              <div class="flex items-center">
                <WalletIcon class="mr-2" :icon-class="slotProps?.value?.icon" fontSize="20px" color="#058a9e" />
                {{ slotProps?.value?.name || slotProps.placeholder }}
              </div>
            </template> -->
            <template #option="slotProps">
              <div class="flex items-center">
                <WalletIcon class="mr-2" :icon-class="slotProps.option.icon" fontSize="20px" color="#058a9e" />
                {{ slotProps.option.name }}
              </div>
            </template>
          </Select>
        </div>
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
          <Select v-tooltip.top="errors?.category" :invalid="!!errors?.category" name="category" id="category"
            v-model="category" :options="getTransactionCategoryList" option-label="name" option-value="id"
            placeholder="Select Category"
            class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm">
            <!-- <template #value="slotProps">
              <div class="flex items-center">
                <WalletIcon class="mr-2" :icon-class="slotProps?.value?.icon" fontSize="20px" color="#058a9e" />
                {{ slotProps?.value?.name || slotProps.placeholder }}
              </div>
            </template> -->
            <template #option="slotProps">
              <div class="flex items-center">
                <WalletIcon class="mr-2" :icon-class="slotProps.option.icon" fontSize="20px" color="#058a9e" />
                {{ slotProps.option.name }}
              </div>
            </template>
          </Select>
        </div>
        <div>
          <label for="note" class="block text-sm font-medium text-gray-700">Note</label>
          <InputText type="text" name="note" id="note" v-model="note" class="mt-1 w-full" />

        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <Button type="submit" class="inline-flex justify-center py-2 px-4">
          {{ transaction ? 'Update' : 'Add' }} Transaction
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject, type PropType, watch } from 'vue'

import { useTransactionStore } from '@/stores/transaction/transaction'
import { useWalletStore } from '@/stores/wallet/wallet'
import { storeToRefs } from 'pinia';
import { TransactionType } from '@/core/constants/general';
import { useForm } from 'vee-validate';
import { transactionCreateSchema } from '@/core/schemas/general';
import type { TransactionDetail, TransactionPayload } from '@/core/dtos/transaction';
import { getTransactionDate, getTransactionDateTime, getTransactionTime } from '@/core/services/utilities';
import { get } from 'node_modules/axios/index.cjs';
import WalletIcon from '@/components/wallet/WalletIcon.vue';
import { useUserStore } from '@/stores/users/user';

let { values, errors, handleSubmit, defineField, setErrors, setValues, validate, } = useForm({
  validationSchema: transactionCreateSchema,
});


const setInitialValues = () => {
  setValues({
    transaction_type: TransactionType.DEBIT,
    transaction_date_time: new Date(),
    wallet: getWalletList.value ? getWalletList.value[0].id : null,
    category: getTransactionCategoryList.value ? getTransactionCategoryList.value[0].id : null,
  })
  if (transaction.value) {
    let transactionDateTime = getTransactionDateTime(transaction.value.transaction_date, transaction.value.transaction_time)
    setValues({
      transaction_date_time: transactionDateTime
    })
    console.log(transaction.value, "dialogRef.value.transaction")
    console.log(transaction.value.transaction_type, "transaction_type")
    transaction.value.amount = +transaction.value.amount
    // transaction.value.category = transaction.value.category.id
    // transaction.value.wallet = transaction.value.wallet.id
    setValues(transaction.value)
  }
}

const dialogRef: any = inject('dialogRef');

const transaction = ref<TransactionDetail | null>(null)

onMounted(() => {
  transaction.value = dialogRef.value.data.transaction
  console.log(dialogRef.value, "dialogRef")
  setInitialValues()
})




const transactionStore = useTransactionStore()
const walletStore = useWalletStore()
const userStore = useUserStore()

const { getWalletList } = storeToRefs(walletStore);
const { getTransactionCategoryList } = storeToRefs(transactionStore);

const [description, descriptionAttrs] = defineField('description');
const [amount, amountAttrs] = defineField('amount');
const [wallet, walletAttrs] = defineField('wallet');
const [transaction_type, transaction_typeAttrs] = defineField('transaction_type');
const [note, noteAttrs] = defineField('note');
const [transaction_date_time, transaction_date_timeAttrs] = defineField('transaction_date_time');
const [category, categoryAttrs] = defineField('category');

watch(transaction_type, () => {
  transactionStore.fetchTransactionCategoryList(transaction_type.value)
})

const handleAddTransaction = handleSubmit(async (values) => {
  // values.wallet = wallet.value.id
  // values.category = category.value.id
  values.transaction_date = getTransactionDate(values.transaction_date_time)
  values.transaction_time = getTransactionTime(values.transaction_date_time)
  console.log(transaction_date_time.value)
  console.log(values)
  let success = false
  console.log(transaction.value?.id, "transaction.value?.id")
  if (transaction.value?.id) {
    success = await transactionStore.updateTransaction(transaction.value.id, values as TransactionPayload)
  } else {
    success = await transactionStore.createTransaction(values as TransactionPayload)
  }
  if (success) {
    await userStore.fetchFinancialDetail()
    await transactionStore.fetchTransactionListPaginated()

    dialogRef.value.close()
  }
})
</script>

<style>
/* .p-inputnumber > input {
  width: 100% !important;
} */
</style>
