import _ from "lodash";



export function updateInput(key,newValue,data,setData) { 
        const prevState = { ...data };
        _.set(prevState, key, newValue);
        setData({ ...data, ...prevState  });    
}