import {
    Home,
    Store,
    PermIdentity,
    TrendingUp,
    Timeline,
    AttachMoney,
    BarChart,
    Category,
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
      title: "Προσφορές",
      tab: tabs.Sales,
    },
    {
      id: 3,
      icon: <Store className="menuTileIcon" />,
      title: "Επιχείρηση",
      tab: tabs.Companies,
    },
    {
      id: 4,
      icon: <PermIdentity className="menuTileIcon" />,
      title: "Χρήστες",
      tab: tabs.Users,
    },
  {
    id: 5,
    icon: <Store className="menuTileIcon" />,
    title: "Καταστήματα",
    tab: tabs.Stores,
  },
  {
    id: 6,
    icon: <Category className="menuTileIcon" />,
    title: "Κατηγορίες",
    tab: tabs.Categories,
  },
  ];