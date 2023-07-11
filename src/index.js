import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import "./dark.scss";
import { Provider } from "react-redux";
import { store } from "./globalStore/store";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <Toaster
            position="bottom-right"
            toastOptions={{
                success: {
                    style: {
                        background: "#1F2A37",
                        color: "#fff",
                        fontSize: "16px"
                    },
                },
                error: {
                    style: {
                        background: "#1F2A37",
                        color: "#fff",
                        fontSize: "16px"
                    },
                },
            }}
        />
        <RouterProvider router={routes} />
    </Provider>,
);
