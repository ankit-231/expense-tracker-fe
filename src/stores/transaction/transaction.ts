import { defineStore } from "pinia";
import client from "@/core/services/client";
import { api } from "@/core/api-endpoints/api";
import type {
  TransactionDetailPaginated,
  TransactionPaginated,
  TransactionPayload,
} from "@/core/dtos/transaction";
import toast from "@/core/services/toast";
import router from "@/router";

export const useTransactionStore = defineStore("transaction", {
  state: () => ({
    errors: null as null | any,
    loadingStatus: false,
    transactionListPaginated: [] as TransactionPaginated[],
    transactionDetailPaginated: null as null | TransactionPaginated,
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
  },

  actions: {
    async fetchTransactionListPaginated() {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .get(api.transaction.listPaginated)
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
      await client
        .post(api.transaction.create, body)
        .then((response) => {
          this.loadingStatus = false;
          toast.success(response.data.message || "Created");
          router.push({ name: "transaction" });
        })
        .catch((error) => {
          this.errors = error?.response?.data?.data;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
        });
    },
    async updateTransaction(id: number, body: TransactionPayload) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .post(api.transaction.update(id), body)
        .then((response) => {
          this.loadingStatus = false;
          toast.success(response.data.message || "Updated");
          router.push({ name: "transaction" });
        })
        .catch((error) => {
          this.errors = error?.response?.data?.data;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
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
  },
});
