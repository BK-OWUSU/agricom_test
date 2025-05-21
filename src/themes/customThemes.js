const CustomTheme = {
    //SIDEBAR THEMES
    themeSidebar: {root: {
    base: "h-full",
    collapsed: {
      on: "w-16",
      off: "w-64"
    },
    inner: "h-full border border-green-800 overflow-y-auto overflow-x-hidden md:rounded bg-green-800 px-3 py-4"
  },
  collapse: {//Sidebar collapse items {sidebar items}
    button: "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-green-700",
    icon: {
      base: "h-6 w-6 text-white transition duration-75 group-hover:text-white",
      open: {
        off: "",
        on: "text-white"
      }
    },
    label: {
      base: "ml-3 flex-1 whitespace-nowrap text-left text-white", //Collapse sidebar labels
      icon: {
        base: "h-6 w-6 transition delay-0 ease-in-out text-white",
        open: {
          on: "rotate-180",
          off: ""
        }
      }
    },
  },
  item: {//Sidebar item
    base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-green-700",
    collapsed: {
      insideCollapse: "group w-full pl-8 transition duration-75",
      noIcon: "font-bold"
    },
    content: {//sidebarItem content
      base: "flex-1 whitespace-nowrap px-3 text-white"  
    },
    icon: {//sidebarsItem icon
      base: "h-6 w-6 flex-shrink-0 text-white transition duration-75",
    },
  },
 }
 ,
// NAVBAR THEMES
 themeNavbar: {
  root: {
    base: "bg-green-800 px-2 py-2.5 text-white sm:px-4",
  },
  brand: {
    base: "flex items-center"
  }
 },
 //TABS THEME
 themeTabs: {
  tablist: {
      variant: {underline: "-mb-px flex-wrap border-b border-gray-200"},
      tabitem: {
        base :"flex items-center justify-center rounded-none p-4 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400",
        variant: {
          underline:{
            base: "rounded-none",
            active: {
              on: "border-b-2 border-green-600 text-green-600",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600"
            }
          }
        }
      }
  },  
 },
 //
}
export default CustomTheme