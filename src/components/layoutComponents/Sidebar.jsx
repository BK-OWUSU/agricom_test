import PropTypes from "prop-types";
import { Sidebar } from "flowbite-react";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthUserContext } from "@/contextManager/context/AppContext";
import CustomTheme from "@/themes/customThemes";
import { AlertWithResponse } from "@/utils/Alerts";
import { hasAccess } from "@/utils/utilityFunction";

// Importing icons
import { RiLogoutCircleLine}  from "react-icons/ri";
import { sidebarItems } from "@/components/layoutComponents/sidebarItems";

export function SidebarComponent({ menuIsOpen }) {
  const { user, testLogout } = useContext(AuthUserContext);
  const [isHovered, setIsHovered] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(null);
  const navigate = useNavigate();
  
  const handleMouseEnter = () => {
    if (!menuIsOpen) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOpenCollapse(null);
  };

  const handleCollapseClick = (key) => {
    setOpenCollapse(prev => (prev === key ? null : key));
  };

  const handleLogout = () => {
    AlertWithResponse("Logout", "Are you sure you want to logout?", () => {
      testLogout();
      setTimeout(() => navigate("/login"), 0);
    });
  };

  const isExpanded = isHovered || menuIsOpen;
  

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ width: isExpanded ? "16rem" : "4rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed h-fit md:h-screen bg-green-700 md:shadow-xl ${menuIsOpen ? "ml-[0.5rem]" : "ml-[-6rem]"} md:ml-0 z-40 md:flex flex-col overflow-hidden overflow-y-auto`}
    >
      <Sidebar aria-label="Sidebar with multi-level dropdown" theme={CustomTheme.themeSidebar}>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {sidebarItems.map((item, idx) => (
              hasAccess(user, item.access) && (
              item.children ? (
                <Sidebar.Collapse
                  key={idx}
                  icon={item.icon}
                  label={isExpanded ? item.label : undefined}
                  open={openCollapse === item.collapseKey}
                  onClick={() => handleCollapseClick(item.collapseKey)}
                >
                  {item.children.map((subItem, subIdx) => (
                    hasAccess(user, subItem.access) &&
                    <Sidebar.Item
                      key={subIdx}
                      href={subItem.href}
                      icon={isExpanded && subItem.icon}
                    >
                      {isExpanded ? subItem.label : undefined}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              ) : (
                <Sidebar.Item
                  key={idx}
                  href={item.href}
                  icon={item.icon}
                >
                  {isExpanded ? item.label : undefined}
                </Sidebar.Item>
              )
              )
            ))}
            {/* Logout button */}
            <Sidebar.Item 
              onClick = {handleLogout} 
              className = "cursor-pointer" 
              icon = {(isExpanded || !menuIsOpen) && RiLogoutCircleLine}
              >
              {isHovered || menuIsOpen ? "Logout" : undefined}
          </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </motion.div>
  );
}

SidebarComponent.propTypes = {
  menuIsOpen: PropTypes.bool,
};
