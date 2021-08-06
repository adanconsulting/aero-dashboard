import React from "react";
import HouseIcon from "@material-ui/icons/House";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import InfoIcon from "@material-ui/icons/Info";
import NoteIcon from "@material-ui/icons/Note";
import SubjectIcon from "@material-ui/icons/Subject";
import RestorePageIcon from "@material-ui/icons/RestorePage";
import ForumIcon from "@material-ui/icons/Forum";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import MapIcon from "@material-ui/icons/Map";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import GavelIcon from "@material-ui/icons/Gavel";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import DescriptionIcon from "@material-ui/icons/Description";
import SettingsIcon from "@material-ui/icons/Settings";
import DashboardIcon from "@material-ui/icons/Dashboard";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import HelpIcon from "@material-ui/icons/Help";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";

import { UserTypes } from "constant/Enums";

const menuList = [
  {
    title: "Dashboard",
    link: "/",
    permissions: {
      deny: [UserTypes.VENDOR],
    },
    icon: <DashboardIcon />,
  },
  {
    title: "Properties",
    link: "/properties",
    icon: <HouseIcon />,
    children: [
      {
        title: "Properties",
        link: "/properties",
        icon: <HouseIcon />,
        parent: true,
      },
      {
        title: "Information",
        link: "/property/information",
        params: ["id"],
        icon: <InfoIcon />,
      },
      {
        title: "Notes/Board Info",
        link: "/property/notes-board-info",
        params: ["id"],
        icon: <NoteIcon />,
      },
      {
        title: "Subject/Taxes",
        link: "/property/subject-taxes/information",
        params: ["id"],
        icon: <SubjectIcon />,
        children: [
          {
            title: "Subject/Taxes",
            link: "/property/information",
            params: ["id"],
            icon: <SubjectIcon />,
            parent: true,
          },
          {
            title: "Information",
            link: "/property/subject-taxes/information",
            params: ["id"],
            icon: <InfoIcon />,
          },
          {
            title: "Pricing",
            link: "/property/subject-taxes/pricing",
            params: ["id"],
            icon: <MonetizationOnIcon />,
          },
          {
            title: "DNA",
            link: "/property/subject-taxes/dna",
            params: ["id"],
            icon: <AllInclusiveIcon />,
          },
          {
            title: "Legal Information",
            link: "/property/subject-taxes/legal-info",
            params: ["id"],
            icon: <GavelIcon />,
          },
        ],
      },
      {
        title: "Repairs",
        link: "/property/repairs",
        params: ["id"],
        icon: <RestorePageIcon />,
      },
      {
        title: "Communication",
        link: "/property/communication",
        params: ["id"],
        icon: <ForumIcon />,
      },
      {
        title: "Files/Photos",
        link: "/property/files-photos/photos",
        params: ["id"],
        icon: <PhotoCameraIcon />,
        children: [
          {
            title: "Files/Photos",
            link: "/property/information",
            params: ["id"],
            icon: <PhotoCameraIcon />,
            parent: true,
          },
          {
            title: "Photos",
            link: "/property/files-photos/photos",
            params: ["id"],
            icon: <PhotoLibraryIcon />,
          },
          {
            title: "Files",
            link: "/property/files-photos/files",
            params: ["id"],
            icon: <DescriptionIcon />,
          },
        ],
      },
      {
        title: "Map",
        link: "/property/map",
        params: ["id"],
        icon: <MapIcon />,
      },
      {
        title: "Follow up",
        link: "/property/follow-up",
        params: ["id"],
        icon: <DirectionsRunIcon />,
      },
    ],
  },
  {
    title: "Vendor",
    link: "/vendors",
    icon: <PeopleAltIcon />,
    permissions: {
      deny: [UserTypes.VENDOR],
    },
    children: [
      {
        title: "Dashboard",
        link: "/",
        icon: <DashboardIcon />,
        parent: true,
      },
      {
        title: "Vendor",
        link: "/vendors",
        icon: <PeopleAltIcon />,
        permissions: {
          deny: [UserTypes.VENDOR],
        },
      },
      {
        title: "Vendor Payment",
        link: "/vendor/payment",
        icon: <LocalAtmIcon />,
        permissions: {
          deny: [UserTypes.VENDOR],
        },
      },
    ],
  },
  {
    title: "Earning",
    link: "/earning",
    icon: <MonetizationOnIcon />,
    permissions: {
      allow: [UserTypes.VENDOR],
    },
    children: [],
  },
  {
    title: "Maps",
    link: "/maps",
    icon: <MapIcon />,
    children: [],
  },
  {
    title: "Settings",
    link: "/settings",
    icon: <SettingsIcon />,
    children: [],
  },
  {
    title: "Training",
    link: "/training/PLY5nMiRWs-1pvxAZlUm4Uq2aT6S_YHWpa",
    icon: <MenuBookIcon />,
    children: [
      {
        title: "Dashboard",
        link: "/",
        permissions: {
          deny: [UserTypes.VENDOR],
        },
        icon: <DashboardIcon />,
        parent: true,
      },
      {
        title: "Basic Trainings",
        link: "/training/PLY5nMiRWs-1pvxAZlUm4Uq2aT6S_YHWpa",
        matchingLink: "/training",
        icon: <PeopleAltIcon />,
      },
      // {
      //   title: "Affiliated Program",
      //   link: "/training/REPLACE-PLAYLIST-ID",
      //   matchingLink: "/training",
      //   icon: <MonetizationOnIcon />,
      // },
      // {
      //   title: "Reports",
      //   link: "/training/REPLACE-PLAYLIST-ID",
      //   matchingLink: "/training",
      //   icon: <AssessmentIcon />,
      // },
      // {
      //   title: "Main User",
      //   link: "/training/REPLACE-PLAYLIST-ID",
      //   matchingLink: "/training",
      //   icon: <AccountCircleIcon />,
      // },
    ],
  },
  {
    title: "Help & Support",
    link: "/help",
    icon: <HelpIcon />,
    children: [],
  },
  {
    title: "Admin",
    link: "/admin/all-users",
    icon: <VerifiedUserIcon />,
    permissions: {
      allow: [UserTypes.ADMIN],
    },
    children: [
      {
        title: "Dashboard",
        link: "/",
        icon: <DashboardIcon />,
        parent: true,
      },
      {
        title: "All Users",
        link: "/admin/all-users",
        icon: <RecentActorsIcon />,
        permissions: {
          allow: [UserTypes.ADMIN],
        },
      },
      {
        title: "Notifications",
        link: "/admin/notifications",
        icon: <AddAlertIcon />,
        permissions: {
          allow: [UserTypes.ADMIN],
        },
      },
      {
        title: "SiteStatistics",
        link: "/admin/site-statistics",
        icon: <EqualizerIcon />,
        permissions: {
          allow: [UserTypes.ADMIN],
        },
      },
      {
        title: "FreeUser",
        link: "/admin/free-user",
        icon: <PersonAddIcon />,
        permissions: {
          allow: [UserTypes.ADMIN],
        },
      },
      {
        title: "Cancel Accounts",
        link: "/admin/cancel-accounts",
        icon: <PersonAddDisabledIcon />,
        permissions: {
          allow: [UserTypes.ADMIN],
        },
      },
    ],
  },
];

export default menuList;
