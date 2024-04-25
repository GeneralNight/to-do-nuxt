<script lang="ts" setup>
import useBackendAPI from '../composables/useBackendAPI';

const props = defineProps<{
  toDoId: string;
}>();

const emits = defineEmits<{
  (e: 'refresh'): void;
}>();

const itemBody = ref('');
const adding = ref(false);
const errorAdding = ref(false);

const addToDo = async () => {
  adding.value = true;
  errorAdding.value = false;
  try {
    await useBackendAPI.createToDoItem(props.toDoId, {
      body: itemBody.value,
    });
    emits('refresh');
    itemBody.value = '';
  } catch (error) {
    errorAdding.value = true;
  } finally {
    adding.value = false;
  }
};
</script>

<template>
  <form class="flex items-center gap-4 w-full" @submit.prevent="addToDo()">
    <input
      v-model="itemBody"
      type="text"
      class="defaultInput w-full"
      required
    />
    <button
      type="submit"
      class="bg-[#00ce5d] rounded-lg px-4 py-2 text-white font-semibold"
    >
      <span v-if="!adding">Adicionar</span>
      <div
        v-else
        class="w-6 h-6 border-4 border-white border-l-transparent rounded-full animate-spin"
      />
    </button>
  </form>
</template>
