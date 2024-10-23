import { onMounted, onUnmounted } from "vue";

export function useKeyboardShortcut(
  key: string, // key to listen for
  callback: () => void, // callback to execute
  modifiers: { ctrl?: boolean } = {} // optional modifiers like Ctrl
) {
  const handleKeydown = (event: KeyboardEvent) => {
    // Ignore if typing in an input, textarea, or any contenteditable element
    const target = event.target as HTMLElement;
    const isTyping =
      ["INPUT", "TEXTAREA"].includes(target.tagName) ||
      target.isContentEditable;

    // check if the correct key and modifier (Ctrl) are pressed
    if (!isTyping && event.key.toLowerCase() === key.toLowerCase()) {
      if (modifiers.ctrl && !event.ctrlKey) return; // Check for Ctrl key if specified
      callback();
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
  });
}
