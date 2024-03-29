import React, { createContext, useState } from "react";

export const TabBarSectionContext = createContext();
export function TabbarSectionContextProvider(props) {
  const [display, setDisplay] = useState(true);
  return (
    <TabBarSectionContext.Provider value={{ display, setDisplay }}>
      {props.children}
    </TabBarSectionContext.Provider>
  );
}
