import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { defineNuxtPlugin } from 'nuxt/app';


export default defineNuxtPlugin(({ hook }) => {
  hook('app:created', () => {
    const options = {
      apiKey: "AIzaSyAPx_QPl6kPaa7FEdlqimcyG0rdRW4xcho",
      authDomain: "to-do-nuxt-52872.firebaseapp.com",
      projectId: "to-do-nuxt-52872",
      storageBucket: "to-do-nuxt-52872.appspot.com",
      messagingSenderId: "141962744478",
      appId: "1:141962744478:web:35f0c9b8b6a3edd6d0e18f"
    } as FirebaseOptions
    const app = initializeApp(options);
    const auth = getAuth(app);
    const pinia = usePinia();
    const profileStore = useProfileStore(pinia);
    const route = useRoute();

    onAuthStateChanged(auth, async (user) => {
      try {


        useFirebase.user().value = user;
        if (user) {
          // auth.signOut()
          await profileStore.loadProfile(user.uid)
          if (!route.name.includes('dashboard')) {
            navigateTo('/dashboard')
          }
        } else {

          navigateTo('/')
        }
      } catch (error) {
        console.log(error)
      } finally {
        useFirebase.checked().value = true;
      }
    });

    useFirebase.app().value = app;
    useFirebase.auth().value = auth;


  });
});
