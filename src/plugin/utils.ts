import { StorageKey } from './constants';

export const setStorageData = async (key: StorageKey, payload: unknown) => {
  await figma.clientStorage.setAsync(key, payload);
};

export const getStorageData = async (key: StorageKey) => {
  const data = await figma.clientStorage.getAsync(key);
  return data;
};
