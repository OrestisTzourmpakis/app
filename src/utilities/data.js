import {
    Home,
    Store,
    PermIdentity,
    TrendingUp,
    Timeline,
    AttachMoney,
    BarChart,
} from "@mui/icons-material";
import { tabs } from "../config.json";

export const dashboardMenu = [
    {
      id: 1,
      // icon: <Home />,
      icon: <Home className="menuTileIcon" />,
      title: "Dashboard",
      tab: tabs.Dashboard,
    },
    {
      id: 2,
      icon: <Timeline className="menuTileIcon" />,
      title: "Analytics",
      tab: tabs.Analytics,
    },
    {
      id: 3,
      icon: <TrendingUp className="menuTileIcon" />,
      title: "Sales",
      tab: tabs.Sales,
    },
    {
      id: 4,
      icon: <Store className="menuTileIcon" />,
      title: "Companies",
      tab: tabs.Companies,
    },
    {
      id: 5,
      icon: <PermIdentity className="menuTileIcon" />,
      title: "Users",
      tab: tabs.Users,
    },
    {
      id: 6,
      icon: <AttachMoney className="menuTileIcon" />,
      title: "Product Sales",
      tab: tabs["Product Sales"],
    },
    {
      id: 7,
      icon: <BarChart className="menuTileIcon" />,
      title: "Reports",
      tab: tabs.Reports,
  },
  {
    id: 8,
    icon: <Store className="menuTileIcon" />,
    title: "Stores",
    tab: tabs.Store,
  },
  ];