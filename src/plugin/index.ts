figma.showUI(__html__, { height: 360 });

figma.ui.onmessage = async (message) => {
  if (message.type === 'setInfo') {
    await figma.clientStorage.setAsync('userInfo', message.payload);
  }

  if (message.type === 'getInfo') {
    const userInfo = await figma.clientStorage.getAsync('userInfo');

    figma.ui.postMessage({
      type: 'userInfo',
      payload: userInfo || null,
    });
  }
};
