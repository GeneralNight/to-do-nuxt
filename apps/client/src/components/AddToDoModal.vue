<script lang="ts" setup>
import { ToDoDoc } from '@libs/models';
import useBackendAPI from '../composables/useBackendAPI';
import useFirebase from '../composables/useFirebase';

const emits = defineEmits<{
  (e: 'close'): void;
  (e: 'refresh'): void;
}>();

const addingDoc = ref(false);
const errorAddingDoc = ref(false);
const docName = ref('');

const addDoc = async () => {
  if (invalidDoc()) return;
  errorAddingDoc.value = false;
  addingDoc.value = true;
  try {
    const data: Partial<ToDoDoc> = {
      ownerId: useFirebase.user().value?.uid ?? '',
      title: docName.value,
    };
    await useBackendAPI.createToDo(data);
    emits('refresh');
    emits('close');
  } catch (error) {
    errorAddingDoc.value = true;
  } finally {
    addingDoc.value = false;
  }
};

const invalidDoc = () => {
  return !docName.value.length;
};
</script>

<template>
  <div
    class="flex flex-col bg-black/50 backdrop-blur-sm pt-20 items-center absolute inset-0 z-50"
  >
    <form
      class="flex flex-col bg-white rounded-2xl shadow-lg w-full max-w-[640px]"
      @submit.prevent="addDoc()"
    >
      <div class="flex justify-between items-center w-full px-4 py-5">
        <span class="font-semibold">Novo Doc de To Do</span>
        <button @click="emits('close')">
          <img src="~/assets/imgs/close.svg" class="w-4" />
        </button>
      </div>
      <div class="flex flex-col px-4 py-10 gap-2">
        <input
          v-model="docName"
          type="text"
          class="defaultInput"
          placeholder="Nome do doc"
          required
        />
        <span v-if="errorAddingDoc" class="text-sm text-red-700 font-semibold"
          >Error on create to do</span
        >
      </div>
      <div class="flex justify-end py-2 gap-4 px-4 py-4">
        <button
          class="bg-[#c73a3a] rounded-lg px-4 py-2 text-white font-semibold"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="bg-[#00ce5d] rounded-lg px-4 py-2 text-white font-semibold"
        >
          Adicionar
        </button>
      </div>
    </form>
  </div>
</template>
