<script lang='ts' setup>

</script>

<template>
  <div class="flex flex-col w-full h-full min-w-screen min-h-screen items-center justify-center bg-[#f6f6f6]">
    <div class="flex flex-col gap-8 p-6 rounded-2xl shadow-md min-w-[300px] bg-white">
      <span class="text-center font-semibold text-xl">Login</span>
      <div class="flex flex-col gap-4 w-full">
        <input
          type="email"
          class="defaultInput"
          placeholder="Email"
        >
        <div class="flex flex-col gap-2 items-end w-full">
          <input
            type="password"
            class="defaultInput w-full"
            placeholder="Password"
          >
          <button class="text-sm">
            Forgot password?
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-4 items-center">
        <button class="bg-[#00ce5d] text-white font-semibold rounded-lg py-2 w-full">
          Login
        </button>
        <NuxtLink
          to="/signup"
          class="text-sm "
        >
          Signup
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
