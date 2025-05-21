
import { Breadcrumb } from "flowbite-react";
import { RxDashboard } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";

export function BreadCrumpComponent() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <Breadcrumb aria-label="Breadcrumb" className="ml-5 hidden lg:block">
      <Breadcrumb.Item icon={()=> <RxDashboard className="mr-2 text-gray-50"/>}>
        <Link to="/" className="text-gray-300 font-bold">Dashboard</Link>
      </Breadcrumb.Item>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
        <Breadcrumb.Item key={to} ><span className="text-gray-300 font-thin">{value}</span></Breadcrumb.Item>
        ) : (
        <Breadcrumb.Item key={to}>
        <Link to={to} >{value}</Link>
    </Breadcrumb.Item>
  );
})}
    </Breadcrumb>
  );
}