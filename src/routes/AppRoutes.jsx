// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate  } from "react-router-dom";
import MainLayout from "@/Layouts/MainLayout";
import { useContext } from "react";
//ACCESSIBLE ROUTES
import Profile from "@/Pages/Profile/Profile";
import {Login} from "@/Pages/Login/Login"

import Dashboard from "@/Pages/Dashboard/Dashboard";
//NOTIFICATION
import SmsAndMessages from "@/Pages/Notifications/smsAndMessages/SmsAndMessages";
import AuditAndTrails from "@/Pages/Notifications/auditTrails/AuditAndTrails";
//FARMERS
import ManageFarmer from "@/Pages/Farmers/manageFarmer/ManageFarmer";
import FarmLandDetails from "@/Pages/Farmers/FarmLandDetails/FarmLandDetails";
//CROPS AND YIELD
import FarmActivity from "@/Pages/CropsAndYield/farmActivity/FarmActivity"
import CropsAndYield from "@/Pages/CropsAndYield/manageCropsAndYield/CropsAndYield";
//INCOME AND EXPENSE
import Expenditure from "@/Pages/IncomeAndExpenses/Expenditure/Expenditure"
import Income from "@/Pages/IncomeAndExpenses/Income/Income"
import InsuranceAndClaims from "@/Pages/IncomeAndExpenses/InsuranceAndClaims/InsuranceAndClaims"
import Loans from "@/Pages/IncomeAndExpenses/Loans/Loans"
//USERS
import Employees from "@/Pages/Users/Employees/Employees"
import ManageUsers from "@/Pages/Users/ManageUsers/ManageUsers"
import UserLogs from "@/Pages/Users/UserLogs/UserLogs"
//REPORTS
import CropsReport from "@/Pages/Reports/CropsReport/CropsReport"
import FarmersReport from "@/Pages/Reports/FarmersReport/FarmersReport"
import EmployeesReport from "@/Pages/Reports/EmployeesReport/EmployeesReport";
import FinancialReport from "@/Pages/Reports/FinancialReport/FinancialReport"
import FarmLandReport from "@/Pages/Reports/FarmLandReport/FarmLandReport"
import WeatherReport from "@/Pages/Reports/WeatherReport/WeatherReport"
//SETTINGS
import ManageCategories from "@/Pages/SettingsPage/ManageCategories/ManageCategories"
import AccessControl from "@/Pages/SettingsPage/AccessControl/AccessControl"
import SystemParameters from "@/Pages/SettingsPage/SystemParameters/SystemParameters";
//PROTECTED ROUTE WRAPPER
import { ProtectedRoutes } from "@/routes/ProtectedRoutes";
//
import { AuthUserContext } from "@/contextManager/context/AppContext";
import { hasAccess} from "@/utils/utilityFunction";

const routesData = [
  { element: <Dashboard />, path: "/dashboard", access: "dashboard" },
  { element: <AuditAndTrails />, path: "/audit-trails", access: "audit-trails" },
  { element: <SmsAndMessages />, path: "/sms-messages", access: "sms-messages" },
  { element: <ManageFarmer />, path: "/manage-farmer", access: "manage-farmer" },
  { element: <FarmLandDetails />, path: "/farmland-details", access: "farmland-details" },
  { element: <CropsAndYield />, path: "/crops-yields", access: "crops-yields" },
  { element: <FarmActivity />, path: "/farm-activity", access: "farm-activity" },
  { element: <Expenditure />, path: "/expenditure", access: "expenditure" },
  { element: <Income />, path: "/income", access: "income" },
  { element: <InsuranceAndClaims />, path: "/insurance-claims", access: "insurance-claims" },
  { element: <Loans />, path: "/loans", access: "loans" },
  { element: <Employees />, path: "/employees", access: "employees" },
  { element: <ManageUsers />, path: "/manage-users", access: "manage-users" },
  { element: <UserLogs />, path: "/user-logs", access: "user-logs" },
  { element: <CropsReport />, path: "/crops-report", access: "crops-report" },
  { element: <FarmersReport />, path: "/farmers-report", access: "farmers-report" },
  { element: <EmployeesReport />, path: "/employees-report", access: "employees-report" },
  { element: <FinancialReport />, path: "/financial-report", access: "financial-report" },
  { element: <FarmLandReport />, path: "/farmlands-report", access: "farmlands-report" },
  { element: <WeatherReport />, path: "/weather-report", access: "weather-report" },
  { element: <SystemParameters />, path: "/system-params", access: "system-params" },
  { element: <AccessControl />, path: "/access-control", access: "access-control" },
  { element: <ManageCategories />, path: "/manage-categories", access: "manage-categories" },
];

const AppRoutes = () => {

  const {user} = useContext(AuthUserContext);


 return (
  <Routes>
    {/* Public Route */}
    <Route path="/login" element={<Login />} />
    {/* Protected Routes */}
    <Route element={<ProtectedRoutes />}>
      <Route element={<MainLayout />}>
        <Route path="/profile" element={<Profile />} />
        {/* Access routes */}
        {
          routesData.map((route)=> (
           hasAccess(user, route.access) && <Route 
             key={route.access}
             path={route.path}
             element = {route.element}
            />
          ))
        }
        {/* Access routes */}
      </Route>
    </Route>

    {/* Catch-all: redirect unknown routes */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
  )
};

export default AppRoutes;
