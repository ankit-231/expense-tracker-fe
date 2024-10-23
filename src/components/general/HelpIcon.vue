<template>
  <div>
    <Button v-tooltip.top="'Help'" class="p-button-help" @click="showHelp">
      <i class="pi pi-question-circle"></i>
    </Button>
    <ConfirmDialog group="headless">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <table class="border-t border-b w-full rounded-sm overflow-hidden">
          <thead>
            <tr>
              <th class="w-1/4">Shortcut</th>
              <th class="text-sm text-gray-600 dark:text-gray-400">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="w-1/4">
                <kbd>t</kbd>
              </td>
              <td class="text-sm text-gray-600 dark:text-gray-400">
                Add Transaction on Transaction Page
              </td>
            </tr>
          </tbody>
        </table>
      </template>

    </ConfirmDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()
const requireConfirmation = () => {
  confirm.require({
    group: 'headless',
    header: 'Keyboard Shortcuts',
    message: 'Please confirm to proceed.',
    accept: () => {
      // 
    },
    reject: () => {
      // 
    }
  });
};

const showHelp = () => {
  confirm.require({
    group: 'headless',
    message: 'This is a help message',
    header: 'Help',
    icon: 'pi pi-info-circle',
    accept: () => {
      // confirmation callback
    },
    reject: () => {
      // rejection callback
    }
  })
}
</script>

<style scoped>
.p-button-help {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
}

table {
  border-collapse: collapse;
  /* Ensures borders are merged */
}

th,
td {
  padding: 10px;
  /* Adjust as needed */
}
</style>
