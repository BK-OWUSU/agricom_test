"use client";
import { Drawer } from "flowbite-react";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { SidebarComponent } from "../layoutComponents/Sidebar";

// ONLY FOR MOBILE PHONE VIEW
export function DrawerComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    <main>
      <TiThMenu onClick={() => setIsOpen(true)} className="md:hidden mr-4 w-7 h-7 cursor-pointer"  />
      <Drawer open={isOpen} onClose={handleClose} className="bg-green-800 overflow-hidden overflow-y-auto">
        <Drawer.Header title="Agricom" 
        theme={
          {inner: {
            titleText: "text-white", 
            closeIcon: "text-white", 
            closeButton:"absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-green-700 hover:text-white"
          }
          }
        } 
          titleIcon={() => <></>} />
        <Drawer.Items>
          <SidebarComponent menuIsOpen={isOpen}/>
        </Drawer.Items>
      </Drawer>
    </main>
  );
}
