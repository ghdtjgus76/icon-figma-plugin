import { Button, Stack, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

export default function Setting() {
  const [githubInfo, setGithubInfo] = useState({
    githubRepositoryUrl: '',
    githubToken: '',
  });
  const [figmaToken, setFigmaToken] = useState('');

  const handleChangeGithubRepositoryUrl = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    setGithubInfo((prevInfo) => ({
      ...prevInfo,
      githubRepositoryUrl: e.target.value,
    }));

  const handleChangeGithubToken = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    setGithubInfo((prevInfo) => ({
      ...prevInfo,
      githubToken: e.target.value,
    }));

  const handleChangeFigmaToken = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFigmaToken(e.target.value);

  const handleClickSave = () => {
    window.parent.postMessage(
      {
        pluginMessage: {
          type: 'setInfo',
          payload: {
            githubRepositoryUrl: githubInfo.githubRepositoryUrl,
            githubToken: githubInfo.githubToken,
            figmaToken,
          },
        },
      },
      '*',
    );
  };

  return (
    <Stack justifyContent="center" alignItems="center" gap="20px">
      <TextField
        variant="outlined"
        size="small"
        label="github repository url"
        value={githubInfo.githubRepositoryUrl}
        placeholder="github repository url"
        onChange={handleChangeGithubRepositoryUrl}
      />
      <TextField
        variant="outlined"
        size="small"
        label="github token"
        value={githubInfo.githubToken}
        placeholder="github token"
        onChange={handleChangeGithubToken}
      />
      <TextField
        variant="outlined"
        size="small"
        label="figma token"
        value={figmaToken}
        placeholder="figma token"
        onChange={handleChangeFigmaToken}
      />
      <Button
        variant="outlined"
        endIcon={<SaveAltIcon />}
        onClick={handleClickSave}
      >
        Save
      </Button>
    </Stack>
  );
}
