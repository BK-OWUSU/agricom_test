// import PropTypes from "prop-types";
import { FaSms, FaMailBulk  } from "react-icons/fa";
import { TabItem, Tabs  } from "flowbite-react";
import CustomTheme from "@/themes/customThemes";
// import { Email } from "./email/Email";

function SmsAndMessages() {
  return (
    <main className="h-fit bg-white">
      <Tabs aria-label="Tabs with icons" variant="underline"theme={CustomTheme.themeTabs}>
        <TabItem icon={FaMailBulk} active title="Email Messages">
          {/* <Email/> */}
          <div className="flex items-center justify-center h-screen">
           <span className="text-2xl font-bold text-center">Development In Progress</span>
          </div>
        </TabItem>
        <TabItem icon={FaSms} active title="SMS">
            <div className="flex items-center justify-center h-screen">
               <span className="text-2xl font-bold text-center">Development In Progress</span>
            </div>
        </TabItem>
      </Tabs> 
    </main>
  )
}

export default SmsAndMessages