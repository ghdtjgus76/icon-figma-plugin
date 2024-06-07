import { Octokit } from 'octokit';
import { type RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';
import { useCallback } from 'react';

type GithubApiPropsType = { githubToken: string; owner: string; repo: string };

type CreatePullRequestParameters =
  RestEndpointMethodTypes['pulls']['create']['parameters'];

export default function githubApi({
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

  const getTreeSha = useCallback(
    async (parentSha: string) => {
      const { data: commitData } = await octokit.git.getCommit({
        owner,
        repo,
        commit_sha: parentSha,
      });
      const baseTreeSha = commitData.tree.sha;

      return baseTreeSha;
    },
    [owner, repo],
  );

  const createTree = useCallback(
    async (baseTreeSha, files) => {
      await octokit.git.createTree({
        owner,
        repo,
        base_tree: baseTreeSha,
        tree: files.map((file) => ({
          path: file.path,
          mode: '100644',
          type: 'blob',
          content: file.content,
        })),
      });
    },
    [owner, repo],
  );

  const createCommit = useCallback(
    async (message, sha, parentSha) => {
      const { data: commit } = await octokit.git.createCommit({
        owner,
        repo,
        message: message,
        tree: sha,
        parents: [parentSha],
      });

      return commit.sha;
    },

    [owner, repo],
  );

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

      return head;
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
    getTreeSha,
    createTree,
    createCommit,
    createBranch,
    createPullRequest,
  };
}
