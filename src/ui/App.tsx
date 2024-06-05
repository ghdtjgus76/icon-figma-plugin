import React, { SyntheticEvent, useState } from 'react';
import { Stack, Tabs, Tab } from '@mui/material';
import TabPanel from './components/TabPanel';
import Deploy from './pages/Deploy';
import Setting from './pages/Setting';

function App() {
  const [tab, setTab] = useState(0);

  const handleChange = (_event: SyntheticEvent, index: number) => {
    setTab(index);
  };

  return (
    <Stack justifyContent="center" alignItems="center">
      <Tabs onChange={handleChange} value={tab}>
        <Tab value={0} label="Deploy" />
        <Tab value={1} label="Setting" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <Deploy />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Setting />
      </TabPanel>
    </Stack>
  );
}

export default App;
