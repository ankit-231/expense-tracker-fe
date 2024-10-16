import app from "@/main";
import type { ToastMessageOptions } from "primevue/toast";

const getToast = () => app.config.globalProperties.$toast;
const toast = {
  add(msg: ToastMessageOptions) {
    getToast().add(msg);
  },
  success(msg: string) {
    let detail = msg || "Success";
    getToast().add({
      severity: "success",
      summary: "Success",
      detail: detail,
      life: 3000,
    });
  },
  error(msg: string) {
    let detail = msg || "Error";
    getToast().add({
      severity: "error",
      summary: "Error",
      detail: detail,
      life: 3000,
    });
  },
  info(msg: string | undefined) {
    let detail = msg || "Info";
    getToast().add({
      severity: "info",
      summary: "Info",
      detail: detail,
      life: 3000,
    });
  },
  warn(msg: string) {
    let detail = msg || "Warn";
    getToast().add({
      severity: "warn",
      summary: "Warn",
      detail: detail,
      life: 3000,
    });
  },
};
export default toast;
