import React, { createContext } from "react";

function useDetails() {
  const [tabDetails, setTabDetails] = useState({
    data: {},
    methods: {
      addMethod: (() => {})(),
      updateMethod: (() => {})(),
    },
  });
}

export const TabDetailsContext = createContext();
export function TabDetailsContextProvider(props) {
  const details = useDetails();
  return (
    <TabDetailsContext.Provider value={{ ...details }}>
      {props.children}
    </TabDetailsContext.Provider>
  );
}
