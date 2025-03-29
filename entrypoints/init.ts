import { getList } from './popup/utils';

async function init(elementToCopy: HTMLElement) {
  //leave one element so we can clone the element
  elementToCopy?.parentElement
    ?.querySelectorAll('[alt-pkg]')
    .forEach((_, i) => {
      if (i === 0) return;
      _.remove();
    });
  const pkg_managers = await getList();
  const pkgName = getPackageName();
  if (elementToCopy) {
    let elementToCopyParent = elementToCopy.parentElement;
    let nextSibling = elementToCopy.nextSibling;
    elementToCopy.parentNode?.removeChild(elementToCopy);

    for (let index = 0; index < pkg_managers.length; index++) {
      const manager = pkg_managers[index];
      const newClone = elementToCopy.cloneNode(true) as HTMLElement;
      newClone.setAttribute('alt-pkg', '');

      const code = newClone.querySelector('p > code');
      const btn = newClone.querySelector('p > button');

      if (!code || !btn) continue;
      const text = `${manager.name} ${manager.command} ${pkgName}`;
      btn.addEventListener('click', () => {
        try {
          navigator.clipboard.writeText(text);
          newClone.style.backgroundColor = 'lightgreen';
          newClone.style.transition = 'background-color 0.3s';
          setTimeout(() => {
            newClone.style.backgroundColor = '';
          }, 300);
        } catch (error) {
          newClone.style.backgroundColor = 'red';
          setTimeout(() => {
            newClone.style.backgroundColor = '';
          }, 300);
          console.error(error);
        }
      });

      code.textContent = text;
      if (elementToCopyParent) {
        elementToCopyParent.insertBefore(newClone, nextSibling);
      }
    }
  }
}

function getPackageName() {
  const path = new URL(document.location.href).pathname;
  const match = path.match(/^\/package\/(@?[^/?]+\/?[^/?]*)/);
  return match ? match[1] : '';
}

export default init;
