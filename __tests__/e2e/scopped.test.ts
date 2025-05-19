import { test } from '../fixtures';
import { DEFAULTS } from '@/entrypoints/popup/constants';

const PACKAGE_NAME = '@lexical/utils';
const VERSION = '0.28.1-nightly.20250325.0';

test('a scoped package', async ({ page }) => {
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
      VERSION,
    },
  );
});

test('a scoped & versioned package', async ({ page }) => {
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
