import { storage } from 'wxt/storage';
import { DEFAULTS } from './constants';
import { PkgManager } from './types';

export async function getList(): Promise<PkgManager[]> {
  const listExists = await storage.getItem<string>('local:list');
  if (!listExists) {
    return await setDefaultList();
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
