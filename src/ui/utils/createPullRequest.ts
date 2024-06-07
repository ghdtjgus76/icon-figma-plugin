import { StorageKey } from '../../plugin/constants';
import { getStorageData } from '../../plugin/utils';
import useGithubApi from '../hooks/useGithubApi';

export const createPullRequest = async (svgIcons: string) => {
  const { githubToken, owner, repo } = await getStorageData(
    StorageKey.UserData,
  );

  const {
    getLatestCommit,
    getTreeSha,
    createTree,
    createCommit,
    createBranch,
    createPullRequest,
  } = useGithubApi({
    githubToken,
    owner,
    repo,
  });

  const latestCommitSha = await getLatestCommit();
  const baseTreeSha = await getTreeSha(latestCommitSha);
  const newTreeSha = await createTree(baseTreeSha, [
    { path: 'packages/icons/icons.json', content: JSON.stringify(svgIcons) },
  ]);
  const newCommitSha = await createCommit(
    'feature: 아이콘 변경사항 반영',
    newTreeSha,
    latestCommitSha,
  );
  const branchName = await createBranch(
    `icons-${Date.now().toFixed(6)}`,
    newCommitSha,
  );

  await createPullRequest({
    title: 'Feature: 아이콘 변경사항 반영',
    body: '피그마 상 아이콘 변경사항 반영했습니다.',
    head: branchName,
    base: 'main',
  });
};
