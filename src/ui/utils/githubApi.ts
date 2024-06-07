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

  // TODO 세부 내용 동적으로 불러올 수 있도록 수정
  const createPR = async () => {
    octokit
      .createPullRequest({
        owner,
        repo,
        title: 'Feature: 아이콘 변경사항 반영',
        body: '피그마상 아이콘 변경사항 반영했습니다.',
        head: 'icons2',
        base: 'main',
        update: true,
        changes: [
          {
            files: { 'packages/icons/icons.json': svgIcons },
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
      })
      .then((pr) => console.log(pr.data.id));
  };

  return createPR;
}
