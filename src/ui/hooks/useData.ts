import { MessageType } from '../../shared/constants';
import { UserDataPluginMessage, UserDataType } from '../../shared/types';

export default function useData(onSuccess: (userData: UserDataType) => void) {
  window.parent.postMessage(
    {
      pluginMessage: {
        type: MessageType.GetData,
      },
    },
    '*',
  );

  onmessage = (event: MessageEvent<UserDataPluginMessage>) => {
    const { type, payload } = event.data.pluginMessage;

    if (type === MessageType.UserData && payload) {
      const userData = payload;

      onSuccess(userData);
    }
  };
}
