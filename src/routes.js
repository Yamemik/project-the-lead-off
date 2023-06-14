import { createBrowserRouter } from "react-router-dom";

import Platform from "./pages/Platform";
import Landing from "./pages/Landing";
import SuitableOrders from "./pages/Platform/SuitableOrders";
import SaleOrders from "./pages/Platform/SaleOrders";

import OutletMain from "./components/Outlets/OutletMain";
import ActiveOrders from "./pages/Platform/ActiveOrders";

const routes = createBrowserRouter([
    {
        path: "/landing",
        element: <Landing />,
    },
    {
        path: "/platform",
        element: <OutletMain />,
        children: [
            {
                path: "home",
                element: <Platform />,
            },
            {
                path: "suitable-orders",
                element: <SuitableOrders />,
            },
            {
                path: "sale-orders",
                element: <SaleOrders />,
            },
            {
                path: "active-orders",
                element: <ActiveOrders />,
            },
        ],
    },
]);

export default routes;
