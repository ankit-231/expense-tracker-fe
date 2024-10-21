/* Composition API */
import { useDialog } from "primevue/usedialog";

const dialog = useDialog();

dialog.open({
  header: "Header",
  content: "Content",
  footer: "Footer",
})