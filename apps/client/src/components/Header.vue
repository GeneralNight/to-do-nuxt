<script lang="ts" setup>
const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);
</script>

<template>
  <div class="flex items-center justify-end px-10 py-6 bg-white shadow-md">
    <div class="flex flex-col gap-1 items-end">
      <span>{{ `Olá, ${profile.name}` }}</span>
      <button
        class="text-red-700 font-semibold text-sm"
        @click="profileStore.logout()"
      >
        Logout
      </button>
    </div>
  </div>
</template>
