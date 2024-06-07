import { MessageType } from './constants';

export type GithubDataType = {
  owner: string;
  repo: string;
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

export type CreatePullRequestPluginMessage = {
  pluginMessage: {
    type: MessageType.CreatePullRequest;
    payload: string;
  };
};

export type SvgIconsType = { [key: string]: string };
