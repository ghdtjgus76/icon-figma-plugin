import { Octokit } from '@octokit/core';
import { createPullRequest } from 'octokit-plugin-create-pull-request';

type GithubApiPropsType = {
  githubToken: string;
  owner: string;
  repo: string;
  svgIcons: string;
};

export default function githubApi({
  githubToken,
  owner,
  repo,
  svgIcons,
}: GithubApiPropsType) {
  const MyOctokit = Octokit.plugin(createPullRequest);

  const octokit = new MyOctokit({
    auth: githubToken,
  });

  const createPR = async () => {
    octokit.createPullRequest({
      owner,
      repo,
      title: 'Feature: 아이콘 변경사항 반영',
      body: '피그마 상 아이콘 변경사항 반영했습니다.',
      head: 'icons',
      base: 'main',
      changes: [
        {
          files: { path: 'packages/icons/icons.json', content: svgIcons },
          commit: 'feature: 아이콘 변경사항 반영',
          author: {
            name: 'ghdtjgus76',
            email: 'ghdtjgus76@naver.com',
            date: new Date().toISOString(),
          },
          committer: {
            name: 'ghdtjgus76',
            email: 'ghdtjgus76@naver.com',
            date: new Date().toISOString(),
          },
        },
      ],
    });
  };

  return createPR;
}
