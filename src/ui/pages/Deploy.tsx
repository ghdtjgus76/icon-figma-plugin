import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Stack } from '@mui/material';
import { MessageType } from '../../shared/constants';
import { CreatePullRequestPluginMessage } from '../../shared/types';
import { useEffect } from 'react';
import React from 'react';
import githubApi from '../utils/githubApi';

export default function Deploy() {
  const handleClickDeploy = () => {
    window.parent.postMessage(
      {
        pluginMessage: {
          type: MessageType.ExtractIcon,
        },
      },
      '*',
    );
  };

  useEffect(() => {
    onmessage = (event: MessageEvent<CreatePullRequestPluginMessage>) => {
      const {
        type,
        payload: { githubToken, owner, repo, svgIcons },
      } = event.data.pluginMessage;

      if (type === MessageType.CreatePullRequest) {
        const createPullRequest = githubApi({
          githubToken,
          owner,
          repo,
          svgIcons,
        });

        createPullRequest();
      }
    };
  }, []);

  return (
    <Stack justifyContent="center" alignItems="center" height="100%" gap="30px">
      <Button
        variant="outlined"
        endIcon={<SendIcon />}
        onClick={handleClickDeploy}
      >
        Deploy
      </Button>
    </Stack>
  );
}
