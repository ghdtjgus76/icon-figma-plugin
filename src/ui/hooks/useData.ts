import { UserDataPluginMessage, UserDataType } from '../../shared/types';

export default function useData(onSuccess: (userData: UserDataType) => void) {
  window.parent.postMessage(
    {
      pluginMessage: {
        type: 'getData',
      },
    },
    '*',
  );

  onmessage = (event: MessageEvent<UserDataPluginMessage>) => {
    const { type, payload } = event.data.pluginMessage;

    if (type === 'userData' && payload) {
      const userData = payload;

      onSuccess(userData);
    }
  };
}
