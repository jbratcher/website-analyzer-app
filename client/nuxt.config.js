import colors from "vuetify/es5/util/colors";
import * as strUtil from "./utils/str-utils.js";

// format package name for title display
const title = strUtil.titleCase(
  process.env.npm_package_name.replace(/-/g, " ")
);

export default {
  mode: "spa",
  /*
   ** env variables used in vue components
   */
  env: {
    title: title || "",
    description: process.env.npm_package_description || ""
  },
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: "en"
    },
    title: title || "",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "preload",
        href: "https://cdn.jsdelivr.net/npm/animate.css@3.5.1",
        as: "style"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/global.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/breakpoint",
    "~/plugins/directives",
    "~/plugins/vuetify-theme-cache"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/pwa"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/markdownit",
    "@nuxtjs/toast",
    "nuxt-webfontloader"
  ],
  /*
   ** Nuxtjs auth module
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/auth/login",
            method: "post",
            propertyName: "token"
          },
          logout: {
            url: "/auth/logout",
            method: "post",
            propertyName: "token"
          },
          user: { url: "/auth/user", method: "get", propertyName: false }
        }
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      }
    },
    token: {
      prefix: "token"
    }
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL:
      process.env.NODE_ENV === "development"
        ? process.env.DEV_HOST
        : process.env.PROD_HOST
  },
  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    breaks: true,
    html: true,
    injected: true,
    linkify: true,
    preset: "default"
  },
  /*
   ** Nuxt Toast Module
   ** https://github.com/nuxt-community/modules/tree/master/packages/toast
   */
  toast: {
    position: "top-right",
    register: [
      // Register custom toasts
      {
        name: "welcome-user",
        message: "Hi, username",
        options: {
          type: "info"
        }
      }
    ]
  },
  /*
  // nuxt-webfontloader
  // handles efficient loading of web fonts
  */
  webfontloader: {
    // use custom instead of google property to prevent flash of invisible text(foit)
    custom: {
      families: ["Open Sans"],
      urls: ["https://fonts.googleapis.com/css?family=Open+Sans&display=swap"]
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   **
   ** define additional themes
   ** colors object https://vuetifyjs.com/en/styles/colors
   */
  vuetify: {
    treeShake: true,
    customVariables: ["~/assets/variables.scss"],
    defaultAssets: {
      icons: false
    },
    theme: {
      options: {
        minifyTheme: function(css) {
          return process.env.NODE_ENV === "production"
            ? css.replace(/[\r\n|\r|\n]/g, "")
            : css;
        }
      },
      light: true,
      themes: {
        light: {
          primary: colors.indigo,
          accent: colors.indigo.accent2,
          secondary: colors.green.base,
          info: colors.blueGrey.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: colors.blue.base
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  generate: {
    fallback: true
  }
};
