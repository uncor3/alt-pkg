import { setDefaultList, getList, setList } from '@/entrypoints/popup/utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { fakeBrowser } from 'wxt/testing';
import { DEFAULTS } from '@/entrypoints/popup/constants';

describe('setDefaultList', () => {
  beforeEach(() => {
    // See https://webext-core.aklinker1.io/fake-browser/reseting-state
    fakeBrowser.reset();
  });

  it('should return the default list', async () => {
    await setDefaultList();
    expect(await getList()).toEqual(DEFAULTS);
  });
});

describe('setList', () => {
  beforeEach(() => {
    // See https://webext-core.aklinker1.io/fake-browser/reseting-state
    fakeBrowser.reset();
  });

  it('should return the default list', async () => {
    const list = [
      {
        name: 'foo',
        command: 'bar',
      },
    ];
    await setList(list);
    expect(await getList()).toEqual(list);
  });
});
