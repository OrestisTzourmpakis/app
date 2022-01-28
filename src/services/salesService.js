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
    console.log("Sales add!!!To model:");
    console.log(newSale);
    const formData = new FormData();
    formData.append("imageFile",newSale.imageFile);
    formData.append("image",newSale.image)
    formData.append("title", newSale.title)
    formData.append("dateStart", newSale.dateStart);
    formData.append("dateEnd", newSale.dateEnd);
    formData.append("description", newSale.description);
    formData.append("email", newSale.email);
    console.log("To formData model mou");
    console.log(formData);
    let addNew = apiEndpoint + "addSale";
    const { data } = await http.post(addNew, formData);
    return data;
}

export async function getSaleById(email)
{
    let getSales = apiEndpoint+`getSales?email=${email}`;
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