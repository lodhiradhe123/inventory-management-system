import { Component, createContext, useEffect, useState } from "react";
import axios from "../utils/Axios";

export const componentsContext = createContext(null);

const Context = (props) => {
  const [component, setComponent] = useState([]);
  useEffect(() => {
    axios
      .get("/component")
      .then((responce) => {
        setComponent(responce.data);
        // console.log(responce.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  return (
    <componentsContext.Provider value={[component, setComponent]}>
      {props.children}
    </componentsContext.Provider>
  );
};

export default Context;
