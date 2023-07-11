import AuthForm from "../../../../components/AuthForm";

const AdminPanelAuth = () => {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <AuthForm
                type="admin-auth"
            />
        </div>
    );
};

export default AdminPanelAuth;
