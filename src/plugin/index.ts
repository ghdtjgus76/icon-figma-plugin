import { UserDataType } from '../shared/types';

figma.showUI(__html__, { height: 360 });

figma.ui.onmessage = async (message) => {
  if (message.type === 'setData') {
    await figma.clientStorage.setAsync('userData', message.payload);
  }

  if (message.type === 'getData') {
    const userData: UserDataType = await figma.clientStorage.getAsync(
      'userData',
    );

    figma.ui.postMessage({
      type: 'userData',
      payload: userData || null,
    });
  }
};
