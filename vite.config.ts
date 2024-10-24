import { PluginOption, defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import Pages from "vite-plugin-pages";
import Components from "unplugin-vue-components/vite";
import Layouts from "vite-plugin-vue-layouts";
import SvgLoader from "vite-svg-loader";
import path from "path";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { VitePWA } from "vite-plugin-pwa";

const SILENT = Boolean(process.env.SILENT) ?? false;

interface ExtendedIconResource {
  src: string;
  type: string;
  sizes?: string;
  purpose?: string;
  media?: string;
}

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  base: "/",
  publicDir: "public",
  logLevel: SILENT ? "error" : "info",

  optimizeDeps: {
    include: ["@vueuse/core", "@vueuse/head", "vue-i18n", "moment"],
  },
  resolve: {
    alias: [
      {
        find: "/~/",
        replacement: `/src/assets/`,
      },
      {
        find: "/@src/",
        replacement: `/src/`,
      },
    ],
  },
  plugins: [
    Vue({
      include: [/\.vue$/],
      template: {
        compilerOptions: {},
      },
    }),

    VueI18nPlugin({
      include: [path.resolve(__dirname, "./src/locales/**")],
      strictMessage: false,
    }),

    Pages({
      pagesDir: [
        {
          dir: "src/pages",
          baseRoute: "",
        },
      ],
      importMode(path) {
        return "async";
      },
    }),

    Layouts({
      layoutsDirs: "src/layouts",
      defaultLayout: "default",
    }),

    Components({
      dirs: ["src/components", "src/layouts"],
      extensions: ["vue", "md", "mjs.map"],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.js$/],
      resolvers: [
        IconsResolver({
          prefix: "i",
          enabledCollections: ["weather"],
        }),
      ],
    }),

    Icons({
      compiler: "vue3",
      customCollections: {
        popeye: FileSystemIconLoader("src/assets/svg/icons"),
      },
    }) as PluginOption,

    SvgLoader({
      svgo: true,
      svgoConfig: {
        multipass: true,
      },
    }) as PluginOption,
    VitePWA({
      base: "/",
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "Weather App",
        short_name: "Weather",
        start_url: "/?utm_source=pwa",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "favicon.ico",
          },
        ] as ExtendedIconResource[],
      },
    }),
  ],
});
