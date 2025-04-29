import { getList } from './popup/utils';

async function init(prevElement: HTMLElement) {
  const elementToClone = prevElement.nextSibling as HTMLElement;
  elementToClone.remove();

  prevElement
    .parentElement!.querySelectorAll('[alt-pkg]')
    .forEach((_) => _.remove());
  const pkgManagers = await getList();

  const pkgName = getPackageName();
  const parentOfPrevElement = prevElement.parentElement;

  let nextSibling = prevElement.nextSibling;

  for (const manager of pkgManagers) {
    const newClone = elementToClone.cloneNode(true) as HTMLElement;
    newClone.setAttribute('alt-pkg', '');
    newClone.style.position = 'relative';
    const code = newClone.querySelector('p > code')!;
    const btn = newClone.querySelector('p > button')!;

    const text = `${manager.name} ${manager.command} ${pkgName}`;
    btn.addEventListener('click', () => copyToClipboard(newClone, text));
    code.textContent = text;
    parentOfPrevElement!.insertBefore(newClone, nextSibling);
    nextSibling = newClone.nextSibling;
  }
}

function copyToClipboard(element: HTMLElement, text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => highlightElement(element))
    .catch((error) => {
      highlightElement(element, error);
    });
}
function createdCopiedMessageElement() {
  const elm = document.createElement('div');
  elm.style.position = 'absolute';
  elm.style.top = '0';
  elm.style.left = '0';
  elm.style.width = '100%';
  elm.style.height = '100%';
  elm.style.display = 'flex';
  elm.style.justifyContent = 'center';
  elm.style.alignItems = 'center';
  return elm;
}

function highlightElement(element: HTMLElement, error?: Error) {
  const elm = createdCopiedMessageElement();
  if (error) {
    elm.style.backgroundColor = 'red';
    elm.textContent = 'Error copying!';
    console.error(error);
  } else {
    elm.style.backgroundColor = 'rgb(0, 255, 0, 0.75)';
    elm.textContent = 'Copied!';
  }
  element.appendChild(elm);
  setTimeout(() => {
    element.removeChild(elm);
    element.style.backgroundColor = '';
  }, 700);
}

function getPackageName() {
  const path = new URL(document.location.href).pathname;
  const match = path.match(/^\/package\/(@?[^/?]+\/?[^/?]*)/);
  return match ? match[1] : '';
}

export default init;
