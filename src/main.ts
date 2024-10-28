import {
  createApp as createClientApp,
  resolveDynamicComponent,
  h,
  VNode,
  provide,
  Transition,
} from "vue";

import { createI18n, locale } from "./i18n";
import { RouterView } from "vue-router";
import { createPinia } from "pinia";

import { createRouter } from "./router";
import {
  initApi,
  apiSymbol,
  initGeoApi,
  apiGeoSymbol,
} from "/@src/composable/useApi";
import { initStorage, storageSymbol } from "/@src/composable/useStorage";

async function createApp() {
  const i18n = createI18n();
  const router = createRouter();
  const storage = initStorage();
  const api = initApi();
  const geoApi = initGeoApi();

  const pinia = createPinia();

  const app = createClientApp({
    setup() {
      provide(apiSymbol, api);
      provide(apiGeoSymbol, geoApi);
      provide(storageSymbol, storage);

      return () => {
        const defaultSlot = ({ Component: _Component }: any) => {
          const Component = resolveDynamicComponent(_Component) as VNode;

          return [
            h(
              Transition,
              {
                name: "fade-slow",
                mode: "out-in",
              },
              {
                default: () => [h(Component)],
              }
            ),
          ];
        };

        return [
          h(RouterView, null, {
            default: defaultSlot,
          }),
        ];
      };
    },
  });

  app.use(router);
  app.use(i18n);
  app.use(pinia);

  return app;
}

createApp().then((app) => app.mount("#app"));
