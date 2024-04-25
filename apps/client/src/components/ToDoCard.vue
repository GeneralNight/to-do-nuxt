<script lang="ts" setup>
import { ToDoDoc } from '@libs/models';
import useBackendAPI from '../composables/useBackendAPI';
const props = defineProps<{
  item?: ToDoDoc;
  add?: boolean;
}>();

const emits = defineEmits<{
  (e: 'add'): void;
  (e: 'refresh'): void;
}>();

const deletingToDo = ref(false);

const addToDo = async () => {
  if (props.add) {
    emits('add');
  } else {
    navigateTo(`/dashboard/to-do/${props.item.id}`);
  }
};

const deleteToDo = async () => {
  if (!props.add) {
    deletingToDo.value = true;
    try {
      await useBackendAPI.deleteToDo(props.item.id);
      emits('refresh');
    } catch (error) {
      return;
    } finally {
      deletingToDo.value = false;
    }
  }
};
</script>

<template>
  <button
    class="flex flex-col bg-white w-full rounded-2xl shadow-sm min-h-[150px] justify-end hover:brightness-[.98] transition-all duration-[.2s] hover:cursor-pointer hover:scale-[1.02] relative"
    :class="{
      '!items-center !justify-center': add,
      'brightness-75': deletingToDo,
    }"
    @click="addToDo()"
  >
    <button class="w-4 absolute top-4 right-4" @click="deleteToDo()">
      <img v-if="!add" src="~/assets/imgs/trash.svg" />
    </button>
    <img v-if="add" src="~/assets/imgs/add.svg" class="w-10" />
    <div v-if="!add" class="w-full px-4 py-2 border-t border-black/20">
      <span class="font-medium">{{ item.title }}</span>
    </div>
  </button>
</template>
