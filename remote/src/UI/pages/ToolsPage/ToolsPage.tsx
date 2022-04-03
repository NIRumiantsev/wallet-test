import { useMemo } from 'react';
import { DepthDTO } from 'types';
import { DepthList } from 'UI';

import './ToolsPage.scss';

type ToolsPageProps = {
  depthData: DepthDTO,
}

const ToolsPage = (props: ToolsPageProps) => {
  const {
    depthData,
  } = props;

  const bidsList = useMemo(() => <DepthList type="BIDS" items={depthData?.bids}/>, [depthData?.bids]);

  const asksList = useMemo(() => <DepthList type="ASKS" items={depthData?.asks}/> , [depthData?.asks]);

  return (
    <div className="ToolsPage">
      <div className="ToolsPage_container">
        <div className="ToolsPage_column">
          <h2>Bids</h2>
          {depthData?.bids && bidsList}
        </div>
        <div className="ToolsPage_column">
          <h2>Asks</h2>
          {depthData?.asks && asksList}
        </div>
      </div>
    </div>
  )
};

export { ToolsPage }