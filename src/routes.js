import { createBrowserRouter } from "react-router-dom";

import Platform from "./pages/Platform";
import Landing from "./pages/Landing";

import NotFound from "./pages/NotFound";

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
import Auth from "./pages/Platform/Auth";
import Demo from "./pages/Platform/Demo";
import AdminPanelUser from "./pages/Platform/AdminPanel/AdminPanelUser";
import AdminPanelEditUser from "./pages/Platform/AdminPanel/AdminPanelEditUser";
import AdminPanelCreateUser from "./pages/Platform/AdminPanel/AdminPanelCreateUser";
import AdminPanelOrder from "./pages/Platform/AdminPanel/AdminPanelOrder";
import AdminPanelRejectionOrder from "./pages/Platform/AdminPanel/AdminPanelRejectionOrder";
import AdminPanelRejections from "./pages/Platform/AdminPanel/AdminPanelRejection";
import AdminPanelDuplicates from "./pages/Platform/AdminPanel/AdminPanelDuplicates";
import AdminPanelCreateOrder from "./pages/Platform/AdminPanel/AdminPanelCreateOrder";
import AdminPanelEditOrder from "./pages/Platform/AdminPanel/AdminPanelEditOrder";
import RememberPassword from "./pages/Platform/RememberPassword";

const routes = createBrowserRouter([
    {
        path: "/platform/admin-panel/auth",
        element: <AdminPanelAuth />,
    },
    {
        path: "/platform/auth",
        element: <Auth />,
    },
    {
        path: "/platform/remember-password",
        element: <RememberPassword />,
    },
    {
        path: "/platform/demo",
        element: <Demo />,
    },
    {
        path: "/",
        errorElement: <NotFound />,
    },
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
            {
                path: "user/:id",
                element: <AdminPanelUser />,
            },
            {
                path: "edit-user/:id",
                element: <AdminPanelEditUser />,
            },
            {
                path: "create-user",
                element: <AdminPanelCreateUser />,
            },
            {
                path: "order/:id",
                element: <AdminPanelOrder />,
            },
            {
                path: "rejection-order/:id",
                element: <AdminPanelRejectionOrder />,
            },
            {
                path: "rejections",
                element: <AdminPanelRejections />,
            },
            {
                path: "duplicates",
                element: <AdminPanelDuplicates />,
            },
            {
                path: "create-order",
                element: <AdminPanelCreateOrder />,
            },
            {
                path: "edit-order/:id",
                element: <AdminPanelEditOrder />,
            },
        ],
    },
]);

export default routes;
