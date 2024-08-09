import React, { useContext } from "react";
import { Context } from "../App";

const PropsPanel = () => {
  const {
    useItem: { selectedItem },
  } = useContext(Context);

  // Return empty props panel
  if (!selectedItem || !selectedItem.props)
    return (
      <div className="props-panel">
        <div className="header">Properties</div>
        <div className="body">no item is selected!</div>
      </div>
    );

  return (
    <div className="props-panel">
      <div className="header">{selectedItem.title}</div>
      <div className="body">Other info</div>
    </div>
  );
};

export default PropsPanel;
