import http from "./httpService";
import { apiUrl } from "../config.json";


const apiEndpoint = apiUrl + "/sales/";

export async function getAllSales()
{
    let allSales = apiEndpoint + "getAllSales";
    const { data } = await http.get(allSales);
    return data;
}

export async function addSale(newSale)
{
    let addNew = apiEndpoint + "addSale";
    const { data } = await http.post(addNew, newSale);
    return data;
}

export async function getSaleById(id)
{
    let getSales = apiEndpoint+`getSales?Id=${id}`;
    const { data } = await http.get(getSales);
    console.log("Ta sales!!!::::");
    console.log(data);
    return data;
}

export async function updateSale(sale)
{
    let updateCompany = apiEndpoint + `updateSale`;
    const { data } = await http.put(updateCompany, sale);
    return data;
}


export async function deleteSale(id)
{
    let deleteSale = apiEndpoint + `deleteSale?Id=${id}`;
    const { data } = await http.delete(deleteSale);
    return data;
}