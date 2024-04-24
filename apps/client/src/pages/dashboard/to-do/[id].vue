<script lang="ts" setup>
import { useRoute } from 'vue-router';

const toDoId = useRoute().params.id;
</script>

<template>
  <div class="flex flex-col">
    <Header />
    {{ toDoId }}
  </div>
</template>
