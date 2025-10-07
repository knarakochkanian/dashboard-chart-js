export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  ssr: true,
  
  modules: [
    '@pinia/nuxt',
  ],
  
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
  ],
  
  build: {
    transpile: ['vuetify'],
  },
  
  pinia: {
    storesDirs: ['./stores/**'],
  },
  
  vite: {
    define: {
      __VUE_OPTIONS_API__: true,
    },
  },
})
