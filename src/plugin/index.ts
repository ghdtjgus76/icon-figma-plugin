import { MessageType } from '../shared/constants';
import { SvgIconsType, UserDataType } from '../shared/types';
import { StorageKey } from './constants';
import { getStorageData, setStorageData } from './utils';

figma.showUI(__html__, { height: 360 });

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
    const { githubToken, owner, repo } = await getStorageData(
      StorageKey.UserData,
    );

    figma.ui.postMessage({
      type: MessageType.CreatePullRequest,
      payload: { svgIcons: JSON.stringify(svgIcons), githubToken, owner, repo },
    });
  }
};
