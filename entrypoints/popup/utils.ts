import { storage } from 'wxt/storage';
import { DEFAULTS } from './constants';
import { PkgManager } from './types';

export async function getList(): Promise<PkgManager[]> {
  const listExists = await storage.getItem<string>('local:list');
  if (!listExists) {
    await storage.setItem('local:list', JSON.stringify(DEFAULTS));
    return DEFAULTS;
  }
  return JSON.parse(listExists);
}

export async function setDefaultList() {
  await storage.setItem('local:list', JSON.stringify(DEFAULTS));
  return DEFAULTS;
}

export async function setList(list: PkgManager[]) {
  await storage.setItem('local:list', JSON.stringify(list));
  return list;
}
