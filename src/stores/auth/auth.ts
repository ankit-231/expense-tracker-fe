import { defineStore } from "pinia";
import client from "@/core/services/client";
import { api } from "@/core/api-endpoints/api";
import type { LoginPayload, RefreshTokenPayload } from "@/core/dtos/general";
import type { UserMe } from "@/core/dtos/user";
import toast from "@/core/services/toast";
// import { getFormData } from '@/core/services/utilities'
import jwtServices from "@/core/services/jwt-token";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    errors: null as null | any,
    loadingStatus: false,
    isAuthenticated: false,
    role: "",
    meData: {} as UserMe,
  }),

  getters: {
    getErrors(state) {
      return state.errors;
    },
    getLoadingStatus(state) {
      return state.loadingStatus;
    },
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    },
    getRole(state) {
      return state.role;
    },
    getUserMe(state) {
      return state.meData;
    },

    getUserCurrency(state) {
      return state.meData?.currency;
    },
  },

  actions: {
    async login(body: LoginPayload, _redirectUrl?: string | null) {
      this.errors = null;
      this.loadingStatus = true;

      await client
        .post(api.auth.getToken, body)
        .then((response) => {
          // this.isAuthenticated = true;
          jwtServices.setToken(response.data.access as string);
          jwtServices.setRefreshToken(response.data.refresh as string);

          // push it to appropriate dashboard
          // router.push({ name: 'home' })

          const message = response.data.message || "Logged In";
          // console.log(response);
          this.loadingStatus = false;
          toast.add({
            severity: "success",
            summary: "Success",
            detail: message,
            life: 3000,
          });
          if (_redirectUrl) {
            console.log("redirecting", _redirectUrl);
            router.push({ path: _redirectUrl });
          } else {
            router.push({ name: "dashboard" });
          }
        })
        .catch((error) => {
          // console.log(error);
          // console.log("error?.response?.data?.detail");
          this.errors = error;
          console.log(error);
          this.loadingStatus = false;
          const message = error?.response?.data?.detail || "There was an error";
          toast.error(message);
        });
    },

    async refreshToken(body: RefreshTokenPayload) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .post(api.auth.getToken, body)
        .then((response) => {
          // this.isAuthenticated = true;
          // console.log("**/***************************");
          jwtServices.setToken(response.data.access as string);
          jwtServices.setRefreshToken(response.data.refresh as string);
          this.loadingStatus = false;
          return response.data;
          // console.log("this.isAuthenticated", this.isAuthenticated);
        })
        .catch((error) => {
          // this.isAuthenticated = false;
          // console.log(error);
          this.errors = error;
          this.loadingStatus = false;
          return error;
          // console.log("this.isAuthenticated", this.isAuthenticated);
        });
    },
    async logout() {
      this.loadingStatus = false;
      try {
        this.loadingStatus = true;

        jwtServices.destroyAllTokens();
        this.isAuthenticated = false;
        // (this.role = ""), console.log("logged out");
        toast.info("Logged Out");

        router.push({ name: "home" });
        this.loadingStatus = false;
      } catch (error: any) {
        this.errors = error;
        this.loadingStatus = false;
      }
    },
    async fetchMeData() {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .get(api.user.userDetail)
        .then((response) => {
          this.meData = response.data.data;
          this.isAuthenticated =
            Boolean(this.meData) && Boolean(response.data.data);
          this.loadingStatus = false;
        })
        .catch((error) => {
          this.isAuthenticated = false;
          this.errors = error;
          this.loadingStatus = false;
        });
    },
  },
});
