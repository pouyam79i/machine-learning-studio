import React, { useContext } from "react";
import { Context } from "../App";

const PropsPanel = () => {
  const {
    useItem: { selectedItem },
  } = useContext(Context);

  // Return empty props panel
  if (!selectedItem || !selectedItem.props)
    return <div className="props-panel"></div>;

  return <div className="props-panel">{selectedItem.title}</div>;
};

export default PropsPanel;
