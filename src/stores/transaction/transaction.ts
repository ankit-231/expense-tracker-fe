import { defineStore } from "pinia";
import client from "@/core/services/client";
import { api } from "@/core/api-endpoints/api";
import type {
  MonthlyStatisticsDetail,
  TransactionCategoryCreatePayload,
  TransactionCategoryDetail,
  TransactionCategoryUpdatePayload,
  TransactionDetailPaginated,
  TransactionFetchParams,
  TransactionPaginated,
  TransactionPayload,
} from "@/core/dtos/transaction";
import toast from "@/core/services/toast";
import router from "@/router";
import { ChartTypeEnum, type TransactionType } from "@/core/constants/general";

export const useTransactionStore = defineStore("transaction", {
  state: () => ({
    errors: null as null | any,
    loadingStatus: false,
    transactionListPaginated: [] as TransactionPaginated[],
    transactionDetailPaginated: null as null | TransactionPaginated,
    transactionCategoryList: [] as TransactionCategoryDetail[],
    monthlyStatisticsBarGraph: null as null | MonthlyStatisticsDetail,
    monthlyStatisticsPieChart: {
      credit: null as MonthlyStatisticsDetail | null,
      debit: null as MonthlyStatisticsDetail | null,
    },
  }),

  getters: {
    getErrors(state) {
      return state.errors;
    },
    getLoadingStatus(state) {
      return state.loadingStatus;
    },
    getTransactionListPaginated(state) {
      return state.transactionListPaginated;
    },
    getTransactionDetailPaginated(state) {
      return state.transactionDetailPaginated;
    },
    getTransactionCategoryList(state) {
      return state.transactionCategoryList;
    },
    getMonthlyStatisticsBarGraph(state) {
      return state.monthlyStatisticsBarGraph;
    },
    getMonthlyStatisticsPieChart(state) {
      return state.monthlyStatisticsPieChart;
    },
  },

  actions: {
    async fetchTransactionListPaginated(params: TransactionFetchParams = {}) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .get(api.transaction.listPaginated, { params: params })
        .then((response) => {
          this.transactionListPaginated = response.data.data;
          console.log(this.transactionListPaginated);
          this.loadingStatus = false;
        })
        .catch((error) => {
          this.errors = error;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
        });
    },
    async fetchTransactionDetail(id: number) {
      this.errors = null;
      this.transactionDetailPaginated = null;
      this.loadingStatus = true;
      await client
        .get(api.transaction.detail(id))
        .then((response) => {
          this.transactionDetailPaginated = response.data.data;
          this.loadingStatus = false;
        })
        .catch((error) => {
          this.errors = error;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
        });
    },

    async createTransaction(body: TransactionPayload) {
      this.errors = null;
      this.loadingStatus = true;
      return await client
        .post(api.transaction.create, body)
        .then((response) => {
          this.loadingStatus = false;
          toast.success(response.data.message || "Created");
          // router.push({ name: "transaction" });
          return true;
        })
        .catch((error) => {
          this.errors = error?.response?.data?.data;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
          return false;
        });
    },
    async updateTransaction(id: number, body: TransactionPayload) {
      this.errors = null;
      this.loadingStatus = true;
      return await client
        .post(api.transaction.update(id), body)
        .then((response) => {
          this.loadingStatus = false;
          toast.success(response.data.message || "Updated");
          // router.push({ name: "transaction" });
          return true;
        })
        .catch((error) => {
          this.errors = error?.response?.data?.data;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
          return false;
        });
    },
    async deleteTransaction(id: number) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .delete(api.transaction.delete(id))
        .then((response) => {
          this.loadingStatus = false;
          toast.success(response.data.message || "Deleted");
          router.push({ name: "transaction" });
        })
        .catch((error) => {
          this.errors = error?.response?.data?.data;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
        });
    },

    async fetchTransactionCategoryList(category_type: TransactionType) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .get(api.transaction.category.list(category_type))
        .then((response) => {
          this.loadingStatus = false;
          this.transactionCategoryList = response.data.data;
        })
        .catch((error) => {
          this.errors = error;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
        });
    },
    async fetchMonthlyStatistics(
      year: number,
      month: number,
      chartType: ChartTypeEnum
    ) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .get(api.transaction.statistics.monthly(year, month), {
          params: { chart_type: chartType },
        })
        .then((response) => {
          this.loadingStatus = false;
          if (chartType === ChartTypeEnum.BAR_GRAPH) {
            this.monthlyStatisticsBarGraph = response.data.data;
          } else if (chartType === ChartTypeEnum.PIE_CHART_CREDIT) {
            this.monthlyStatisticsPieChart.credit = response.data.data;
          } else if (chartType === ChartTypeEnum.PIE_CHART_DEBIT) {
            this.monthlyStatisticsPieChart.debit = response.data.data;
          }
        })
        .catch((error) => {
          this.errors = error;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
        });
    },
    async createTransactionCategory(body: TransactionCategoryCreatePayload) {
      this.errors = null;
      this.loadingStatus = true;
      return await client
        .post(api.transaction.category.create, body)
        .then((response) => {
          this.loadingStatus = false;
          toast.success(response.data.message || "Created");
          return true;
        })
        .catch((error) => {
          this.errors = error;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
          return false;
        });
    },
    async updateTransactionCategory(
      categoryId: number,
      body: TransactionCategoryUpdatePayload
    ) {
      this.errors = null;
      this.loadingStatus = true;
      return await client
        .post(api.transaction.category.update(categoryId), body)
        .then((response) => {
          this.loadingStatus = false;
          toast.success(response.data.message || "Updated");
          return true;
        })
        .catch((error) => {
          this.errors = error;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
          return false;
        });
    },
    async deleteTransactionCategory(categoryId: number) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .delete(api.transaction.category.delete(categoryId))
        .then((response) => {
          this.loadingStatus = false;
          toast.success(response.data.message || "Deleted");
        })
        .catch((error) => {
          this.errors = error;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
        });
    },
  },
});
