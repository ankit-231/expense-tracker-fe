<script setup lang="ts">
import MonthlyBargraph from '@/components/statistics/MonthlyBargraph.vue';
import MonthlyPiechart from '@/components/statistics/MonthlyPiechart.vue';
import { useTransactionStore } from '@/stores/transaction/transaction';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { TransactionType } from '@/core/constants/general';

const transactionStore = useTransactionStore();

onMounted(async () => {
})

const dateForChart = ref(new Date())

const decreaseMonth = () => {
  // since date is object, vue's reactivity might not detect property changes
  const newDate = new Date(dateForChart.value);
  newDate.setMonth(newDate.getMonth() - 1);
  dateForChart.value = newDate;

  console.log(dateForChart.value.getMonth())
};

const increaseMonth = () => {
  // since date is object, vue's reactivity might not detect property changes
  const newDate = new Date(dateForChart.value);
  newDate.setMonth(newDate.getMonth() + 1);
  dateForChart.value = newDate;
  console.log(dateForChart.value.getMonth())

};

const formattedDate = computed(() => {
  return dateForChart.value.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});


</script>

<template>
  <div class="h-full overflow-y-auto">
    <h1 class="text-3xl font-bold mb-4">Your Monthly Statistics </h1>

    <div class="flex justify-between items-center mb-4">
      <Button @click="decreaseMonth" class="mr-2">Previous</Button>
      <span class="font-bold">{{ formattedDate }}</span>
      <Button @click="increaseMonth" class="ml-2">Next</Button>
    </div>
    <div>
      <div>
        <MonthlyBargraph class="mb-4 w-[70%] mx-auto" :date-for-chart="dateForChart" />
      </div>
      <div class="w-[90%] mx-auto shadow-lg rounded-md p-4 mb-10">
        <div class="grid grid-cols-2">
          <MonthlyPiechart class="w-[70%] mx-auto" :date-for-chart="dateForChart"
            :transaction-type="TransactionType.CREDIT" />
          <MonthlyPiechart class="w-[70%] mx-auto" :date-for-chart="dateForChart"
            :transaction-type="TransactionType.DEBIT" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
