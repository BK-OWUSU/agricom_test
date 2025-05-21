import {HiChartPie, HiBell, HiUser, HiMail} from "react-icons/hi";
import { AiOutlineAudit } from "react-icons/ai";
import {TbListDetails, TbActivity, TbMoneybag, TbUsersPlus,TbLogs, TbReport, TbReportMoney, TbCategoryPlus} from "react-icons/tb";
import {GiFarmer, GiFruitTree, GiCash, GiSettingsKnobs,GiTreeBranch, GiMasterOfArms} from "react-icons/gi";
import {SiExpensify} from "react-icons/si";
import {FaBoxes, FaHandHoldingUsd, FaPeopleCarry, FaCloudSunRain} from "react-icons/fa";
import {RiSecurePaymentLine, RiLandscapeFill} from "react-icons/ri";
import {MdOutlineManageAccounts, MdAccessibility} from "react-icons/md";
import { PiFarm } from "react-icons/pi";
import { GrSystem } from "react-icons/gr";


export const sidebarItems = [
    {
      label: "Dashboard",
      access: "dashboard",
      href: "/dashboard",
      icon: HiChartPie,
    },
    {
      label: "Notification",
      access: "notification",
      icon: HiBell,
      collapseKey: "notification",
      children: [
        { label: "Audit Trails", href: "/audit-trails", icon: AiOutlineAudit, access:"audit-trails"},
        { label: "SMS & Messages", href: "/sms-messages", icon: HiMail, access:"sms-messages" },
      ],
    },
    {
      label: "Farmers",
      access: "farmers",
      icon: GiFarmer,
      collapseKey: "farmers",
      children: [
        { label: "Manage Farmer", href: "/manage-farmer", icon: TbListDetails , access:"manage-farmer"},
        { label: "Farmland Details", href: "/farmland-details", icon: RiLandscapeFill, access:"farmland-details" },
      ],
    },
    {
      label: "Crops & Yield",
      access: "crops",
      icon: GiFruitTree,
      collapseKey: "crops",
      children: [
        { label: "Crop Yield", href: "/crops-yields", icon: FaBoxes, access:"crops-yields" },
        { label: "Farm Activity", href: "/farm-activity", icon: TbActivity, access:"farm-activity" },
      ],
    },
    {
      label: "Income & Exp",
      access: "income-exp",
      icon: GiCash,
      collapseKey: "income",
      children: [
        { label: "Expenditure", href: "/expenditure", icon: SiExpensify, access:"expenditure" },
        { label: "Income", href: "/income", icon: TbMoneybag, access:"income" },
        { label: "Loans", href: "/loans", icon: FaHandHoldingUsd, access:"loans" },
        { label: "Insurance & Claims", href: "/insurance-claims", icon: RiSecurePaymentLine, access:"insurance-claims" },
      ],
    },
    {
      label: "Users",
      access: "users",
      icon: HiUser,
      collapseKey: "users",
      children: [
        { label: "Employees", href: "/employees", icon: TbUsersPlus, access:"employees" },
        { label: "User Management", href: "/manage-users", icon: MdOutlineManageAccounts, access:"manage-users" },
        { label: "User Logs", href: "/user-logs", icon: TbLogs, access:"user-logs" },
      ],
    },
    {
      label: "Reports",
      access: "reports",
      icon: TbReport,
      collapseKey: "reports",
      children: [
        { label: "Financial", href: "/financial-report", icon: TbReportMoney, access:"financial-report" },
        { label: "Crops", href: "/crops-report", icon: GiTreeBranch, access:"crops-reports" },
        { label: "Farmers", href: "/farmers-report", icon: GiMasterOfArms, access: "farmers-report" },
        { label: "Farm Lands", href: "/farmlands-report", icon: PiFarm, access:"farmland-report" },
        { label: "Employees", href: "/employees-report", icon: FaPeopleCarry, access:"employees-report" },
        { label: "Weather", href: "/weather-report", icon: FaCloudSunRain, access:"weather-report" },
      ],
    },
    {
      label: "Settings",
      access: "settings",
      icon: GiSettingsKnobs,
      collapseKey: "settings",
      children: [
        { label: "Manage Categories", href: "/manage-categories", icon: TbCategoryPlus, access:"manage-categories" },
        { label: "Access Control", href: "/access-control", icon: MdAccessibility, access:"access-control" },
        { label: "System Parameters", href: "/system-params", icon: GrSystem, access:"system-params" },
      ],
    },
  ];