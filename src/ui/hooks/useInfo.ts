export default function useInfo(onSuccess) {
  window.parent.postMessage(
    {
      pluginMessage: {
        type: 'getInfo',
      },
    },
    '*',
  );

  onmessage = (event) => {
    const { type, payload } = event.data.pluginMessage;

    if (type === 'userInfo' && payload) {
      const userInfo = payload;

      onSuccess(userInfo);
    }
  };
}
