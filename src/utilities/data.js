import {
    Home,
    Store,
    PermIdentity,
    TrendingUp,
    Timeline,
    AttachMoney,
    BarChart,
} from "@material-ui/icons";
import { tabs } from "../config.json";

export const dashboardMenu = [
    {
      id: 1,
      icon: <Timeline className="menuTileIcon" />,
      title: "Analytics",
      tab: tabs.Analytics,
    },
    {
      id: 2,
      icon: <TrendingUp className="menuTileIcon" />,
      title: "Offers",
      tab: tabs.Sales,
    },
    {
      id: 3,
      icon: <Store className="menuTileIcon" />,
      title: "Companies",
      tab: tabs.Companies,
    },
    {
      id: 4,
      icon: <PermIdentity className="menuTileIcon" />,
      title: "Users",
      tab: tabs.Users,
    },
  {
    id: 5,
    icon: <Store className="menuTileIcon" />,
    title: "Stores",
    tab: tabs.Stores,
  },
  ];