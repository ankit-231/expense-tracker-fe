import { defineStore } from "pinia";
import client from "@/core/services/client";
import { api } from "@/core/api-endpoints/api";
import type { IconDetail } from "@/core/dtos/general";
import toast from "@/core/services/toast";
// import { getFormData } from '@/core/services/utilities'
import jwtServices from "@/core/services/jwt-token";
import router from "@/router";

export const useCoreStore = defineStore("core", {
  state: () => ({
    errors: null as null | any,
    loadingStatus: false,
    iconList: [] as IconDetail[],
  }),

  getters: {
    getErrors(state) {
      return state.errors;
    },
    getLoadingStatus(state) {
      return state.loadingStatus;
    },
    getIconList(state) {
      return state.iconList;
    },
  },

  actions: {
    async fetchIconList() {
      this.errors = null;
      this.loadingStatus = true;
      this.iconList = [];
      await client
        .get(api.core.icon.list)
        .then((response) => {
          this.iconList = response.data.data;
          // console.log(iconList);
          this.loadingStatus = false;
        })
        .catch((error) => {
          this.errors = error;
          this.loadingStatus = false;
          toast.add({
            severity: "error",
            summary: "Error",
            detail: error.response?.data?.message || "Error",
            life: 3000,
          });
        });
    },
  },
});
