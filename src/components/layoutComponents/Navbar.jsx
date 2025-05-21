"use client";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { IoLeafOutline } from "react-icons/io5";
import {RiProfileLine, RiLogoutCircleLine,RiNotification2Line} from "react-icons/ri"
import { BreadCrumpComponent } from "@/components/ui/Breadcrumb";
import CustomTheme from "@/themes/customThemes";
import { DrawerComponent } from "@/components/ui/Drawer";
import { AuthUserContext } from "@/contextManager/context/AppContext";
import { AlertWithResponse } from "@/utils/Alerts";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserImg from "/user.jpg"

export function NavbarComponent() {
  //Getting user from userContext
  const { user, testLogout } = useContext(AuthUserContext);
  //creating react router dom navigator 
  const navigate = useNavigate();
  //Function to handle logout
  const handleLogout = () => {
    AlertWithResponse(
      "Logout", 
      "Are sure you want to logout?", 
      //function to run after user confirms to logout
      ()=> {
        console.log("Yes, logout success")
        testLogout(); // this is a dummy logout test
        setTimeout(() => {navigate("/login");}, 0);
      })
  }
  return (
    <Navbar fluid className="shadow-lg top-0 z-50 sticky" theme={CustomTheme.themeNavbar}>
      <div className="flex items-center">
      <DrawerComponent/>
      <Navbar.Brand href="/">
        <IoLeafOutline className="hidden md:block mr-4 w-7 h-7"/>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Agricom</span>
      </Navbar.Brand>
      <BreadCrumpComponent />
      </div>
      <div className="flex items-center gap-2 md:order-2">
        <div className="flex items-center gap-2">
        <p className="md:block md:text-xl dark:text-white font-semibold hidden">{user.fullname}</p>
        <Dropdown arrowIcon={true} inline label={<Avatar alt="User settings" img={ user ? UserImg: null} rounded />}>
          <Dropdown.Item href="/profile" icon={RiProfileLine} >User Profile</Dropdown.Item>
          <Dropdown.Item href="/sms-messages" icon={RiNotification2Line}>Notification</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout} icon={RiLogoutCircleLine}>Sign out</Dropdown.Item>
        </Dropdown>
        </div>
      </div>
    </Navbar>
  );
}
