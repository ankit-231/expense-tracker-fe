<template>
  <div>
    <div class="card flex justify-center">
      <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";

const transactionStore = useTransactionStore();

const { getMonthlyStatisticsPieChart } = storeToRefs(transactionStore);

import { useTransactionStore } from '@/stores/transaction/transaction';
import { storeToRefs } from 'pinia';
import { ChartTypeEnum } from "@/core/constants/general";
import type { PropType } from "vue";
import { TransactionType } from "@/core/constants/general";

const chartData = ref();
const chartOptions = ref();

onMounted(async () => {
  chartOptions.value = setChartOptions();
  await fetchAndSetChartData()
});

const fetchAndSetChartData = async () => {
  if (props.transactionType === TransactionType.CREDIT) {
    await transactionStore.fetchMonthlyStatistics(props.dateForChart.getFullYear(), props.dateForChart.getMonth() + 1, ChartTypeEnum.PIE_CHART_CREDIT)
  } else {
    await transactionStore.fetchMonthlyStatistics(props.dateForChart.getFullYear(), props.dateForChart.getMonth() + 1, ChartTypeEnum.PIE_CHART_DEBIT)
  }
  chartData.value = setChartData()
}


const props = defineProps({
  dateForChart: { type: Date, required: true },
  transactionType: { type: String as PropType<TransactionType>, required: true }
})



watch(() => props.dateForChart, () => {
  console.log("dateForChart", props.dateForChart)
  fetchAndSetChartData()
})



const setChartData = () => {
  let tempChartData = {}
  if (props.transactionType === TransactionType.CREDIT) {
    tempChartData = {
      labels: getMonthlyStatisticsPieChart.value?.credit?.labels || [],
      datasets: getMonthlyStatisticsPieChart.value?.credit?.datasets || [],
    }
  } else {
    tempChartData = {
      labels: getMonthlyStatisticsPieChart.value?.debit?.labels || [],
      datasets: getMonthlyStatisticsPieChart.value?.debit?.datasets || [],
    }
  }
  return tempChartData
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');

  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: textColor
        }
      }
    }
  };
};
</script>
