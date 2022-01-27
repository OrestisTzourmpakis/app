import http from "./httpService";
import { apiUrl } from "../config.json";


const apiEndpoint = apiUrl + "/companies/";

export async function getAllCompanies()
{
    let allCompanies = apiEndpoint + "getAllCompanies";
    console.log("getting the companies!!!");
    const { data } = await http.get(allCompanies);
    return data;
}

export async function addCompany(newCompany)
{
    console.log("Add Company model:");
    console.log(newCompany);
    newCompany.pointsToEuroRatio = newCompany.pointsToEuro;
    newCompany.euroToPointsRatio = newCompany.euroToPoints;
    newCompany.email = newCompany.ownerEmail;
    let addNew = apiEndpoint + "addCompany";
    newCompany.email = newCompany.ownerEmail;
    console.log(newCompany);
    const { data } = await http.post(addNew, newCompany);
    return data;
}

export async function getCompanyById(id)
{
    let getCompany = apiEndpoint+`getcompanybyid?Id=${id}`;
    const { data } = await http.get(getCompany);
    return data;
}

export async function updateCompany(company)
{
    company.pointsToEuroRatio = company.pointsToEuro;
    company.euroToPointsRatio = company.euroToPoints;
    let updateCompany = apiEndpoint + `updateCompany`;
    const { data } = await http.put(updateCompany, company);
    return data;
}


// export async function assignUserToCompany(companyId, userEmail)
// {
//     let model = { Id: companyId, email: userEmail };
//     let assignToCompany = apiEndpoint + `addUserToCompany`;
//     const { data } = await http.post(assignToCompany, model);
//     return data;
// }

export async function assignUserToCompany(model)
{
    // let model = { Id: companyId, email: userEmail };
    let assignToCompany = apiEndpoint + `addUserToCompany`;
    const { data } = await http.post(assignToCompany, model);
    return data;
}