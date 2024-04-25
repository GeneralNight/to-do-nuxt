<script lang="ts" setup>
import { ToDoDoc } from '@libs/models';
import { onMounted, ref } from 'vue';
import AddToDoModal from '../../components/AddToDoModal.vue';
import ToDoCard from '../../components/ToDoCard.vue';
import useBackendAPI from '../../composables/useBackendAPI';

const showModalAddToDo = ref(false);
const loadingList = ref(false);
const errorLoadingList = ref(false);
const list = ref<ToDoDoc[]>([]);

const loadItems = async () => {
  errorLoadingList.value = false;
  loadingList.value = true;
  try {
    list.value = await useBackendAPI.listToDo();
  } catch (error) {
    errorLoadingList.value = true;
  } finally {
    loadingList.value = false;
  }
};

onMounted(() => {
  loadItems();
});
</script>

<template>
  <div class="flex flex-col w-full">
    <Header />
    <div class="flex flex-col w-full pt-10 px-16 gap-10">
      <span class="text-3xl font-semibold">Seus To Dos lhe aguardam</span>
      <div class="grid grid-cols-5 gap-4">
        <div v-for="(item, index) in list" class="col-span">
          <ToDoCard :item="item" @refresh="() => loadItems()" />
        </div>
        <div class="col-span">
          <ToDoCard :add="true" @add="showModalAddToDo = true" />
        </div>
      </div>
      <AddToDoModal
        v-if="showModalAddToDo"
        @close="showModalAddToDo = false"
        @refresh="() => loadItems()"
      />
    </div>
  </div>
</template>
