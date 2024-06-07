import { MessageType } from '../shared/constants';
import { UserDataType } from '../shared/types';
import { StorageKey } from './constants';
import githubApi from './github';
import { getStorageData, setStorageData } from './utils';

figma.showUI(__html__, { height: 360 });

type SvgIconsType = { [key: string]: string };

const extractIcons = async (): Promise<SvgIconsType> => {
  const currentNodes = figma.currentPage.selection;
  if (!currentNodes.length) {
    console.log('선택된 프레임이 없습니다.');
    return;
  }

  const svgIcons = await Promise.all(
    currentNodes.map(async (currentNode: SceneNode) => {
      const svg = await currentNode.exportAsync({ format: 'SVG_STRING' });
      const id = currentNode.name;

      return { svg, id };
    }),
  );

  const svgIconObj: SvgIconsType = svgIcons.reduce(
    (acc, { svg, id }) => ({
      ...acc,
      [id]: svg,
    }),
    {},
  );

  return svgIconObj;
};

const createPullRequest = async (svgIcons: SvgIconsType) => {
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
  } = githubApi({
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

figma.ui.onmessage = async (message) => {
  if (message.type === MessageType.SetData) {
    await setStorageData(StorageKey.UserData, message.payload);
  }

  if (message.type === MessageType.GetData) {
    const userData: UserDataType = await getStorageData(StorageKey.UserData);

    figma.ui.postMessage({
      type: MessageType.UserData,
      payload: userData || null,
    });
  }

  if (message.type === MessageType.ExtractIcon) {
    const svgIcons = await extractIcons();
    createPullRequest(svgIcons);
  }
};
