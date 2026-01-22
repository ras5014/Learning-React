import React from "react";
import { Provider } from "react-redux";
import { store } from "../app/store";

export default function FallbackStoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
