import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import Description from "./Props/Description";
import TextField from "./Props/TextField";

const PropsPanel = () => {
  const {
    useItem: { selectedItem },
  } = useContext(AppContext);

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
  else if (!selectedItem.props)
    return (
      <div className="props-panel">
        <div className="header">Properties</div>
        <div className="body">
          <div className="props-description">
            <div className="head">{"Empty property!"}</div>
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
              return (
                <TextField
                  key={selectedItem.id + "@" + index}
                  node_hash={selectedItem.id}
                  prop={prop}
                ></TextField>
              );
            case "description":
              return (
                <Description
                  key={selectedItem.id + "@" + index}
                  prop={prop}
                ></Description>
              );
            default:
              break;
          }
        })}
      </div>
    </div>
  );
};

export default PropsPanel;
