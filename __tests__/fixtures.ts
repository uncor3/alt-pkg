import { test as base, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, '../.output/chrome-mv3');

    if (fs.existsSync(pathToExtension)) {
      console.log(`Extension found at ${pathToExtension}`);
    } else {
      throw new Error(`Extension not found at ${pathToExtension}`);
    }

    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      args: [`--load-extension=${pathToExtension}`],
    });

    await use(context);
    await context.close();
  },
});
export const expect = test.expect;
