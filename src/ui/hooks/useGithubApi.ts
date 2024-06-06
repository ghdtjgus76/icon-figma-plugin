import { Octokit } from 'octokit';
import { type RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';
import { useCallback } from 'react';

type GithubApiPropsType = { githubToken: string; owner: string; repo: string };

type CreatePullRequestParameters =
  RestEndpointMethodTypes['pulls']['create']['parameters'];

export default function useGithubApi({
  githubToken,
  owner,
  repo,
}: GithubApiPropsType) {
  const octokit = new Octokit({ auth: githubToken });

  const getLatestCommit = useCallback(async () => {
    const { data: commits } = await octokit.repos.listCommits({
      owner,
      repo,
      per_page: 1,
    });
    const latestCommitSha = commits[0].sha;

    return latestCommitSha;
  }, [owner, repo]);

  const createBranch = useCallback(
    async (
      head: CreatePullRequestParameters['head'],
      latestCommitSha: string,
    ) => {
      await octokit.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${head}`,
        sha: latestCommitSha,
      });
    },
    [owner, repo],
  );

  const createPullRequest = useCallback(
    async (params: {
      title: CreatePullRequestParameters['title'];
      body: CreatePullRequestParameters['body'];
      head: CreatePullRequestParameters['head'];
      base: CreatePullRequestParameters['base'];
    }) => {
      const { data } = await octokit.pulls.create({
        owner,
        repo,
        ...params,
      });

      return data;
    },
    [owner, repo],
  );

  return {
    getLatestCommit,
    createBranch,
    createPullRequest,
  };
}
