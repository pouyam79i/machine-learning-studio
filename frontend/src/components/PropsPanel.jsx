import React, { useContext } from "react";
import { Context } from "../App";
import Description from "./Props/Description";
import TextField from "./Props/TextField";

const PropsPanel = () => {
  const {
    useItem: { selectedItem },
  } = useContext(Context);

  // Return empty props panel
  if (!selectedItem || !selectedItem.props)
    return (
      <div className="props-panel">
        <div className="header">Properties</div>
        <div className="body">
          <div className="props-description">
            <div className="head">{"No item is selected!"}</div>
            <div className="description">{""}</div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="props-panel">
      <div className="header">{selectedItem.title}</div>
      <div className="body">
        {selectedItem.props.map((prop, index) => {
          switch (prop.type) {
            case "text-field":
              return <TextField key={index} prop={prop}></TextField>;
            case "description":
              return <Description key={index} prop={prop}></Description>;
            default:
              break;
          }
        })}
      </div>
    </div>
  );
};

export default PropsPanel;
