import React, { createContext, useState } from "react";

export const FormContext = createContext();
function FormContextProvoder(props) {
  const [data, setData] = useState({
    data: "",
    methods: {
      addMethod: () => {},
      updateMethod: () => {},
    },
    validation: () => {},
  });
  return (
    <FormContext.Provider value={{ ...data }}>
      {props.children}
    </FormContext.Provider>
  );
}

export default FormContextProvoder;
