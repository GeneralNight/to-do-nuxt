<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AddToDoItem from '../../../components/addToDoItem.vue';
import useBackendAPI from '../../../composables/useBackendAPI';

const toDoId = ref(useRoute().params.id);

const loadingItems = ref(false);
const errorLoadingItems = ref(false);
const items = ref<ToDoItem[]>([]);

const loadItems = async () => {
  loadingItems.value = true;
  errorLoadingItems.value = false;
  try {
    items.value = await useBackendAPI.getToDoItems(toDoId.value);
  } catch (error) {
    errorLoadingItems.value = true;
  } finally {
    loadingItems.value = false;
  }
};

onMounted(() => {
  loadItems();
});
</script>

<template>
  <div class="flex flex-col">
    <Header />
    <div class="flex flex-col w-full pt-10 px-16 gap-10 items-center">
      <div class="min-w-[300px] max-w-[640px] w-full">
        <AddToDoItem :to-do-id="toDoId" />
      </div>
      <div class="flex flex-col gap-4 w-full" />
    </div>
  </div>
</template>
