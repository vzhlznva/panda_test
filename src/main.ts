import {
  createApp as createClientApp,
  resolveDynamicComponent,
  h,
  VNode,
  provide,
  Transition,
} from "vue";

import { createI18n } from "./i18n";
import { RouterView } from "vue-router";
import { createRouter } from "./router";
import { initApi, apiSymbol } from "/@src/composable/useApi";
import { initStorage, storageSymbol } from "/@src/composable/useStorage";

async function createApp() {
  const i18n = createI18n();
  const router = createRouter();
  const storage = initStorage();
  const api = initApi();

  const app = createClientApp({
    setup() {
      provide(apiSymbol, api);
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

  return app;
}

createApp().then((app) => app.mount("#app"));
