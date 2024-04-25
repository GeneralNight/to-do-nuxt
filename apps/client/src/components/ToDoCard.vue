<script lang="ts" setup>
const props = defineProps<{
  add?: boolean;
}>();

const emits = defineEmits<{
  (e: 'add'): void;
}>();

const addToDo = async () => {
  if (props.add) {
    emits('add');
  }
};
</script>

<template>
  <button
    class="flex flex-col bg-white w-full rounded-2xl shadow-sm min-h-[150px] justify-end hover:brightness-[.98] transition-all duration-[.2s] hover:cursor-pointer hover:scale-[1.02]"
    :class="{
      '!items-center !justify-center': add,
    }"
    @click="addToDo()"
  >
    <img v-if="add" src="~/assets/imgs/add.svg" class="w-10" />
    <div v-if="!add" class="w-full px-4 py-2 border-t border-black/20">
      <span class="font-medium">Teste</span>
    </div>
  </button>
</template>
