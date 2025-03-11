"use client"

const { Provider } = require("react-redux")
import {store} from "./store"

export const Providers = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  