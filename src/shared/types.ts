type GithubDataType = {
  githubRepositoryUrl: string;
  githubToken: string;
};

type FigmaDataType = {
  figmaToken: string;
};

export type UserDataType = (GithubDataType & FigmaDataType) | null;
