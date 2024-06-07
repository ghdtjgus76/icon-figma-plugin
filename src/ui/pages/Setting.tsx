import { Button, Stack, TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import useData from '../hooks/useData';
import { UserDataType, GithubDataType } from '../../shared/types';
import { MessageType } from '../../shared/constants';

export default function Setting() {
  const [githubData, setGithubData] = useState({
    owner: '',
    repo: '',
    githubToken: '',
  });
  const [figmaToken, setFigmaToken] = useState('');

  useEffect(() => {
    useData((userData: UserDataType) => {
      setGithubData({
        owner: userData.owner,
        repo: userData.repo,
        githubToken: userData.githubToken,
      });
      setFigmaToken(userData.figmaToken);
    });
  }, []);

  const handleChangeGithubData = (
    type: keyof GithubDataType,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    setGithubData((prevData) => ({
      ...prevData,
      [type]: e.target.value,
    }));

  const handleChangeFigmaToken = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFigmaToken(e.target.value);

  const handleClickReset = () => {
    setGithubData({
      owner: '',
      repo: '',
      githubToken: '',
    });
    setFigmaToken('');

    window.parent.postMessage(
      {
        pluginMessage: {
          type: MessageType.SetData,
          payload: {
            owner: '',
            repo: '',
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
            owner: githubData.owner,
            repo: githubData.repo,
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
        label="github owner name"
        value={githubData.owner}
        placeholder="github owner name"
        onChange={(event) => handleChangeGithubData('owner', event)}
      />
      <TextField
        variant="outlined"
        size="small"
        label="github repository name"
        value={githubData.repo}
        placeholder="github repository name"
        onChange={(event) => handleChangeGithubData('repo', event)}
      />
      <TextField
        variant="outlined"
        size="small"
        label="github token"
        value={githubData.repo}
        placeholder="github token"
        onChange={(event) => handleChangeGithubData('githubToken', event)}
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
