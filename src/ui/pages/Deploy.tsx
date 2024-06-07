import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { MessageType } from '../../shared/constants';
import { CreatePullRequestPluginMessage } from '../../shared/types';
import { createPullRequest } from '../utils/createPullRequest';

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
      const { type, payload } = event.data.pluginMessage;

      if (type === MessageType.CreatePullRequest && payload) {
        createPullRequest(payload);
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
