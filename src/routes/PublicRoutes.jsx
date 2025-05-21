import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthUserContext } from "@/contextManager/context/AppContext";
import { Loader } from "@/components/ui/Loader";

export function PublicRoutes() {
    const { loading } = useContext(AuthUserContext);
    if (loading) {
        return (<Loader/>); 
    }
    return <Outlet />;
}
