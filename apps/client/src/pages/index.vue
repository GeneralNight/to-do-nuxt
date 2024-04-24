<script lang="ts" setup>
import { signInWithEmailAndPassword } from 'firebase/auth';
import useFirebase from '../composables/useFirebase';

const form = ref({
  email: '',
  password: '',
});

const logging = ref(false);
const loggingFailed = ref(false);

const handleLogin = async () => {
  logging.value = true;
  loggingFailed.value = false;
  try {
    const auth = useFirebase.auth();
    await signInWithEmailAndPassword(
      auth.value,
      form.value.email,
      form.value.password
    );
  } catch (error) {
    loggingFailed.value = true;
    console.log(error);
  } finally {
    logging.value = false;
  }
};
</script>

<template>
  <div
    class="flex flex-col w-full h-full min-w-screen min-h-screen items-center justify-center bg-[#f6f6f6]"
  >
    <form
      class="flex flex-col gap-8 p-6 rounded-2xl shadow-md min-w-[300px] bg-white"
      @submit.prevent="handleLogin()"
    >
      <span class="text-center font-semibold text-xl">Login</span>
      <div class="flex flex-col gap-4 w-full">
        <span v-if="loggingFailed" class="text-center text-red-700 text-sm">{{
          'Invalid credentials, try again'
        }}</span>
        <input
          v-model="form.email"
          type="email"
          class="defaultInput"
          placeholder="Email"
        />
        <div class="flex flex-col gap-2 items-end w-full">
          <input
            v-model="form.password"
            type="password"
            class="defaultInput w-full"
            placeholder="Password"
          />
          <button class="text-sm">Forgot password?</button>
        </div>
      </div>
      <div class="flex flex-col gap-4 items-center">
        <button
          class="bg-[#00ce5d] text-white font-semibold rounded-lg py-2 w-full items-center justify-center flex"
          type="submit"
        >
          <div
            v-if="logging"
            class="w-8 h-8 rounded-full border-4 border-white border-l-transparent animate-spin"
          />
          <span v-else>Login</span>
        </button>
        <NuxtLink to="/signup" class="text-sm"> Signup </NuxtLink>
      </div>
    </form>
  </div>
</template>
