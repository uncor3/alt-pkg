import { defineConfig } from 'wxt';
import pkg from './package.json';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-vue', '@wxt-dev/auto-icons'],
  vite: () => ({
    define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  }),
  manifest: ({ browser }) => {
    return {
      permissions: ['storage'],
      author:
        browser === 'firefox'
          ? 'Uncore'
          : {
              email: 'contactuncor3@gmail.com',
            },
      description:
        'A free and open-source extension to change the default install command on npmjs.com',
      short_name: 'AltPkg',
      name: 'AltPkg',
      version: pkg.version,
      icons: {
        16: '/icons/16.png',
        32: '/icons/32.png',
        48: '/icons/48.png',
        128: '/icons/128.png',
      },
    };
  },
});
