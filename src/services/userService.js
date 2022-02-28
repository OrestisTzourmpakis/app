import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/useraccount/";

export async function getAllUsers()
{
    let users = apiEndpoint + "getAllUsers";
    console.log(http);
    const { data } = await http.get(users);
    return data;
}


export async function getUsersByCompany(email)
{
    let users = apiEndpoint+`getUsersByCompany?email=${email}`;
    const { data } = await http.get(users);
    return data;
}

export async function deleteUser(email)
{
    let deleteUser = apiEndpoint + `deleteUser?email=${email}`;
    const result = await http.delete(deleteUser);
}

export async function getUser(email)
{
    let user = apiEndpoint + `getUser?email=${email}`;
    const { data } = await http.get(user);
    return data;
}

export async function authenticateUser()
{
    let endpoint = apiEndpoint + "authenticateUser";
    const { data } = await http.post(endpoint);
    return data;
}

export async function logOut()
{
    let endpoint = apiEndpoint + "logout";
    const result = await http.post(endpoint);
}

// export async function updateCompany(company)
// {
//     let updateCompany = apiEndpoint + `updateCompany`;
//     const { data } = await http.put(updateCompany, company);
//     return data;
// }
