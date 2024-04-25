<script lang="ts" setup>
import AddToDoModal from '../../components/AddToDoModal.vue';
import ToDoCard from '../../components/ToDoCard.vue';

const showModalAddToDo = ref(false);
</script>

<template>
  <div class="flex flex-col w-full">
    <Header />
    <div class="flex flex-col w-full pt-10 px-16 gap-10">
      <span class="text-3xl font-semibold">Seus To Dos lhe aguardam</span>
      <div class="grid grid-cols-5 gap-4">
        <div v-for="v in [1, 2, 3, 4, 5]" class="col-span">
          <ToDoCard />
        </div>
        <div class="col-span">
          <ToDoCard :add="true" @add="showModalAddToDo = true" />
        </div>
      </div>
      <AddToDoModal v-if="showModalAddToDo" @close="showModalAddToDo = false" />
    </div>
  </div>
</template>
