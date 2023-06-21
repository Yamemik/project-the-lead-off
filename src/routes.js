import { createBrowserRouter } from "react-router-dom";

import Platform from "./pages/Platform";
import Landing from "./pages/Landing";

import SuitableOrders from "./pages/Platform/SuitableOrders";
import SaleOrders from "./pages/Platform/SaleOrders";
import ArchiveOrders from "./pages/Platform/ArchiveOrders";
import RejectionOrders from "./pages/Platform/RejectionOrders";
import Order from "./pages/Platform/Order";
import Profile from "./pages/Platform/Profile";
import ActiveOrders from "./pages/Platform/ActiveOrders";

import AdminPanelHome from "./pages/Platform/AdminPanel/AdminPanelHome";
import AdminPanelAuth from "./pages/Platform/AdminPanel/AdminPanelAuth";
import AdminPanelFinance from "./pages/Platform/AdminPanel/AdminPanelFinance";
import AdminPanelUsers from "./pages/Platform/AdminPanel/AdminPanelUsers";
import AdminPanelOrders from "./pages/Platform/AdminPanel/AdminPanelOrders";
import AdminPanelSettings from "./pages/Platform/AdminPanel/AdminPanelSettings";

import OutletMain from "./components/Outlets/OutletMain";
import OutletAdmin from "./components/Outlets/OutletAdmin";

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
            {
                path: "order/:id",
                element: <Order />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "archive-orders",
                element: <ArchiveOrders />,
            },
            {
                path: "rejection-orders",
                element: <RejectionOrders />,
            },
        ],
    },
    {
        path: "/platform/admin-panel",
        element: <OutletAdmin />,
        children: [
            {
                path: "auth",
                element: <AdminPanelAuth />,
            },
            {
                path: "home",
                element: <AdminPanelHome />,
            },
            {
                path: "users",
                element: <AdminPanelUsers />,
            },
            {
                path: "orders",
                element: <AdminPanelOrders />,
            },
            {
                path: "analytics",
                element: <AdminPanelFinance />,
            },
            {
                path: "settings",
                element: <AdminPanelSettings />,
            },
        ],
    },
]);

export default routes;
