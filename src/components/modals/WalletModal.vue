<template>
  <div class="grid grid-cols-3 gap-2">
    <div v-for="wallet, index in getWalletList" :key="wallet.id"
      class="mt-3 border-2 border-dashed border-surface p-1 rounded-sm ">
      <div class="rounded-sm p-4 text-white h-full"
        :class="{ 'bg-cyan-500': wallet.is_enabled, 'bg-gray-500': !wallet.is_enabled }">
        <div class="flex justify-between">
          <InputText @keydown.esc="stopEditing" class="w-full" :invalid="!!errors?.name"
            v-if="isWalletBeingEdited(wallet)" placeholder="Wallet Name" type="text" v-model="name" />

          <!-- Icon Chooser -->
          <div v-else class="text-xl font-bold flex items-center gap-3">
            <IconChooser v-if="getIconList" :icons="getIconList" v-model="selectedWalletIcon" />
            <!-- <WalletIcon v-tooltip.top="'Click to change icon'" class="hover:cursor-pointer"
              :icon-class="wallet.icon || ''" font-size="20px" color="white" />  --><span>{{ wallet.name }}</span>

          </div>
          <div v-if="!(isWalletBeingEdited(wallet))"
            v-tooltip.top="wallet.is_enabled ? 'Click to Disable Wallet' : 'Click to Enable Wallet'"
            @click="changeWalletStatus(wallet)"
            class="border-2 border-dashed border-surface rounded-full p-2 h-10 w-10 text-center cursor-pointer hover:bg-cyan-600 transition-colors"
            :class="{ 'bg-green-600': wallet.is_enabled, 'bg-gray-600': !wallet.is_enabled }">
            <input type="checkbox" v-model="wallet.is_enabled" class="hidden" />
            <div>
              <i class="pi pi-check text-xl" v-if="wallet.is_enabled"></i>
              <i class="pi pi-times text-xl" v-else></i>
            </div>
          </div>
        </div>
        <div>
          <div>
            <span>Initial Amount: </span>
            <span v-if="isWalletBeingEdited(wallet)">
              <InputText @keydown.esc="stopEditing" class="w-full" :invalid="!!errors?.initial_amount"
                v-model="initial_amount" placeholder="Initial Amount" type="text" />
            </span>
            <span v-else>
              {{ getUserCurrency }} {{ wallet.initial_amount }}
            </span>

          </div>
          <div class="flex justify-between">
            <div></div>
            <div>

              <i v-if="isWalletBeingEdited(wallet)" v-tooltip.top="'Update Wallet'" @click="handleEditWallet(wallet)"
                class="pi pi-check hover:cursor-pointer"></i>
              <div class="flex" v-else>
                <i @click="handleEditClick(wallet)" v-tooltip.top="'Edit Wallet'"
                  class="pi pi-pencil mr-2 hover:cursor-pointer"></i>
                <i @click="handleDeleteWallet(wallet)" v-tooltip.top="'Delete Wallet'"
                  class="pi pi-trash mr-2 text-red-400 hover:cursor-pointer"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Add Wallet -->
    <div class="mt-3 border-2 border-dashed border-surface p-1 rounded-sm ">
      <div class="bg-cyan-600 rounded-sm p-4 h-full text-white flex justify-center items-center">
        <div class="relative" v-if="addingWallet">
          <i v-tooltip.top="'Add Wallet'" @click="handleAddWallet"
            class="pi pi-check absolute top-0 right-0 hover:cursor-pointer"></i>
          Name:
          <InputText :invalid="!!errors?.name" placeholder="Wallet Name" type="text" v-model="name" />
          Initial Amount:
          <InputText :invalid="!!errors?.initial_amount" v-model="initial_amount" placeholder="Initial Amount"
            type="text" />
        </div>
        <div v-else>
          <Button @click="handleAddClick" v-tooltip.top="'Add a wallet'" icon="pi pi-plus" severity="success" rounded
            aria-label="User" />
        </div>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue';
import type { WalletDetail } from '@/core/dtos/wallet';
import { useAuthStore } from '@/stores/auth/auth';
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { walletCreateSchema } from '@/core/schemas/general';
import WalletIcon from '@/components/wallet/WalletIcon.vue';
import IconChooser from '@/components/wallet/IconChooser.vue';
import type { IconDetail } from '@/core/dtos/general';
import { useWalletStore } from '@/stores/wallet/wallet';
import { useCoreStore } from '@/stores/core/core';

let { values, errors, handleSubmit, defineField, setErrors, setValues, validate } = useForm({
  validationSchema: walletCreateSchema,
});

const [initial_amount, isActiveAttrs] = defineField('initial_amount');
const [name, nameAttrs] = defineField('name');

const authStore = useAuthStore();
const walletStore = useWalletStore();
const coreStore = useCoreStore();

const { getUserCurrency } = storeToRefs(authStore);
const { getWalletList } = storeToRefs(walletStore);
const { getIconList } = storeToRefs(coreStore);

const emit = defineEmits(['walletStatusChanged', 'editWallet', 'addWallet', 'deleteWallet']);

const props = defineProps({
})

const selectedWalletIcon = ref<IconDetail | null>(null)

onMounted(() => {
  selectedWalletIcon.value = getIconList.value ? getIconList.value[0] : null
})

const addingWallet = ref(false)

const handleAddClick = () => {
  addingWallet.value = true
  stopEditing()
  setValues({
    name: '',
    initial_amount: 0
  })
}

const showIconChooser = ref(false)

const stopEditing = () => {
  walletEditingId.value = null
}

const isWalletBeingEdited = (wallet: WalletDetail) => {
  return walletEditingId.value === wallet.id
}

const changeWalletStatus = (wallet: WalletDetail) => {
  wallet.is_enabled = !wallet.is_enabled
  emit('walletStatusChanged', wallet)
}

const walletEditingId = ref<number | null>(null)

const handleEditWallet = async (wallet: WalletDetail) => {
  handleSubmit
  stopEditing()
  wallet.initial_amount = initial_amount.value
  wallet.name = name.value
  console.log(wallet)
  emit('editWallet', wallet)

}

const handleAddWallet = () => {
  let result = handleSubmit(async (values) => {
    let payload = {
      name: values.name,
      initial_amount: values.initial_amount
    }
    stopEditing()
    addingWallet.value = false
    console.log(payload)
    emit('addWallet', payload)
  })
  result()
}

const handleEditClick = (wallet: WalletDetail) => {
  walletEditingId.value = wallet.id
  name.value = wallet.name
  initial_amount.value = wallet.initial_amount
}

const handleDeleteWallet = (wallet: WalletDetail) => {
  emit('deleteWallet', wallet)
}


</script>