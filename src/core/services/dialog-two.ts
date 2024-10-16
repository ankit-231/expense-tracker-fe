import app from "@/main";

const getDialog = () => app.config.globalProperties.$dialog;

const dialog = {
  show(title: string, content: string) {
    const dialogInstance = getDialog();
    dialogInstance.open({
      header: title,
      content: content,
      footer: this.defaultFooter(dialogInstance),
    });
  },
  confirm(
    title: string,
    content: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) {
    const dialogInstance = getDialog();
    dialogInstance.open({
      header: title,
      content: content,
      footer: this.confirmFooter(onConfirm, onCancel),
    });
  },
  defaultFooter(dialogInstance: any) {
    return [
      {
        label: "Close",
        icon: "pi pi-times",
        command: () => {
          dialogInstance.close();
        },
      },
    ];
  },
  confirmFooter(onConfirm: () => void, onCancel?: () => void) {
    return [
      {
        label: "Yes",
        icon: "pi pi-check",
        command: () => {
          onConfirm();
        },
      },
      {
        label: "No",
        icon: "pi pi-times",
        command: () => {
          if (onCancel) {
            onCancel();
          }
        },
      },
    ];
  },
};

export default dialog;
