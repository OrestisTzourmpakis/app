import "./Dashboard.css";
import { TabContext } from "../../contexts/tabContext";
import { useContext } from "react";
import { tabs } from "../../config.json";
import { Grid } from "@material-ui/core";
import WidgetLg from "../../components/widgets/WidgetLg";
import LineChartCustom from "../../components/charts/LineChart";
import { chartData } from "../../services/dummyData";
import { DataGrid } from "@material-ui/data-grid";
import { users } from "../../services/dummyData";
import { Link } from "react-router-dom";
import _ from "lodash";
import {
  ArrowUpward,
  ArrowDownward,
  ShoppingCartOutlined,
  Store,
  Loyalty,
  PermIdentity,
} from "@material-ui/icons";

export default function Dashboard() {
  const columns = [
    {
      field: "username",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <Link className="topUsername" to={`/stores/${params.row.id}`}>
            {params.row.username}
          </Link>
        );
      },
    },
    {
      field: "joined",
      headerName: "Date joined",
      width: 120,
    },
    {
      field: "points",
      headerName: "Loyalty Points",
      width: 160,
    },
    {
      field: "change",
      headerName: "Up/Down last month",
      width: 160,
      renderCell: (params) => {
        return (
          <div
            className={`monthlyPointsChange ${
              params.row.change > 0 ? "pointsGreen" : "pointsRed"
            }`}
          >
            <div className="userPointsLastMonth">{params.row.change}</div>
            {params.row.change > 0 ? <ArrowUpward /> : <ArrowDownward />}
          </div>
        );
      },
    },
  ];
  return (
    <div className="dashboardWrapper">
      <Grid container>
        <Grid item md={4}>
          <WidgetLg
            title="Total Stores"
            style={{
              background: "linear-gradient(#f6d365, #fda085)",
            }}
            bodyNumber={486}
            Icon={<Store className="widgetLgIcon" />}
            footerNumber={20}
            footerTitle="Last Month"
          />
        </Grid>
        <Grid item md={4}>
          <WidgetLg
            title="Active Sales"
            style={{
              background: "linear-gradient(#005c97, #363795)",
            }}
            bodyNumber={20}
            Icon={<Loyalty className="widgetLgIcon" />}
            footerNumber={2}
            footerTitle="Last Month"
          />
        </Grid>
        <Grid item md={4}>
          <WidgetLg
            title="Total Users"
            style={{
              background: "linear-gradient(#1d976c, #93f9b9)",
            }}
            bodyNumber={2000}
            Icon={<PermIdentity className="widgetLgIcon" />}
            footerNumber={30}
            footerTitle="Last Month"
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <div className="lineChart">
            <LineChartCustom
              data={chartData}
              title="Users per month"
              grid
              dataKey="Active User"
            />
          </div>
        </Grid>
        <Grid item xs={12} mt={3}>
          <div className="usersTopTable">
            <div className="usersTopTableTitle">
              <h3>Top 30 Users Last Month</h3>
            </div>
            <DataGrid
              disableSelectionOnClick
              rows={_.orderBy(users, ["points"], ["desc"])}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
