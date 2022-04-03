import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { serviceContainer } from 'core';
import { Select } from 'UI';
import { mockPares } from 'utils';
// @ts-ignore
import { ToolsPage } from 'remote/ToolsPage';

import 'styles/index.css';
import './App.scss';

const App = observer(() => {
  const [currentSymbol, setCurrentSymbol] = useState<string>('BNBBTC');
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  useEffect(() => {
    receiveDepthData();
  }, [currentSymbol]);

  const receiveDepthData = async () => {
    setDataLoading(true);
    await serviceContainer.binanceService.getDepth(currentSymbol);
    serviceContainer.binanceService.openDepthWS(currentSymbol.toLowerCase());
    setDataLoading(false);
  };

  return (
    <div className="App">
      <h1>Market Depth</h1>
      <Select
        title="Select a trading pair"
        value={currentSymbol}
        options={mockPares}
        onChange={(value: string) => setCurrentSymbol(value)}
      />
      {
        dataLoading ? (
          <div className="App_loader">Loading...</div>
        ) : (
          <ToolsPage depthData={serviceContainer.binanceStore.depth}/>
        )
      }
    </div>
  )
});

export { App }