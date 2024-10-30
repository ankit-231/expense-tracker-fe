<template>
  <div class="w-full h-full bg-white rounded-md p-4">

    <form @submit.prevent="handleAddCategory">
      <!-- {{ errors }} -->
      <!-- {{ amount }} -->
      <!-- {{ getTransactionCategoryList }} -->
      <CreditDebitChooser v-if="!category?.id" v-model="category_type" />

      <div class="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <InputText v-tooltip.top="errors?.name" :invalid="!!errors?.name" type="text" name="name" id="name"
            v-model="name" class="mt-1 w-full" />
        </div>
        <div>
          <label for="icon" class="block text-sm font-medium text-gray-700">Icon</label>
          <Select v-tooltip.top="errors?.icon" :invalid="!!errors?.icon" name="icon" id="icon" v-model="icon"
            :options="getIconList" option-label="name" option-value="id" placeholder="Select icon"
            class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm">
            <template #option="slotProps">
              <div class="flex items-center">
                <WalletIcon class="mr-2" :icon-class="slotProps.option.class_name" fontSize="20px" color="#058a9e" />
                {{ slotProps.option.name }}
              </div>
            </template>
          </Select>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <Button type="submit" class="inline-flex justify-center py-2 px-4">
          {{ category ? 'Update' : 'Add' }} Category
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
import { useForm } from 'vee-validate';
import { categoryCreateSchema, categoryUpdateSchema } from '@/core/schemas/general';
import type { TransactionCategoryCreatePayload, TransactionCategoryDetail, TransactionCategoryUpdatePayload, TransactionDetail, TransactionPayload } from '@/core/dtos/transaction';
import WalletIcon from '@/components/wallet/WalletIcon.vue';
import { useUserStore } from '@/stores/users/user';
import CreditDebitChooser from '@/components/transaction/CreditDebitChooser.vue';
import { useCoreStore } from '@/stores/core/core';
import { TransactionType } from '@/core/constants/general';

const dialogRef: any = inject('dialogRef');

let { values, errors, handleSubmit, defineField, setErrors, setValues, validate, } = useForm({
  validationSchema: dialogRef.value.data.category ? categoryUpdateSchema : categoryCreateSchema,
});


const setInitialValues = () => {
  setValues({
    category_type: dialogRef.value.data.categoryType,
  })

  if (category.value) {
    setValues({
      name: category.value.name,
      icon: category.value.icon,
    })
  }
}



const category = ref<TransactionCategoryDetail | null>(null)

onMounted(() => {
  category.value = dialogRef.value.data.category
  console.log(dialogRef.value, "dialogRef")
  setInitialValues()
})


const coreStore = useCoreStore();
const transactionStore = useTransactionStore()
const walletStore = useWalletStore()
const userStore = useUserStore()

const { getIconList } = storeToRefs(coreStore);
const { getWalletList } = storeToRefs(walletStore);
const { getTransactionCategoryList } = storeToRefs(transactionStore);

const [category_type, category_typeAttrs] = defineField('category_type');
const [name, nameAttrs] = defineField('name');
const [icon, iconAttrs] = defineField('icon');


const handleAddCategory = handleSubmit(async (values) => {
  let success = false
  if (category.value?.id) {
    success = await transactionStore.updateTransactionCategory(category.value.id, values as TransactionCategoryUpdatePayload)
  } else {
    success = await transactionStore.createTransactionCategory(values as TransactionCategoryCreatePayload)
  }
  if (success) {
    await userStore.fetchFinancialDetail()
    await transactionStore.fetchTransactionListPaginated()

    dialogRef.value.close({ refreshData: true })
  }
})
</script>

<style>
/* .p-inputnumber > input {
  width: 100% !important;
} */
</style>
