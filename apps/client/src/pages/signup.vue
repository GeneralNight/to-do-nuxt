<script lang="ts" setup>
import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthSignUpCpmplete from '../components/auth/AuthSignUpCpmplete.vue';
import useBackendAPI from '../composables/useBackendAPI';
import useFirebase from '../composables/useFirebase';

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const creatingAccount = ref(false);
const accountCreated = ref(false);
const creationAccountFailed = ref(false);
const invalidFields = ref(false);

const signup = async () => {
  creationAccountFailed.value = false;
  creatingAccount.value = true;
  invalidFields.value = false;

  if (!isFormValid()) {
    invalidFields.value = true;
    return;
  }

  try {
    await useBackendAPI.signup({ body: form.value });
    accountCreated.value = true;
    setTimeout(() => {
      handleLogin();
    }, 3000);
  } catch (error) {
    creationAccountFailed.value = true;
  } finally {
    creatingAccount.value = false;
  }
};

const isFormValid = () => {
  if (form.value.password.length < 5 || form.value.confirmPassword.length < 5) {
    return false;
  }

  if (form.value.password !== form.value.confirmPassword) {
    return false;
  }

  return true;
};

const handleLogin = async () => {
  const auth = useFirebase.auth();
  try {
    await signInWithEmailAndPassword(
      auth.value,
      form.value.email,
      form.value.password
    );
  } catch (error) {
    console.log(error);
    // navigateTo('/');
  }
};
</script>

<template>
  <div
    class="flex flex-col w-full h-full min-w-screen min-h-screen items-center justify-center bg-[#f6f6f6]"
  >
    <form
      v-if="!accountCreated"
      class="flex flex-col gap-8 p-6 rounded-2xl shadow-md min-w-[300px] bg-white"
      @submit.prevent="signup()"
    >
      <span class="text-center font-semibold text-xl">Signup</span>
      <div class="flex flex-col gap-4">
        <span
          v-if="invalidFields || creationAccountFailed"
          class="text-center text-red-700 text-sm"
          >{{
            invalidFields
              ? 'Invalid fields, verify and try again'
              : 'Error on create account, try again!'
          }}</span
        >
        <div class="flex flex-col gap-4 w-full">
          <input
            v-model="form.name"
            type="text"
            class="defaultInput"
            placeholder="Name"
            required
          />
          <input
            v-model="form.email"
            type="email"
            class="defaultInput"
            placeholder="Email"
            required
          />
          <input
            v-model="form.password"
            type="password"
            class="defaultInput"
            placeholder="Password"
            required
          />
          <input
            v-model="form.confirmPassword"
            type="password"
            class="defaultInput"
            placeholder="Confirm password"
            required
          />
        </div>
      </div>
      <div class="flex flex-col gap-4 items-center">
        <button
          type="submit"
          class="bg-[#00ce5d] text-white font-semibold rounded-lg py-2 w-full flex items-center justify-center"
        >
          <div
            v-if="creatingAccount"
            class="w-8 h-8 rounded-full border-4 border-white border-l-transparent animate-spin"
          />
          <span v-else>Signup</span>
        </button>
        <NuxtLink to="/" class="text-sm"> Login </NuxtLink>
      </div>
    </form>
    <AuthSignUpCpmplete v-else />
  </div>
</template>
