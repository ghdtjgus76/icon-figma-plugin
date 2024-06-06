import { UserDataType } from '../shared/types';
import { StorageKey } from './constants';
import { getStorageData, setStorageData } from './utils';

figma.showUI(__html__, { height: 360 });

figma.ui.onmessage = async (message) => {
  if (message.type === 'setData') {
    await setStorageData(StorageKey.UserData, message.payload);
  }

  if (message.type === 'getData') {
    const userData: UserDataType = await getStorageData(StorageKey.UserData);

    figma.ui.postMessage({
      type: 'userData',
      payload: userData || null,
    });
  }
};
