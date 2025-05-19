import { test } from '../fixtures';
import { DEFAULTS } from '@/entrypoints/popup/constants';

const PACKAGE_NAME = 'react';
const VERSION = '19.0.0-rc-380f5d67-20241113';

test('an example package', async ({ page }) => {
  await page.goto(`https://www.npmjs.com/package/${PACKAGE_NAME}`);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('[alt-pkg]');

  await page.$$eval(
    'main > div > *:nth-child(4) [alt-pkg]',
    (els, { DEFAULTS, PACKAGE_NAME }) => {
      if (els.length != DEFAULTS.length) {
        throw new Error('Elements did not match the default script count');
      }

      els.forEach((el, i) => {
        const shouldBe = `${DEFAULTS[i].name} ${DEFAULTS[i].command} ${PACKAGE_NAME}`;

        const doesMatch = el.querySelector('code')!.innerText === shouldBe;
        if (!doesMatch) {
          throw new Error(
            `Element ${i} does not match 
              expected : ${shouldBe}
              got : ${el.querySelector('code')!.innerText}
            `,
          );
        }
      });
    },
    {
      DEFAULTS,
      PACKAGE_NAME,
    },
  );
});

test('a versioned package', async ({ page }) => {
  await page.goto(`https://www.npmjs.com/package/${PACKAGE_NAME}/v/${VERSION}`);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('[alt-pkg]');

  await page.$$eval(
    'main > div > *:nth-child(4) [alt-pkg]',
    (els, { DEFAULTS, PACKAGE_NAME, VERSION }) => {
      if (els.length != DEFAULTS.length) {
        throw new Error('Elements did not match the default script count');
      }

      els.forEach((el, i) => {
        const shouldBe = `${DEFAULTS[i].name} ${DEFAULTS[i].command} ${PACKAGE_NAME}@${VERSION}`;

        const doesMatch = el.querySelector('code')!.innerText === shouldBe;
        if (!doesMatch) {
          throw new Error(
            `Element ${i} does not match 
              expected : ${shouldBe}
              got : ${el.querySelector('code')!.innerText}
            `,
          );
        }
      });
    },
    {
      DEFAULTS,
      PACKAGE_NAME,
      VERSION,
    },
  );
});
