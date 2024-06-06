import { Button, Stack, TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import useData from '../hooks/useData';
import { UserDataType } from '../../shared/types';
import { MessageType } from '../../shared/constants';

export default function Setting() {
  const [githubData, setGithubData] = useState({
    githubRepositoryUrl: '',
    githubToken: '',
  });
  const [figmaToken, setFigmaToken] = useState('');

  useEffect(() => {
    useData((userData: UserDataType) => {
      setGithubData({
        githubRepositoryUrl: userData.githubRepositoryUrl,
        githubToken: userData.githubToken,
      });
      setFigmaToken(userData.figmaToken);
    });
  }, []);

  const handleChangeGithubRepositoryUrl = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    setGithubData((prevData) => ({
      ...prevData,
      githubRepositoryUrl: e.target.value,
    }));

  const handleChangeGithubToken = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    setGithubData((prevData) => ({
      ...prevData,
      githubToken: e.target.value,
    }));

  const handleChangeFigmaToken = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFigmaToken(e.target.value);

  const handleClickReset = () => {
    setGithubData({
      githubRepositoryUrl: '',
      githubToken: '',
    });
    setFigmaToken('');

    window.parent.postMessage(
      {
        pluginMessage: {
          type: MessageType.SetData,
          payload: {
            githubRepositoryUrl: '',
            githubToken: '',
            figmaToken: '',
          },
        },
      },
      '*',
    );
  };

  const handleClickSave = () => {
    window.parent.postMessage(
      {
        pluginMessage: {
          type: MessageType.SetData,
          payload: {
            githubRepositoryUrl: githubData.githubRepositoryUrl,
            githubToken: githubData.githubToken,
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
        value={githubData.githubRepositoryUrl}
        placeholder="github repository url"
        onChange={handleChangeGithubRepositoryUrl}
      />
      <TextField
        variant="outlined"
        size="small"
        label="github token"
        value={githubData.githubToken}
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
      <Stack gap="5px" direction="row">
        <Button
          variant="outlined"
          endIcon={<RestartAltIcon />}
          onClick={handleClickReset}
        >
          Reset
        </Button>
        <Button
          variant="outlined"
          endIcon={<SaveAltIcon />}
          onClick={handleClickSave}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
