import { Outlet } from "react-router-dom";
import HeaderAdminPanel from "./../../HeaderAdminPanel";
import MenuAdminPanel from "../../MenuAdminPanel";

const OutletAdmin = () => {
    return (
        <>
            <HeaderAdminPanel />
            <MenuAdminPanel />
            <Outlet />
        </>
    );
};

export default OutletAdmin;
