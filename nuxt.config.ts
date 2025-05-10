import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [ "/public/main.css" ],
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/jpeg", href: "favicon.jpg" }
      ]
    }
  },

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  modules: [ "@nuxt/image" ]
});