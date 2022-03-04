import http from "./httpService";
import { apiUrl } from "../config.json";


const apiEndpoint = apiUrl + "/companies/";

export async function getAllCompanies()
{
    let allCompanies = apiEndpoint + "getAllCompanies";
    const { data } = await http.get(allCompanies);
    return data;
}

export async function addCompany(newCompany)
{
    newCompany.pointsToEuroRatio = newCompany.pointsToEuro;
    newCompany.euroToPointsRatio = newCompany.euroToPoints;
    newCompany.email = newCompany.ownerEmail;
    const formData = new FormData();
    formData.append("name",newCompany.name);
    formData.append("logo",newCompany.logo);
    formData.append("logoFile",newCompany.logoFile);
    formData.append("website",newCompany.website);
    formData.append("twitter",newCompany.twitter);
    formData.append("instagram",newCompany.instagram);
    formData.append("facebook",newCompany.facebook);
    formData.append("euroToPointsRatio",newCompany.euroToPointsRatio);
    formData.append("pointsToEuroRatio",newCompany.pointsToEuro);
    formData.append("email",newCompany.ownerEmail);
    let addNew = apiEndpoint + "addCompany";
    const { data } = await http.post(addNew, formData);
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
    const formData = new FormData();
    formData.append("id",company.id)
    formData.append("name",company.name);
    formData.append("logo",company.logo);
    formData.append("logoFile",company.logoFile);
    formData.append("website",company.website);
    formData.append("twitter",company.twitter);
    formData.append("instagram",company.instagram);
    formData.append("facebook",company.facebook);
    formData.append("euroToPointsRatio",company.euroToPointsRatio);
    formData.append("pointsToEuroRatio", company.pointsToEuro);
    formData.append("ownerEmail",company.ownerEmail);
    let updateCompany = apiEndpoint + `updateCompany`;
    const { data } = await http.put(updateCompany, formData);
    return data;
}

export async function getCompanyByUserEmail(email)
{
    let getCompany = apiEndpoint+`getcompanybyemail?email=${email}`;
    const { data } = await http.get(getCompany);
    return data;
}


export async function assignUserToCompany(model)
{
    // let model = { Id: companyId, email: userEmail };
    let assignToCompany = apiEndpoint + `addUserToCompany`;
    const { data } = await http.post(assignToCompany, model);
    return data;
}


export async function deleteCompany(id)
{
    let deleteCompany = apiEndpoint + `deleteCompany?Id=${id}`;
    const { data } = await http.delete(deleteCompany);
    return data;
}