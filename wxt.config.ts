import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-vue', '@wxt-dev/auto-icons'],
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
      version: '1.0.0',
      icons: {
        16: '/icons/16.png',
        32: '/icons/32.png',
        48: '/icons/48.png',
        128: '/icons/128.png',
      },
    };
  },
});
