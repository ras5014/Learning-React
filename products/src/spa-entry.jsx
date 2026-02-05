import React from "react";
import * as ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import App from "./App";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  renderType: "createRoot",
  rootComponent: App,
  errorBoundary(err, info, props) {
    return <div>Error loading products microfrontend</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
export default lifecycles;
