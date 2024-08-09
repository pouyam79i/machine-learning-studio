import React, { useContext } from "react";
import { Context } from "../App";
import Description from "./Props/Description";

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
      <div className="body">
        {selectedItem.props.map((prop, index) => {
          switch (prop.type) {
            case "text-field":
              break;
            case "description":
              return (
                <Description
                  key={index}
                  title={prop.title}
                  href={prop.href}
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
