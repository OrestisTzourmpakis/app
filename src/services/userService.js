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


export async function getUsersByCompany(id)
{
    let users = apiEndpoint+`getUsersByCompany?Id=${id}`;
    const { data } = await http.get(users);
    return data;
}

// export async function updateCompany(company)
// {
//     let updateCompany = apiEndpoint + `updateCompany`;
//     const { data } = await http.put(updateCompany, company);
//     return data;
// }
