<script lang="ts" setup></script>

<template>
  <div
    class="flex flex-col items-center justify-center bg-white shadow-md rounded-2xl p-8 gap-6"
  >
    <span class="font-semibold text-2xl">Account created successfully!</span>
    <div class="flex flex-col gap-2 items-center">
      <span class="">You will be redirected to dashboard automatically.</span>
      <span class="">
        Or make Login
        <NuxtLink to="/" class="text-[#00ce5d] underline">here</NuxtLink>
      </span>
    </div>
  </div>
</template>
