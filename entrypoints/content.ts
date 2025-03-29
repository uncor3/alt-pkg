import init from './init';

export default defineContentScript({
  matches: ['https://www.npmjs.com/package/*'],
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: () => {
        const mainContainer = document.querySelector('main > div');
        const handler = () => {
          const div = mainContainer?.children[3].querySelector('h3 + *');
          if (div) {
            init(div as HTMLElement);

            // window.addEventListener('popstate', handler);
            //react-router does not fire events like popstate,pushstate so navigation events do not work
            //use a mutation observer instead
            const observer = new MutationObserver(() => {
              handler();
            });

            const config = {
              childList: true,
              attributes: true,
              subtree: true,
            };

            //h2 > span is the package name
            const divToObserve = document.querySelector(
              'main > div > *:nth-child(1) > h2'
            );
            observer.observe(divToObserve!, config);
          }
        };

        //check the layout of the page
        if (mainContainer && mainContainer.children.length == 4) {
          handler();
        }
      },
    });
    ui.mount();
  },
});
