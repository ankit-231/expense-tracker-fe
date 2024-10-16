import { defineStore } from "pinia";
import client from "@/core/services/client";
import { api } from "@/core/api-endpoints/api";
import type { UserMe, UserDetail, UserPayload } from "@/core/dtos/user";
import toast from "@/core/services/toast";
// import { getFormData } from '@/core/services/utilities'
import jwtServices from "@/core/services/jwt-token";
import router from "@/router";

export const useUserStore = defineStore("user", {
  state: () => ({
    errors: null as null | any,
    loadingStatus: false,
    userList: [] as UserDetail[],
    userMe: {} as UserMe,
    currentUserDetail: null as null | UserDetail,
    selectedUserId: null as null | number,
  }),

  getters: {
    getErrors(state) {
      return state.errors;
    },
    getLoadingStatus(state) {
      return state.loadingStatus;
    },
    getUserList(state) {
      return state.userList;
    },
    getUserMe(state) {
      return state.userMe;
    },
    getCurrentUserDetail(state) {
      return state.currentUserDetail;
    },
    getSelectedUserId(state) {
      return state.selectedUserId;
    },
  },

  actions: {
    async fetchUserDetailData(id: string) {
      this.errors = null;
      this.currentUserDetail = null;
      this.loadingStatus = true;
      await client
        .get(api.user.detail.replace("{:id}", id))
        .then((response) => {
          this.currentUserDetail = response.data.data;
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

    async fetchUserMe(id: string) {
      this.errors = null;
      // this.userMe = null;
      this.loadingStatus = true;
      await client
        .get(api.user.detail.replace("{:id}", id))
        .then((response) => {
          this.userMe = response.data.data;
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

    async createUser(body: UserPayload) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .post(api.user.create, body)
        .then((response) => {
          this.loadingStatus = false;
          toast.add({
            severity: "success",
            summary: "Success",
            detail: response.data.message || "Created",
            life: 3000,
          });
          router.push({ name: "users.list" });
        })
        .catch((error) => {
          this.errors = error?.response?.data?.data;
          this.loadingStatus = false;
          toast.add({
            severity: "error",
            summary: "Error",
            detail: error.response?.data?.message || "Error",
            life: 3000,
          });
        });
    },
    async editUser(id: string, body: UserPayload) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .post(api.user.edit(id), body)
        .then((response) => {
          this.loadingStatus = false;
          toast.add({
            severity: "success",
            summary: "Success",
            detail: response.data.message || "editd",
            life: 3000,
          });
          // router.push({ name: "user" });
          router.push({ name: "users.list" });
        })
        .catch((error) => {
          this.errors = error?.response?.data?.data;
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
