import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/Statistics/";


export async function getTotalUsers(email = null)
{
    let totalUsers = apiEndpoint + "getTotalUsers";
    const { data } = await http.post(totalUsers, {
        companyOwnerEmail:email
    });
    return data;
}


export async function getTotalStores(email = null)
{
    let totalStores = apiEndpoint + "getTotalStores";
    const { data } = await http.post(totalStores, {
        companyOwnerEmail:email
    });
    return data;
}

export async function getTotalActiveSales(email = null)
{
    let totalActiveSales = apiEndpoint + "getTotalActiveSales";
    const { data } = await http.post(totalActiveSales, {
        companyOwnerEmail:email
    });
    return data;
}


export async function getLast6Months(email = null)
{
    let last6monthts = apiEndpoint + "getLast6Months";
    const { data } = await http.post(last6monthts, {
        companyOwnerEmail:email
    });
    return data;
}

export async function getTotalRedeemEarnedPoints(email = null)
{
    let totalRedeemEarnedPoints = apiEndpoint + "getTotalEarnedAndRedeemPoint";
    const { data } = await http.post(totalRedeemEarnedPoints, {
        companyOwnerEmail:email
    });
    return data;
}

export async function getTop30Users(email = null)
{
    let top30Users = apiEndpoint + "getTop30Users";
    const { data } = await http.post(top30Users, {
        companyOwnerEmail:email
    });
    return data;
}

