import "./Dashboard.css";
import { useContext } from "react";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import WidgetLg from "../../components/widgets/WidgetLg";
import _ from "lodash";
import { Store, Loyalty, PermIdentity } from "@material-ui/icons";
import { useEffect } from "react";
import { useState } from "react";
import {
  getLast6Months,
  getTop30Users,
  getTotalActiveSales,
  getTotalRedeemEarnedPoints,
  getTotalStores,
  getTotalUsers,
} from "../../services/statistics";
import { UserContext } from "../../contexts/userContext";
import useTable from "../../components/common/useTable";
import HorizontalBarChart from "../../components/common/horizontalBarChart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    marginTop: "20px",
  },
  horizontalChartWrapper: {},
  verticalChartWrapper: {},
}));
export default function Dashboard() {
  const { isAdmin, authed } = useContext(UserContext);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStores, setTotalStores] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [last6Months, setLast6Months] = useState([]);
  const [totalRedeemEarnedPoints, setTotalRedeemEarnedPoints] = useState([]);
  const [top30Users, setTop30Users] = useState([]);
  const classes = useStyles();
  const top30UsersColumns = [
    { id: "username", label: "Username" },
    { id: "email", label: "Email" },
    { id: "total", label: "Total" },
    { id: "dateJoined", label: "Date Joined" },
  ];
  const {
    TableContainer,
    TableHeader,
    TablePaginationCustom,
    recordsAfterPaging,
  } = useTable(top30Users, top30UsersColumns, ["username", "email", "total"]);
  const totalRedeemAdmin = [
    {
      name: "Redeem",
      value: 0,
    },
    {
      name: "Earned",
      value: 0,
    },
  ];
  const last6MonthsAdmin = [
    {
      name: "Month1",
      value: 0,
    },
    {
      name: "Month2",
      value: 0,
    },
    {
      name: "Month3",
      value: 0,
    },
    {
      name: "Month4",
      value: 0,
    },
    {
      name: "Month5",
      value: 0,
    },
    {
      name: "Month6",
      value: 0,
    },
  ];

  useEffect(() => {
    const Init = async () => {
      try {
        const userEmail = isAdmin() ? null : authed.email;
        const activeSales = await getTotalActiveSales(userEmail);
        const users = await getTotalUsers(userEmail);
        const stores = await getTotalStores(userEmail);
        let last6Months;
        let totalPoints;
        if (isAdmin()) {
          last6Months = [...last6MonthsAdmin];
          totalPoints = [...totalRedeemAdmin];
          setLast6Months(last6Months);
          //setTotalRedeemEarnedPoints(totalPoints);
        } else {
          const top30Users = await getTop30Users(userEmail);
          setTop30Users(top30Users.data);
          last6Months = await getLast6Months(userEmail);
          // totalPoints = await getTotalRedeemEarnedPoints(userEmail);
          setLast6Months(last6Months.data);
          //setTotalRedeemEarnedPoints(totalPoints.data);
        }

        setTotalUsers(users.data);
        setTotalStores(stores.data);
        setTotalSales(activeSales.data);
        console.log("Ta data:", activeSales.data);
      } catch (ex) {}
    };
    Init();
  }, [authed]);

  return (
    <div className="dashboardWrapper">
      <Grid container>
        <Grid item md={4}>
          <WidgetLg
            title="Total Stores"
            style={{
              background: "linear-gradient(#f6d365, #fda085)",
            }}
            bodyNumber={totalStores}
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
            bodyNumber={totalSales}
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
            bodyNumber={totalUsers}
            Icon={<PermIdentity className="widgetLgIcon" />}
            footerNumber={30}
            footerTitle="Last Month"
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} mt={3}>
          <Box
            style={{ marginTop: "40px", marginBottom: "40px" }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography variant="h5" align="center">
              Top 30 Users
            </Typography>
            <TableContainer key="tableContainer">
              <TableHeader />
              <TableBody>
                {recordsAfterPaging().map((item) => (
                  <TableRow key={item.username}>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.total}</TableCell>
                    <TableCell>{item.dateJoined}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
            <TablePaginationCustom />
          </Box>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={12}
          mt={2}
          style={{ marginTop: "40px" }}
        >
          {/* <Grid item xs={12} md={6}>
            <HorizontalBarChart data={last6Months} />
          </Grid> */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" flexDirection="column">
              <Typography variant="h5" style={{ marginBottom: "30px" }}>
                Total Earned and Redeem Points in the last 6 Monhts
              </Typography>
              <BarChart width={700} height={300} data={last6Months}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  interval={0}
                  dx={10}
                  dy={-3}
                  minTickGap={-200}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="redeemed" fill="#8884d8" />
                <Bar dataKey="earned" fill="#82ca9d" />
              </BarChart>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
