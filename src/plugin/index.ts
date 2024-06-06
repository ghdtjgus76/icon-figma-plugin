figma.showUI(__html__);

figma.ui.onmessage = async (message) => {
  if (message.type === 'setInfo') {
    await figma.clientStorage.setAsync('userInfo', message.payload);
  }
};
