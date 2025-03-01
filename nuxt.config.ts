import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  plugins: [
    '~/plugins/chartjs.ts',
  ],

  modules: [
    ['@nuxtjs/google-fonts',
      {
        families: {
          'Montserrat+Alternates': [400, 500, 600, 700, 800, 900],
        },
        display: 'swap', 
        googleFonts: {
          text: 'СЯП.ру'
        }
      }
    ],
    '@nuxt/ui'
  ],
})