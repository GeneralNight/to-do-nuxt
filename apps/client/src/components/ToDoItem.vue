<script lang="ts" setup>
import { ToDoItem } from '@libs/models';
import useBackendAPI from '../composables/useBackendAPI';
const props = defineProps<{
  toDoId: string;
  item: ToDoItem;
}>();

const emits = defineEmits<{
  (e: 'refresh'): void;
}>();

const removing = ref(false);
const errorRemoving = ref(false);
const updating = ref(false);
const errorUpdating = ref(false);

const removeItem = async () => {
  if (removing.value || updating.value) return;
  removing.value = true;
  errorRemoving.value = false;
  try {
    await useBackendAPI.deleteToDoItem(props.toDoId, props.item.id);
    emits('refresh');
  } catch (error) {
    errorRemoving.value = true;
  } finally {
    removing.value = false;
  }
};

const handleCheckItem = async () => {
  if (removing.value || updating.value) return;
  updating.value = true;
  errorUpdating.value = false;
  try {
    const updatedItem = props.item;
    delete updatedItem.createdAt;
    delete updatedItem.updatedAt;
    await useBackendAPI.updateToDoItem(props.toDoId, props.item.id, {
      ...updatedItem,
      checked: !props.item.checked,
    });
    emits('refresh');
  } catch (error) {
    errorUpdating.value = true;
  } finally {
    updating.value = false;
  }
};
</script>

<template>
  <div
    class="flex items-center gap-4 bg-white rounded-lg shadow-md px-4 py-2"
    :class="{
      'pointer-events-none': removing || updating,
    }"
  >
    <button
      class="w-6 h-6 rounded-md flex items-center justify-center border border-black/50"
      :class="{
        'bg-[#00ce5d] !border-[#00ce5d]': item.checked,
      }"
      @click="handleCheckItem()"
    >
      <img src="~/assets/imgs/check.svg" class="w-4" />
    </button>
    <span class="w-full font-semibold">{{ item.body }}</span>
    <button class="w-4" @click="removeItem()">
      <img src="~/assets/imgs/trash.svg" />
    </button>
  </div>
</template>
