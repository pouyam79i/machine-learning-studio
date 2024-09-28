import React, { useCallback, useContext, useState } from "react";
import { Context } from "../../App";

const TextField = ({ prop, node_hash }) => {
  const [isValueChanged, setIsValueChanged] = useState(false);

  const {
    appNodesRelatedData: { appNodesDataChanger, setAppNodesDataChanger },
  } = useContext(Context);

  const onChange = useCallback(() => {
    setIsValueChanged(true);
  }, []);

  const onKeyDown = useCallback((evt) => {
    if (evt.code == "Enter") {
      setIsValueChanged(false);
      appNodesDataChanger.setNodes((nds) =>
        nds.map((node) => {
          if (node.id == node_hash) {
            console.log(node.id + "=" + "changed")
            return {
              ...node,
              data: {
                ...node.data,
                props: node.data.props.map((p) => {
                  if (p.id == prop.id)
                    return {
                      ...p,
                      data: evt.target.value,
                    };
                  else return p;
                }),
              },
            };
          }

          return node;
        })
      );
    }
  }, []);

  return (
    <div className="prop-text-field">
      <label>{prop.title}</label>
      <input
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={prop.tag + "..."}
        defaultValue={prop.data || ""}
        style={{ border: isValueChanged ? "1px solid red" : "none" }}
      ></input>
    </div>
  );
};

export default TextField;
