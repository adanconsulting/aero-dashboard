import React from "react";
import { Switch, Redirect, Route, BrowserRouter } from "react-router-dom";
import Router from "./core/Router";
import SimpleRouter from "./core/Router/SimpleRouter";

import { Main as MainLayout } from "./core/Layouts";
import Dashboard from "views/Dashboard";
import { Properties } from "views/Properties";
import NewProperty from "views/Properties/NewProperty";
import {
  Communication,
  Files,
  FollowUp,
  Information,
  Map,
  NewFiles,
  NewPhotos,
  NotesBoardInfo,
  Photos,
  Repairs,
  SubjectDNA,
  SubjectInformation,
  SubjectLegalInfo,
  SubjectPricing,
} from "views/Properties/SingleProperty";
import { NewVendor, VendorDetail, Vendors } from "views/Vendors";
import { VendorPayment, VendorPay } from "views/Vendors/Payment";
import Maps from "views/Maps";
import Settings from "views/Settings";
import Admin from "views/Admin";
import AllUsers from "views/Admin/AllUsers";
import Notifications from "views/Admin/Notifications";
import SubscriptionReport from "views/Admin/SubscriptionReport";
import SiteStatistics from "views/Admin/SiteStatistics";
import FreeUser from "views/Admin/FreeUser";
import AffiliatedUsers, { AffiliatePay } from "views/Admin/AffiliatedUsers";
import Training from "views/Training";
import SignIn from "views/SignIn";
import SignUp from "views/SignUp";
import TermsAndConditions from "views/TermsAndConditions";
import ForgetPassword from "views/ForgetPassword";
import ResetPassword from "views/ResetPassword";
import ExpireAccount from "views/ExpireAccount";
import NotFound from "views/NotFound";
import Forbidden from "views/Forbidden";
import Help from "views/Help";
import PrivacyPolicy from "views/PrivacyPolicy";
import VendorEarning from "views/Vendors/Earning";
import CancelAccounts from "views/Admin/CancelAccounts";
import UpgradeAccount from "views/UpgradeAccount";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Router
          privateRoute
          component={Dashboard}
          exact
          layout={MainLayout}
          layoutTitle="Dashboard"
          path="/"
        />
        <Router
          privateRoute
          component={Properties}
          exact
          layout={MainLayout}
          layoutTitle="Properties"
          path="/properties"
        />
        <Router
          privateRoute
          component={NewProperty}
          exact
          layout={MainLayout}
          layoutTitle="New Property"
          path="/property/new"
        />
        <Router
          privateRoute
          component={Information}
          exact
          layout={MainLayout}
          layoutTitle="Property -> Information"
          path="/property/information/:id"
        />
        <Router
          privateRoute
          component={NotesBoardInfo}
          exact
          layout={MainLayout}
          layoutTitle="Property -> Notes and board info"
          path="/property/notes-board-info/:id"
        />
        <Router
          privateRoute
          component={SubjectInformation}
          exact
          layout={MainLayout}
          layoutTitle="Property -> Subject taxes -> info"
          path="/property/subject-taxes/information/:id"
        />
        <Router
          privateRoute
          component={SubjectPricing}
          exact
          layout={MainLayout}
          layoutTitle="Property -> Subject taxes -> pricing"
          path="/property/subject-taxes/pricing/:id"
        />
        <Router
          privateRoute
          component={SubjectDNA}
          exact
          layout={MainLayout}
          layoutTitle="Property -> Subject taxes -> DNA"
          path="/property/subject-taxes/dna/:id"
        />
        <Router
          privateRoute
          component={SubjectLegalInfo}
          exact
          layout={MainLayout}
          layoutTitle="Property -> Subject taxes -> legal info"
          path="/property/subject-taxes/legal-info/:id"
        />
        <Router
          privateRoute
          component={Repairs}
          exact
          layout={MainLayout}
          layoutTitle="Property -> Repairs"
          path="/property/repairs/:id"
        />
        <Router
          privateRoute
          component={Communication}
          exact
          layout={MainLayout}
          layoutTitle="Property -> Communication"
          path="/property/communication/:id"
        />
        <Router
          privateRoute
          component={Photos}
          exact
          layout={MainLayout}
          layoutTitle="Property -> Photos"
          path="/property/files-photos/photos/:id"
        />
        <Router
          privateRoute
          component={Files}
          exact
          layout={MainLayout}
          layoutTitle="Property -> Files"
          path="/property/files-photos/files/:id"
        />
        <Router
          privateRoute
          component={NewPhotos}
          exact
          layout={MainLayout}
          layoutTitle="Property -> New Photos"
          path="/property/files-photos/new-photos/:id/:albumId?"
        />
        <Router
          privateRoute
          component={NewFiles}
          exact
          layout={MainLayout}
          layoutTitle="Property -> New Files"
          path="/property/files-photos/new-files/:id"
        />
        <Router
          privateRoute
          component={Map}
          exact
          layout={MainLayout}
          layoutTitle="Property -> Map"
          path="/property/map/:id"
        />
        <Router
          privateRoute
          component={FollowUp}
          exact
          layout={MainLayout}
          layoutTitle="Property -> Follow up"
          path="/property/follow-up/:id"
        />
        <Router
          privateRoute
          component={Vendors}
          exact
          layout={MainLayout}
          layoutTitle="Vendors"
          path="/vendors"
        />
        <Router
          privateRoute
          component={VendorDetail}
          exact
          layout={MainLayout}
          layoutTitle="Vendor -> Detail"
          path="/vendor/detail/:id"
        />
        <Router
          privateRoute
          component={NewVendor}
          exact
          layout={MainLayout}
          layoutTitle="New Vendor"
          path="/vendor/new"
        />
        <Router
          privateRoute
          component={VendorPayment}
          exact
          layout={MainLayout}
          layoutTitle="Vendor -> Payment"
          path="/vendor/payment"
        />
        <Router
          privateRoute
          component={VendorPay}
          exact
          layout={MainLayout}
          layoutTitle="Vendor -> Pay"
          path="/vendor/pay/:vendorId"
        />
        <Router
          privateRoute
          component={VendorEarning}
          exact
          layout={MainLayout}
          layoutTitle="Earning"
          path="/earning"
        />
        <Router
          privateRoute
          component={Maps}
          exact
          layout={MainLayout}
          layoutTitle="Maps"
          path="/maps"
        />
        <Router
          privateRoute
          component={Settings}
          exact
          layout={MainLayout}
          layoutTitle="Settings"
          path="/settings"
        />

        <Router
          privateRoute
          component={Admin}
          exact
          layout={MainLayout}
          layoutTitle="Admin"
          path="/admin"
        />
        <Router
          privateRoute
          component={AllUsers}
          exact
          layout={MainLayout}
          layoutTitle="Admin -> All Users"
          path="/admin/all-users"
        />
        <Router
          privateRoute
          component={Notifications}
          exact
          layout={MainLayout}
          layoutTitle="Admin -> Notifications"
          path="/admin/notifications"
        />
        <Router
          privateRoute
          component={SubscriptionReport}
          exact
          layout={MainLayout}
          layoutTitle="Admin -> Subscription Report"
          path="/admin/subscription-report/:id"
        />
        <Router
          privateRoute
          component={SiteStatistics}
          exact
          layout={MainLayout}
          layoutTitle="Admin -> Site Statistics"
          path="/admin/site-statistics"
        />
        <Router
          privateRoute
          component={FreeUser}
          exact
          layout={MainLayout}
          layoutTitle="Admin -> Free User"
          path="/admin/free-user"
        />
        <Router
          privateRoute
          component={AffiliatedUsers}
          exact
          layout={MainLayout}
          layoutTitle="Admin -> Affiliated Users"
          path="/admin/affiliated-users-of/:id"
        />
        <Router
          privateRoute
          component={AffiliatePay}
          exact
          layout={MainLayout}
          layoutTitle="Admin -> Affiliated Users -> Pay"
          path="/admin/affiliated-pay/:userId"
        />

        <Router
          privateRoute
          component={CancelAccounts}
          exact
          layout={MainLayout}
          layoutTitle="Admin -> Cancel Accounts"
          path="/admin/cancel-accounts"
        />

        <Router
          privateRoute
          component={Training}
          exact
          layout={MainLayout}
          layoutTitle="Training"
          path="/training/:playlist"
        />

        <Router
          privateRoute
          component={Help}
          exact
          layout={MainLayout}
          layoutTitle="Help & Support"
          path="/help"
        />

        <SimpleRouter title="Sign in" path="/sign-in" page={SignIn} />
        <SimpleRouter
          title="Sign up"
          path="/sign-up/:affiliate?"
          page={SignUp}
        />
        <SimpleRouter
          title="Terms and Conditions"
          path="/terms-and-conditions"
          page={TermsAndConditions}
        />
        <SimpleRouter
          title="Privacy Policy"
          path="/privacy-policy"
          page={PrivacyPolicy}
        />
        <SimpleRouter
          title="Forget Password"
          path="/forget-password"
          page={ForgetPassword}
        />
        <SimpleRouter
          title="Reset Password"
          path="/reset-password/:token"
          page={ResetPassword}
        />
        <SimpleRouter
          title="Expire Account"
          path="/expire-account"
          page={ExpireAccount}
        />
        <SimpleRouter
          title="Upgrade Account"
          path="/upgrade-account"
          page={UpgradeAccount}
        />
        <SimpleRouter
          title="Page not found"
          path="/not-found"
          page={NotFound}
        />
        <SimpleRouter
          title="Forbidden Access"
          path="/forbidden"
          page={Forbidden}
        />

        <Route
          exact
          path="/affiliate/:id"
          render={(props) => (
            <Redirect to={`/sign-up/${props.match.params.id}`} />
          )}
        />

        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
