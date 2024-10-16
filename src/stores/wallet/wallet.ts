import { defineStore } from "pinia";
import client from "@/core/services/client";
import { api } from "@/core/api-endpoints/api";
import type { WalletDetail, WalletPayload } from "@/core/dtos/wallet";
import toast from "@/core/services/toast";
// import { getFormData } from '@/core/services/utilities'
import jwtServices from "@/core/services/jwt-token";
import router from "@/router";

export const useWalletStore = defineStore("wallet", {
  state: () => ({
    errors: null as null | any,
    loadingStatus: false,
    walletList: [] as WalletDetail[],
    walletDetail: null as null | WalletDetail,
  }),

  getters: {
    getErrors(state) {
      return state.errors;
    },
    getLoadingStatus(state) {
      return state.loadingStatus;
    },
    getWalletList(state) {
      return state.walletList;
    },
    getWalletDetail(state) {
      return state.walletDetail;
    },
  },

  actions: {
    async fetchWalletList(params: { exclude_id: String } | {} = {}) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .get(api.wallet.list, {
          params: params,
        })
        .then((response) => {
          this.walletList = response.data.data;
          // console.log(walletList);
          this.loadingStatus = false;
        })
        .catch((error) => {
          this.errors = error;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
        });
    },
    async fetchWalletDetail(id: number) {
      this.errors = null;
      this.walletDetail = null;
      this.loadingStatus = true;
      await client
        .get(api.wallet.detail(id))
        .then((response) => {
          this.walletDetail = response.data.data;
          this.loadingStatus = false;
        })
        .catch((error) => {
          this.errors = error;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
        });
    },

    async createWallet(body: WalletPayload) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .post(api.wallet.create, body)
        .then((response) => {
          this.loadingStatus = false;
          toast.success(response.data.message || "Created");
        })
        .catch((error) => {
          this.errors = error?.response?.data?.data;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
        });
    },
    async updateWallet(id: number, body: WalletPayload) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .post(api.wallet.update(id), body)
        .then((response) => {
          this.loadingStatus = false;
          toast.success(response.data.message || "Updated");
        })
        .catch((error) => {
          this.errors = error?.response?.data?.data;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
        });
    },
    async changeWalletStatus(id: number, is_enabled: boolean) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .post(api.wallet.updateWalletStatus(id), { is_enabled: is_enabled })
        .then((response) => {
          this.loadingStatus = false;
        })
        .catch((error) => {
          this.errors = error?.response?.data?.data;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
        });
    },
    async deleteWallet(id: number) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .delete(api.wallet.delete(id))
        .then((response) => {
          this.loadingStatus = false;
          toast.success(response.data.message || "Deleted");
        })
        .catch((error) => {
          this.errors = error?.response?.data?.data;
          this.loadingStatus = false;
          toast.error(error.response?.data?.message || "Error");
        });
    },
  },
});
