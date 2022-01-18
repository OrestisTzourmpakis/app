import React, { createContext } from "react";

function useDetails() {
  const [tabDetails, setTabDetails] = useState({
    data: {},
    methods: {
      addMethods: (() => {})(),
    },
  });
}

export const TabDetailsContext = createContext();
function TabDetailsContextProvider() {
  return <div></div>;
}

export default tabDetailsContext;
