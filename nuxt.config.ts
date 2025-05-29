import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg', href: '/logoGradient.svg' }]
    }
  },
  // ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
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