import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/points/";

export async function updatePoints(user)
{
    let updatePoints = apiEndpoint + `setPoints`;
    const { data } = await http.put(updatePoints, user);
    return data;
}

export async function getUserPointsPerCompany(email,ownerEmail)
{
    let userPoints = apiEndpoint + `getUserPointsPerCompany?email=${email}&ownerEmail=${ownerEmail}`;
    const { data } = await http.get(userPoints);
    return data;
}

export async function getUserPointsAllCompanies(email)
{
    let userPoints = apiEndpoint + `getUserPointsAllCompanies?email=${email}`;
    const { data } = await http.get(userPoints);
    return data;
}

export async function assignUserToCompany()
{
    
}

export async function addPoints(model)
{

    let points = model.euro * model.euroToPointsRatio;
    let addPoints = apiEndpoint + "addPoints";
    model.points = points;
    const { data } = await http.post(addPoints, model);
    return data;
}


export async function redeemPoints(model)
{
    let redeemPoints = apiEndpoint + "addPoints";
    model.points = model.redeem*-1;
    const { data } = await http.post(redeemPoints, model);
    console.log();
    return data;
}