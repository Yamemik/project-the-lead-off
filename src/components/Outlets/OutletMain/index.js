import { Outlet } from "react-router-dom";
import Header from "./../../Header";

const OutletMain = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default OutletMain;
