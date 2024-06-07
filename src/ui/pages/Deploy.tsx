import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import { Stack } from '@mui/material';
import { MessageType } from '../../shared/constants';

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
