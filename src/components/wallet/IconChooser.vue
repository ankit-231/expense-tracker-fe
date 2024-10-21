<template>
  <div class="card flex justify-center">
    <div @click="toggle" class="hover:cursor-pointer" v-tooltip.top="tooltipText">
      <slot name="icon">
        <i class="pi pi-wallet"></i>
      </slot>
    </div>

    <Popover ref="op">
      {{ model }}
      <div class="p-2 w-64 flex flex-wrap gap-2">
        <div v-for="icon in icons" @click="model = icon"
          class="hover:cursor-pointer hover:bg-surface-100 p-2 rounded-md"
          :class="{ 'bg-blue-300': icon.id === model?.id }">
          <i :class="icon.class_name"></i>
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import type { IconDetail } from "@/core/dtos/general";
import { ref, watch, type PropType } from "vue";

const props = defineProps({
  showPopover: {
    type: Boolean,
    default: false
  },
  tooltipText: {
    type: String,
    default: 'Choose an icon'
  },
  icons: {
    type: Array as PropType<IconDetail[]>,
    required: true
  }
});



const opBtn = ref<HTMLDivElement>();

const model = defineModel('model')


watch(() => props.showPopover, () => {
  console.log(opBtn.value)
  opBtn.value?.click();
  // if (props.showPopover) {
  //   op.value.show();
  // } else {
  //   op.value.hide();
  // }
});

const op = ref();
const members = ref([
  { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
  { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
  { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
]);

const toggle = (event: Event) => {
  op.value.toggle(event);
}
</script>
