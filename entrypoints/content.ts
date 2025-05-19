import init from './init';
import { getList } from './popup/utils';

export default defineContentScript({
  matches: ['https://www.npmjs.com/package/*'],
  runAt: 'document_end',
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: async () => {
        const pkgManagers = await getList();
        const mainContainer = document.querySelector('main > div');
        const handler = () => {
          const div = mainContainer?.children[3].querySelector('h3');
          if (div) {
            init(div as HTMLElement, pkgManagers);
          }
        };

        if (mainContainer) {
          handler();

          //react-router does not fire events like popstate,pushstate so navigation events do not work
          //use a mutation observer instead
          const observer = new MutationObserver(() => {
            handler();
          });

          const config = {
            childList: true,
            attributes: false,
            subtree: true,
            characterData: true,
          };
          // could observe with the selector below
          // 'main > div > *:nth-child(1) > h2'
          //or even this
          // 'main > div > *:nth-child(1) > h2 > span' //actual package name
          //but this is more feature proof
          const divToObserve = document.querySelector(
            'main > div > *:nth-child(1)',
          );
          observer.observe(divToObserve!, config);
        }
      },
    });
    ui.mount();
  },
});
