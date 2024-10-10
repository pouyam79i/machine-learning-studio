import { Children, createContext, useState } from "react";

/**
 *  app status list.
 *
 *  dev is the default state: development, done, idle.
 *
 *  run is for algorithm execution: compile -> upload -> execute -> display results.
 *
 *  save is for saving diagram.
 *
 *  load is for loading diagram.
 */
const APP_STATUS = ["dev", "run", "save", "load"];

/**
 *  global app parameters in context.
 */
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [appNodesDataChanger, setAppNodesDataChanger] = useState({
    setNodes: null,
  });
  const [selectedItem, setSelectedItem] = useState();
  const [appStatus, setAppStatus] = useState("dev");
  const [engineStatus, setEngineStatus] = useState("Disconnected");
  const [popupData, setPopupData] = useState({
    title: "K-NN model on Iris",
    data: "", // could be a url or base64 encoded string
    type: "base64", // set to 'base64' or 'url'.
  });
  const [showPopUp, setShowPopUp] = useState(false);

  const changeSelectedItem = (newItem) => {
    setSelectedItem(newItem);
  };

  const changeAppStatus = (newAppStatus) => {
    if (APP_STATUS.indexOf(newAppStatus) === -1)
      console.log("illegal app status: " + newAppStatus);
    else setAppStatus(newAppStatus);
  };

  const changePopupData = (title = "", data = "", type = "") => {
    setPopupData({
      title: title,
      data: data,
      type: type,
    });
  };

  return (
    <AppContext.Provider
      value={{
        useItem: { selectedItem, changeSelectedItem },
        useAppStatus: { appStatus, changeAppStatus },
        usePopUp: { popupData, showPopUp, setShowPopUp, changePopupData },
        useEngineStatus: { engineStatus, setEngineStatus },
        appNodesRelatedData: { appNodesDataChanger, setAppNodesDataChanger },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
