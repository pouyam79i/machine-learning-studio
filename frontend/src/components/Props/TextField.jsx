import React, { useCallback, useContext, useState } from "react";
import { DiagramContext } from "../../engine/DiagramEngine";

const TextField = ({ prop }) => {
  // const [isValueChanged, setIsValueChanged] = useState(false);

  // const {
  //   nodeRelated: [nodes, setNodes],
  // } = useContext(DiagramContext);

  // const onChange = useCallback(() => {
  //   setIsValueChanged(true);
  // }, []);

  // const onKeyDown = useCallback((evt) => {
  //   if (evt.code == "Enter") {
  //     setIsValueChanged(false);
  //     setNodes((nds) =>
  //       nds.map((node) => {
  //         if (node.id === data.id) {
  //           return {
  //             ...node,
  //             data: {
  //               ...node.data,
  //               label: evt.target.value,
  //             },
  //           };
  //         }

  //         return node;
  //       })
  //     );
  //   }
  // }, []);

  return (
    <div className="prop-text-field">
      <label>{prop.title}</label>
      <input
        placeholder={prop.tag + "..."}
        defaultValue={prop.data || ""}
      ></input>
    </div>
  );
};

export default TextField;
