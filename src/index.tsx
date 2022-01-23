import React from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./Routes";
import configureStore from "./store/storeConfiguration";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
