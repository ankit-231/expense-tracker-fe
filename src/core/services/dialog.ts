import { reactive } from "vue";
import app from "@/main";

const dialogState = reactive({
  visible: false,
  title: "",
  message: "",
  onConfirm: null as (() => void) | null,
});

const getDialog = () => app.config.globalProperties.$dialog;

const customDialog = {
  show(options: { title: string; message: string; onConfirm?: () => void }) {
    dialogState.visible = true;
    dialogState.title = options.title;
    dialogState.message = options.message;
    dialogState.onConfirm = options.onConfirm || null;
  },
  hide() {
    dialogState.visible = false;
  },
  confirm() {
    if (dialogState.onConfirm) {
      dialogState.onConfirm();
    }
    dialogState.visible = false;
  },
};

export default customDialog;
export { dialogState };
