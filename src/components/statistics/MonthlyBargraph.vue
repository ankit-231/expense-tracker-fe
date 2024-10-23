<template>
  <div>
    <div class="shadow-lg rounded-md p-4">
      <div>
        <Chart type="bar" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";

import { useTransactionStore } from '@/stores/transaction/transaction';
import { storeToRefs } from 'pinia';
import { ChartTypeEnum } from "@/core/constants/general";

const transactionStore = useTransactionStore();

const { getMonthlyStatisticsBarGraph } = storeToRefs(transactionStore);


const props = defineProps({
  dateForChart: { type: Date, required: true }
})


onMounted(async () => {
  await fetchAndSetChartData()
  chartOptions.value = setChartOptions()
});

watch(() => props.dateForChart, () => {
  console.log("dateForChart", props.dateForChart)
  fetchAndSetChartData()
})

const fetchAndSetChartData = async () => {
  await transactionStore.fetchMonthlyStatistics(props.dateForChart.getFullYear(), props.dateForChart.getMonth() + 1, ChartTypeEnum.BAR_GRAPH)
  chartData.value = setChartData()
}


const chartData = ref();

// const chartData = computed(() => {
//   return getMonthlyStatisticsBarGraph.value
// });
const chartOptions = ref();

const setChartData = () => {
  return {
    labels: getMonthlyStatisticsBarGraph.value?.labels || [],
    // labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'], 
    datasets: getMonthlyStatisticsBarGraph.value?.datasets || [],
    // datasets: [
    //   {
    //     label: getMonthlyStatisticsBarGraph.value?.datasets[0].label || 'Dataset 1',
    //     // data: [540, 325, 702, 620],
    //     data: getMonthlyStatisticsBarGraph.value?.datasets[0].data,
    //     backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)'],
    //     borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
    //     borderWidth: 1
    //   }, {
    //     label: getMonthlyStatisticsBarGraph.value?.datasets[1].label || 'Dataset 1',
    //     data: [540, 325, 702, 620],
    //     // data: getMonthlyStatisticsBarGraph.value?.datasets[1].data,
    //     backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)'],
    //     borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
    //     borderWidth: 1
    //   }
    // ]
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  };
}
</script>
