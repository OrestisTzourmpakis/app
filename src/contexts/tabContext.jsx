import React, { createContext, useState } from "react";
import { tabs } from "../config.json";

export const TabContext = createContext();
export function TabContextProvider(props) {
  const [tab, setTab] = useState(tabs.Analytics);

  const changeTab = (newTab) => {
    console.log("called!");
    setTab(newTab);
  };

  return (
    <TabContext.Provider value={{ tab, changeTab }}>
      {props.children}
    </TabContext.Provider>
  );
}
