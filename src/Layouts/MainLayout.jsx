import { Outlet, useLocation } from "react-router-dom";
import { NavbarComponent } from "@/components/layoutComponents/Navbar";
import { SidebarComponent } from "@/components/layoutComponents/Sidebar";
import { useState, useContext, useMemo } from "react";
import { AuthUserContext } from "@/contextManager/context/AppContext";
import { appRoutesKeys } from "@/utils/ArraysData";

const MainLayout = () => {
  const { user } = useContext(AuthUserContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSideMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const location = useLocation();
  const currentPath = location.pathname;

  //Accept the currentPath as parameter
  const currentAccessKey = useMemo(() => {
    const firstSegment = currentPath.replace(/^\//, "").split("/")[0];
    return appRoutesKeys.find((key) => key === firstSegment) || null;
  }, [currentPath]);


  // Check access
  const hasAccess = useMemo(() => {
    return user?.role === "admin" || (user?.access && user.access.includes(currentAccessKey));
  }, [user, currentAccessKey]);


  if (!hasAccess) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <NavbarComponent handleSideMenuTriggerOnMobile={handleSideMenuToggle} />
      <div className="flex flex-1 overflow-hidden bg-gray-100">
        <SidebarComponent sidebarOpenState={sidebarOpen} />
        <main className="md:ml-16 flex-1 overflow-y-auto p-3 bg-white shadow-md">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
