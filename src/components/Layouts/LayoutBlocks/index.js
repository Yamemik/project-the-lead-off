import "./LayoutBlocks.scss";
import { useEffect } from "react";
import axios from "../../../utils/axios";

const LayoutBlocks = ({ children, addClass }) => {

    useEffect(() => {
        axios
            .get("/api/user/me")
            .then(({ data }) =>
                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        Object.assign({}, data, {
                            token: JSON.parse(localStorage.getItem("user"))
                                .token,
                        }),
                    ),
                ),
            )
            .catch(err => console.log(err));
    }, []);

    return <div className={`layoutBlocks ${addClass}`}>{children}</div>;
};

export default LayoutBlocks;
