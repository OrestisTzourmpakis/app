import http from "./httpService";
import {apiUrl} from "../config.json";
import _ from "lodash";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";

const apiEndpoint = apiUrl + "/useraccount/login";
const tokenKey = "token";
export async function login(email,password)
{
    const {data:{token:jwt}} = await http.post(apiEndpoint,{email,password});
    console.log(jwt);
    // const token = _.get(data,'data.token');
    console.log("asdfsdf");
    //localStorage.setItem(tokenKey,jwt);
}