import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import RequireAuth from "./utilities/requireAuth";
import Dashboard from "./pages/dashboard/Dashboard";
import Stores from "./pages/stores/Stores";
import Company from "./pages/companies/Company";
import Users from "./pages/users/users";
import Sales from "./pages/sales/sales";
import SalesForm from "./pages/sales/salesForms";
import { formTypes } from "./config.json";
import Profile from "./pages/profile/Profile";
import StoresForm from "./pages/stores/storesForm";
import AssignUserToCompany from "./pages/companies/assignUserToCompany";
import CompanyForm from "./pages/companies/companyForm";
import MyComapny from "./pages/profile/myCompany";
import UserForm from "./pages/users/userForm";
import UserPoints from "./pages/users/userPoints";
import PointsForm from "./pages/users/pointsForm";
import LoginPage from "./pages/login/LoginPage";
import { Store } from "@material-ui/icons";
import "./pages/stores/Stores.css";
import "./pages/stores/Store.css";
import MainPage from "./pages/mainPage";
import ExternalLoginPage from "./pages/login/externalLoginPage";

export const mainRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/external-login" element={<ExternalLoginPage />} />
      <Route path="/*" element={<MainPage />} />
    </Routes>
  </Router>
);

export const createRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      }
    />
    <Route
      path="stores"
      element={
        <RequireAuth>
          <Stores />
        </RequireAuth>
      }
    />
    <Route
      path="companies"
      element={
        <RequireAuth admin={true}>
          <Company />
        </RequireAuth>
      }
    />
    <Route
      path="users"
      element={
        <RequireAuth>
          <Users />
        </RequireAuth>
      }
    />
    <Route
      path="sales"
      element={
        <RequireAuth>
          <Sales />
        </RequireAuth>
      }
    />
    <Route
      path="sales/:saleId"
      element={
        <RequireAuth>
          <SalesForm
            defaultData={{
              title: "",
              description: "",
              image: "",
              dateStart: 0,
              dateEnd: 0,
            }}
            formType={formTypes.view}
          />
        </RequireAuth>
      }
    />
    <Route
      path="sales/add"
      element={
        <RequireAuth>
          <SalesForm
            defaultData={{
              title: "",
              description: "",
              image: "",
              dateStart: 0,
              dateEnd: 0,
              imageFile: null,
            }}
            formType={formTypes.add}
          />
        </RequireAuth>
      }
    />
    <Route
      path="profile"
      element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      }
    />

    <Route
      path={`stores/:storeId`}
      element={
        <RequireAuth>
          <StoresForm
            defaultData={{
              address: "",
            }}
            formType={formTypes.view}
          />
        </RequireAuth>
      }
    />
    <Route
      path={`stores/assignUser`}
      element={
        <RequireAuth>
          <AssignUserToCompany
            defaultData={{
              email: "",
            }}
            formType={formTypes.add}
          />
        </RequireAuth>
      }
    />
    <Route
      path={`stores/add`}
      element={
        <RequireAuth>
          <StoresForm
            defaultData={{
              address: "",
              telephone: "",
            }}
            formType={formTypes.add}
          />
        </RequireAuth>
      }
    />
    <Route
      path={`companies/add`}
      element={
        <RequireAuth admin={true}>
          <CompanyForm
            defaultData={{
              name: "",
              logo: "",
              website: "",
              twitter: "",
              instagram: "",
              facebook: "",
              ownerEmail: "",
              pointsToEuro: 0,
              euroToPoints: 0,
            }}
            formType={formTypes.add}
          />
        </RequireAuth>
      }
    />
    <Route
      path="companies/sales/add"
      element={
        <RequireAuth admin={true}>
          <SalesForm
            defaultData={{
              title: "",
              description: "",
              image: "",
              dateStart: 0,
              dateEnd: 0,
              imageFile: null,
            }}
            formType={formTypes.add}
          />
        </RequireAuth>
      }
    />
    <Route
      path={`companies/:companyId`}
      element={
        <RequireAuth admin={true}>
          <CompanyForm
            defaultData={{
              name: "",
              logo: "",
              website: "",
              twitter: "",
              instagram: "",
              facebook: "",
              ownerEmail: "",
              pointsToEuro: 0,
              euroToPoints: 0,
            }}
            formType={formTypes.view}
          />
        </RequireAuth>
      }
    />
    <Route
      path="companies/sales"
      element={
        <RequireAuth admin={true}>
          <Sales />
        </RequireAuth>
      }
    />
    <Route
      path={`mycompany`}
      element={
        <RequireAuth>
          <MyComapny />
        </RequireAuth>
      }
    />
    <Route
      path={`companies/:companyId/stores`}
      element={
        <RequireAuth admin={true}>
          <Stores />
        </RequireAuth>
      }
    />
    <Route
      path={`companies/:companyId/stores/add`}
      element={
        <RequireAuth admin={true}>
          <StoresForm
            defaultData={{
              address: "",
            }}
            formType={formTypes.add}
          />
        </RequireAuth>
      }
    />
    <Route
      path={`companies/:companyId/stores/assignUser`}
      element={
        <RequireAuth admin={true}>
          <AssignUserToCompany
            defaultData={{
              email: "",
            }}
            formType={formTypes.add}
          />
        </RequireAuth>
      }
    />
    <Route
      path={`companies/:companyId/stores/:storeId`}
      element={
        <RequireAuth admin={true}>
          <StoresForm
            defaultData={{
              address: "",
            }}
            formType={formTypes.view}
          />
        </RequireAuth>
      }
    />
    <Route
      path={`users/add`}
      element={
        <RequireAuth>
          <UserForm
            defaultData={{
              userName: "",
              email: "",
              password: "",
              owner: false,
            }}
            formType={formTypes.add}
          />
        </RequireAuth>
      }
    />
    <Route
      path={`users/:userId`}
      element={
        <RequireAuth admin={true}>
          <UserForm
            defaultData={{
              userName: "",
              email: "",
            }}
            formType={formTypes.view}
          />
        </RequireAuth>
      }
    />
    <Route
      path={`users/userPoints/:userId`}
      element={
        <RequireAuth>
          <UserPoints />
        </RequireAuth>
      }
    />
    <Route
      path={`users/userPoints/:userId/setPoints`}
      element={
        <RequireAuth>
          <PointsForm
            defaultData={{
              euro: 0,
            }}
            formType={formTypes.add}
            redeem={false}
          />
        </RequireAuth>
      }
    />
    <Route
      path={`users/userPoints/:userId/redeemPoints`}
      element={
        <RequireAuth>
          <PointsForm
            defaultData={{
              redeem: 0,
            }}
            formType={formTypes.add}
            redeem={true}
          />
        </RequireAuth>
      }
    />

    <Route path="login" element={<LoginPage />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
