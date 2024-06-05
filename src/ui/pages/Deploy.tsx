import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import { Stack } from '@mui/material';

export default function Deploy() {
  return (
    <Stack justifyContent="center" alignItems="center" height="100%" gap="30px">
      <Button variant="outlined" endIcon={<SendIcon />}>
        Deploy
      </Button>
    </Stack>
  );
}
