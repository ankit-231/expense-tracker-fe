<template>
  <div>
    <div class="bg-white shadow-lg rounded-md p-4">
      <h1 class="text-3xl font-bold mb-4">Your Wallets/Accounts</h1>
      <WalletModal :wallets="getWalletList" @wallet-status-changed="changeWalletStatus" @edit-wallet="editWallet"
        @add-wallet="addWallet" @delete-wallet="deleteWallet" :icons="getIconList" v-if="getIconList" />
    </div>
  </div>
</template>

<script setup lang="ts">
import WalletModal from '@/components/modals/WalletModal.vue';
import type { WalletDetail, WalletPayload } from '@/core/dtos/wallet';
import { useWalletStore } from '@/stores/wallet/wallet';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import customDialog from '@/core/services/dialog';
import { useCoreStore } from '@/stores/core/core';

const deleteWallet = async (wallet: WalletDetail) => {
  customDialog.show({
    title: "Confirmation",
    message: "Are you sure you want to proceed?",
    onConfirm: async () => {
      await walletStore.deleteWallet(wallet.id)
      await walletStore.fetchWalletList()
    },
  });
}

const walletStore = useWalletStore();
const { getWalletList } = storeToRefs(walletStore);

const coreStore = useCoreStore();
const { getIconList } = storeToRefs(coreStore);

onMounted(async () => {
  await walletStore.fetchWalletList()
  await coreStore.fetchIconList()

})

const changeWalletStatus = async (wallet: WalletDetail) => {
  console.log(wallet)
  await walletStore.changeWalletStatus(wallet.id, wallet.is_enabled)
}

const editWallet = async (wallet: WalletDetail) => {
  let payload: WalletPayload = {
    name: wallet.name,
    initial_amount: wallet.initial_amount
  }
  await walletStore.updateWallet(wallet.id, payload)
}

const addWallet = async (payload: WalletPayload) => {
  await walletStore.createWallet(payload)
  await walletStore.fetchWalletList()
}

</script>

<style></style>
