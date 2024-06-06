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
    type: 'userData';
    payload: UserDataType | null;
  };
};
