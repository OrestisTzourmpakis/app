import http from "./httpService";
import { apiUrl } from "../config.json";


const apiEndpoint = apiUrl + "/stores/";
export async function addStore(newStore)
{
    let addNew = apiEndpoint + "addStore";
    console.log("bhkeStoStre");
    // newCompany.applicationUserId = "70fc1d5b-0534-4386-b65e-07c4a8aceecb";
    // console.log(newCompany);
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