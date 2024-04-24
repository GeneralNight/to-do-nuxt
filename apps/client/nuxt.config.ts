import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineNuxtConfig } from 'nuxt/config';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  workspaceDir: '../../',
  srcDir: 'src',
  devtools: { enabled: true },
  devServer: {
    host: 'localhost',
    port: 4200,
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      extends: './tsconfig.json',
    },
  },
  imports: {
    autoImport: true,
    // dirs: [
    //   '**/',
    //   'composables'
    // ]
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    '@libs/models': resolve(dirname(fileURLToPath(import.meta.url)), '../../libs/src/models'),
  },
  css: [
    '~/assets/css/global.scss'
  ],
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  vite: {
    plugins: [nxViteTsPaths()],
  },
});
