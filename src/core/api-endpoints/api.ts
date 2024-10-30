import type { TransactionType } from "@/core/constants/general";

export const api = {
  auth: {
    getToken: "users/token/",
    refreshToken: "users/token/refresh/",
  },
  user: {
    userDetail: "users/self/",
    // create: "user/create/",
    // edit: (id: string) => `user/update/${id}/`,
    // delete: "user/delete/{:id}/",
    // detail: "user/get/{:id}/",
    // self: "user/me/{:id}/",
    financialDetail: "users/financial-detail/",
  },
  core: {
    icon: {
      list: "core/icons/list/",
    },
  },
  wallet: {
    detail: (walletId: number) => `wallets/detail/${walletId}/`,
    create: "wallets/create/",
    list: (wallet_type: string) => `wallets/list/${wallet_type}/`,
    update: (walletId: number) => `wallets/update/${walletId}/`,
    updateWalletStatus: (walletId: number) =>
      `wallets/update-status/${walletId}/`,
    delete: (walletId: number) => `wallets/delete/${walletId}/`,
  },
  transaction: {
    detail: (transactionId: number) => `transactions/detail/${transactionId}/`,
    create: "transactions/create/",
    list: "transactions/list/",
    listPaginated: "transactions/list/paginated/",
    update: (transactionId: number) => `transactions/update/${transactionId}/`,
    delete: (transactionId: number) => `transactions/delete/${transactionId}/`,
    category: {
      list: (category_type: TransactionType) =>
        `transactions/category/list/${category_type}/`,
      create: "transactions/category/create/",
      update: (category_id: number) =>
        `transactions/category/update/${category_id}/`,
      delete: (category_id: number) =>
        `transactions/category/delete/${category_id}/`,
    },
    statistics: {
      monthly: (year: number, month: number) =>
        `transactions/statistics/monthly/${year}/${month}/`,
    },
  },
};
