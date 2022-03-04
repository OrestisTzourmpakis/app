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
    const formData = new FormData();
    formData.append("imageFile",newSale.imageFile);
    formData.append("image",newSale.image)
    formData.append("title", newSale.title)
    formData.append("dateStart", newSale.dateStart);
    formData.append("dateEnd", newSale.dateEnd);
    formData.append("description", newSale.description);
    formData.append("email", newSale.email);
    let addNew = apiEndpoint + "addSale";
    const { data } = await http.post(addNew, formData);
    return data;
}

export async function getSaleById(email,id=null)
{
    let getSales = apiEndpoint+`getSales?`;
    if (id !== null)
    {
        getSales += `id=${id}`;
    }
    else {
        getSales+=`email=${email}`
    }
    const { data } = await http.get(getSales);
    return data;
}

export async function updateSale(sale)
{
    const formData = new FormData();
    formData.append("imageFile",sale.imageFile);
    formData.append("image",sale.image)
    formData.append("title", sale.title)
    formData.append("dateStart", sale.dateStart);
    formData.append("dateEnd", sale.dateEnd);
    formData.append("description", sale.description);
    formData.append("email", sale.email);
    formData.append("id", sale.id);
    let updateCompany = apiEndpoint + `updateSale`;
    const { data } = await http.put(updateCompany, formData);
    return data;
}


export async function deleteSale(id)
{
    let deleteSale = apiEndpoint + `deleteSale?Id=${id}`;
    const { data } = await http.delete(deleteSale);
    return data;
}