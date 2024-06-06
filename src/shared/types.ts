import { MessageType } from './constants';

type GithubDataType = {
  githubRepositoryUrl: string;
  githubToken: string;
};

type FigmaDataType = {
  figmaToken: string;
};

export type UserDataType = (GithubDataType & FigmaDataType) | null;

export type UserDataPluginMessage = {
  pluginMessage: {
    type: MessageType.UserData;
    payload: UserDataType | null;
  };
};
