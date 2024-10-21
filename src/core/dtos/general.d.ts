import type { RouteLocationRaw } from "vue-router";

export type LoginPayload = {
  username: string;
  password: string;
};


export type RefreshTokenPayload = {
  refreshToken: string;
};



export interface SideBarNavItemType {
  label: string;
  to?: RouteLocationRaw;
  icon: string;
  showToAdmin: boolean;
  showToStaff: boolean;
  children?: { label: string; to: RouteLocationRaw; icon: string }[];
}

export type ToastType = "success" | "warning" | "danger" | "info";

export interface To {
  id: number;
  message: string;
  type: "success" | "warning" | "danger" | "info";
}

export interface PriorityColors {
  [key: string]: string;
}

export interface BackendErrors {
  [key: string]: string[];
}
export interface Breadcrumb {
  logo?: string;
  label: string;
  url: string;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface IconDetail {
  id: number;
  name: string;
  class_name: string;
}
