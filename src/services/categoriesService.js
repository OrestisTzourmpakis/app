import http from "./httpService";
import { apiUrl } from "../config.json";


const apiEndpoint = apiUrl + "/categories/";

export async function getCategories()
{
    let categories = apiEndpoint + "getCategories";
    const { data } = await http.get(categories);
    return data;
}

export async function getCategoryById(id)
{
    let category = apiEndpoint + `getCategory?Id=${id}`;
    const { data } = await http.get(category);
    return data;
}

export async function updateCategory(category)
{
    let updateCategory = apiEndpoint + "updateCategory";
    const { data } = await http.put(updateCategory, category);
    return data;
}

export async function addCategory(category)
{
    let addCategory = apiEndpoint + "addCategory";
    const { data } = await http.post(addCategory,category);
}

export async function deleteCategory(id)
{
    let deleteCategory = apiEndpoint + `deleteCategory?id=${id}`;
    const { data } = await http.delete(deleteCategory);
    return data;
}