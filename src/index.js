import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import "./dark.scss";
import { Provider } from "react-redux";
import { store } from "./globalStore/store";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <RouterProvider router={routes} />
    </Provider>,
);
