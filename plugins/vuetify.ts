import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#3B82F6',
            secondary: '#18181B',
          },
        },
        dark: {
          colors: {
            primary: '#3B82F6',
            secondary: '#FFFFFF',
          },
        },
      },
    },
    ssr: true,
  })

  nuxtApp.vueApp.use(vuetify)
})
