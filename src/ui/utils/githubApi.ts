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

  const { title, body, head, base, iconFilePath, commit, author, committer } =
    gitConfig;

  const createPR = async () => {
    octokit
      .createPullRequest({
        owner,
        repo,
        title,
        body,
        head,
        base,
        update: true,
        changes: [
          {
            files: { [iconFilePath]: svgIcons },
            commit,
            author,
            committer,
          },
        ],
      })
      .then((pr) => console.log(pr.data.id));
  };

  return createPR;
}
