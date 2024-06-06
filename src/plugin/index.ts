import { MessageType } from '../shared/constants';
import { UserDataType } from '../shared/types';
import { StorageKey } from './constants';
import { getStorageData, setStorageData } from './utils';

figma.showUI(__html__, { height: 360 });

figma.ui.onmessage = async (message) => {
  if (message.type === MessageType.SetData) {
    await setStorageData(StorageKey.UserData, message.payload);
  }

  if (message.type === MessageType.GetData) {
    const userData: UserDataType = await getStorageData(StorageKey.UserData);

    figma.ui.postMessage({
      type: MessageType.UserData,
      payload: userData || null,
    });
  }
};
