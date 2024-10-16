import { defineStore } from "pinia";
import client from "@/core/services/client";
import { api } from "@/core/api-endpoints/api";
import type {
  TokenDetail,
  TokenPayload,
  PriorityDetail,
  PreviousCurrentNextToken,
  TokenStatus,
  TokenStatusParam,
  TokenFilterParam,
  TokenReferPayload,
  TokenCountDetail,
} from "@/core/dtos/token";
import toast from "@/core/services/toast";
// import { getFormData } from '@/core/services/utilities'
import jwtServices from "@/core/services/jwt-token";
import router from "@/router";

export const useTokenStore = defineStore("token", {
  state: () => ({
    errors: null as null | any,
    loadingStatus: false,
    tokenList: [] as TokenDetail[],
    displayList:{} as any,
    currentToken: {} as TokenDetail,
    tokenDetail: {} as TokenDetail,
    priorityList: [] as PriorityDetail[],
    previousCurrentNextToken: {} as PreviousCurrentNextToken,
    tokenCountDetail: {} as TokenCountDetail,
  }),

  getters: {
    getErrors(state) {
      return state.errors;
    },
    getLoadingStatus(state) {
      return state.loadingStatus;
    },
    getTokenList(state) {
      return state.tokenList;
    },
    getDisplayList(state) {
      return state.displayList;
    },
    getCurrentToken(state) {
      return state.currentToken;
    },
    getTokenDetail(state) {
      return state.tokenDetail;
    },
    getPriorityList(state) {
      return state.priorityList;
    },
    getPreviousCurrentNextToken(state) {
      return state.previousCurrentNextToken;
    },
    getTokenCountDetail(state) {
      return state.tokenCountDetail;
    },
  },

  actions: {
    async fetchTokenList(
      departmentId: number,
      params: TokenFilterParam | {} = {}
    ) {
      this.errors = null;
      this.loadingStatus = true;
      this.tokenList = [];

      await client
      .get(api.token.list(departmentId), { params: params })
        .then((response) => {
          this.tokenList = response.data.data;
          // console.log(tokenList);
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
    async fetchDisplayList(
      departmentId: number,
      counterId:number,
      params: TokenFilterParam | {} = {}
    ) {
      this.errors = null;
      this.loadingStatus = true;
      this.displayList = [];

      await client
        .get(api.token.currentServingToken(departmentId,counterId))
        .then((response) => {
          this.displayList = response.data.data;
          // console.log(tokenList);
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

    async createtoken(body: TokenPayload) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .post(api.token.create, body)
        .then((response) => {
          this.loadingStatus = false;
          toast.add({
            severity: "success",
            summary: "Success",
            detail: response.data.message || "Created",
            life: 3000,
          });
          // router.push({ name: "token" });
        })
        .catch((error) => {
          this.errors = error?.response?.data;
          this.loadingStatus = false;
          toast.add({
            severity: "error",
            summary: "Error",
            detail: error.response?.data?.message || "Error",
            life: 3000,
          });
        });
    },
    async fetchPriorityList() {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .get(api.priority.list)
        .then((response) => {
          this.priorityList = response.data.data;
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
    async fetchPreviousCurrentNextToken(departmentId: number) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .get(api.token.previousCurrentNext(departmentId))
        .then((response) => {
          this.previousCurrentNextToken = response.data.data;
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

    async processCurrentToken(
      counterId: number,
      params: { status: TokenStatusParam }
    ) {
      this.errors = null;
      this.loadingStatus = true;
      return await client
        .get(api.token.processToken(counterId), { params: params })
        .then((response) => {
          this.loadingStatus = false;
          toast.add({
            severity: "success",
            summary: "Success",
            detail: response.data.message || "Success",
            life: 3000,
          });
          return true;
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
          return false;
        });
    },
    async startGeneratingToken(counterId: number) {
      this.errors = null;
      this.loadingStatus = true;
      return await client
        .get(api.token.startGeneratingToken(counterId))
        .then((response) => {
          this.loadingStatus = false;
          toast.add({
            severity: "success",
            summary: "Success",
            detail: response.data.message || "Success",
            life: 3000,
          });
          return true;
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
          return false;
        });
    },
    async referToken(body: TokenReferPayload) {
      this.errors = null;
      this.loadingStatus = true;
      await client
        .post(api.token.refer, body)
        .then((response) => {
          this.loadingStatus = false;
          toast.add({
            severity: "success",
            summary: "Success",
            detail: response.data.message || "Success",
            life: 3000,
          });
          // router.push({ name: "token" });
        })
        .catch((error) => {
          this.errors = error?.response?.data;
          this.loadingStatus = false;
          toast.add({
            severity: "error",
            summary: "Error",
            detail: error.response?.data?.message || "Error",
            life: 3000,
          });
        });
    },

    async fetchTokenCountDetail(departmentId: number, counterId: number) {
      this.errors = null;
      this.loadingStatus = true;
      this.tokenCountDetail = {} as TokenCountDetail;
      await client
        .get(api.token.tokenCountDetail, {
          params: { department_id: departmentId, counter_id: counterId },
        })
        .then((response) => {
          this.tokenCountDetail = response.data.data;
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
