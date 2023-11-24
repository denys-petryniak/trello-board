// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'Trello Board'
    }
  },
  modules: [
    // https://www.npmjs.com/package/@nuxtjs/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://www.npmjs.com/package/@vueuse/nuxt
    '@vueuse/nuxt'
  ],
  typescript: {
    strict: true
  },
  devtools: { enabled: true }
})
