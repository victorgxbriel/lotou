// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/icon", ["@nuxtjs/google-fonts", {
    families: {
      'Montserrat' : '200..700',
      download: true,
      inject: true
    }
  }],],
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: './public/img/logo-lotou.png'}],
      title: "Lotou",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    }
  }
})