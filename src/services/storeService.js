import http from "./httpService";
import { apiUrl } from "../config.json";


const apiEndpoint = apiUrl + "/stores/";
export async function addStore(newStore)
{
    let addNew = apiEndpoint + "addStore";
    const { data } = await http.post(addNew, newStore);
    return data;
}

export async function getStoreById(id)
{
    let getStores = apiEndpoint+`getStores?id=${id}`;
    const { data } = await http.get(getStores);
    return data;
}

export async function updateStore(store)
{
    let updateStore = apiEndpoint + `updateStore`;
    const { data } = await http.put(updateStore, store);
    return data;
}

export async function deleteStore(id)
{
    let deleteStore = apiEndpoint + `deleteStore?Id=${id}`;
    const { data } = await http.delete(deleteStore);
    return data;
}

export async function getStores(id)
{
    let getStores = apiEndpoint +`getStores?id=${id}`;
    const {data} = await http.get(getStores);
    return data;
}

export async function getStoreByEmail(email)
{
    let getStores = apiEndpoint +`getStores?email=${email}`;
    const {data} = await http.get(getStores);
    return data;
}