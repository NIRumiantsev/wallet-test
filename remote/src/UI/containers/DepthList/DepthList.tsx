import { Value } from 'types';
import { v4 as uuidv4 } from 'uuid';

import './DepthList.scss';

type DepthListProps = {
  items: Value[],
  type: 'BIDS' | 'ASKS'
};

const DepthList = (props: DepthListProps) => {
  const {
    items,
    type
  } = props;

  return (
    <ul className="DepthList">
      {items.map((item, index) =>
        <li
          key={uuidv4()}
          className={`DepthList_item--${type}`}
        >
          <span className="DepthList_value">{item[0]}</span>
          <span className={`DepthList_value--${type}`}>{item[1]}</span>
        </li>
      )}
    </ul>
  )
};

export { DepthList }