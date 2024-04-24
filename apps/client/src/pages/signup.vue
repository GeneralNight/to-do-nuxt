<script lang='ts' setup>

const form = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
})

const signup = () => {
  if(!isFormValid()) {
    return
  }
}

const isFormValid = () => {

  if(form.value.password.length<5||form.value.confirmPassword.length<5) {
    return false
  }

  if(form.value.password!==form.value.confirmPassword) {
    return false
  }

  return true
}

</script>

<template>
  <div class="flex flex-col w-full h-full min-w-screen min-h-screen items-center justify-center bg-[#f6f6f6]">
    <form
      class="flex flex-col gap-8 p-6 rounded-2xl shadow-md min-w-[300px] bg-white"
      @submit.prevent="signup()"
    >
      <span class="text-center font-semibold text-xl">Signup</span>
      <div class="flex flex-col gap-4 w-full">
        <input
          v-model="form.name"
          type="text"
          class="defaultInput"
          placeholder="Name"
          required
        >
        <input
          v-model="form.email"
          type="email"
          class="defaultInput"
          placeholder="Email"
          required
        >
        <input
          v-model="form.password"
          type="password"
          class="defaultInput "
          placeholder="Password"
          required
        >
        <input
          v-model="form.confirmPassword"
          type="password"
          class="defaultInput"
          placeholder="Confirm password"
          required
        >
      </div>
      <div class="flex flex-col gap-4 items-center">
        <button
          type="submit"
          class="bg-[#00ce5d] text-white font-semibold rounded-lg py-2 w-full"
        >
          Signup
        </button>
        <NuxtLink
          to="/"
          class="text-sm "
        >
          Login
        </NuxtLink>
      </div>
    </form>
  </div>
</template>
