import Header from "../../../components/Header";
import AuthForm from "../../../components/AuthForm";

const Demo = () => {
    return (
        <>
            <Header needAuth />
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "calc(100vh - 150px)"
            }}>
                    <AuthForm demo/>
            </div>
        </>
    );
};

export default Demo;
