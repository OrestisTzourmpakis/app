import http, { setJwt} from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/useraccount/login";
const tokenKey = "token";
const userObject = "user";
export async function login(email,password)
{
    const {data} = await http.post(apiEndpoint,{email,password});
  
    // save the user info too..
    return data;
}

export function setJwtUser(data)
{
    const { token: jwt, } = data;
    console.log(jwt);
    localStorage.setItem(tokenKey, jwt);
    //localStorage.setItem(userObject,JSON.stringify(data));
}
export function setUser(data)
{
    console.log("Saving the user");
    console.log(data);
    localStorage.setItem(userObject,JSON.stringify(data));
}

export function getUser()
{
    return JSON.parse(localStorage.getItem(userObject));
}

export function logout() {
    localStorage.removeItem(tokenKey);
}
  
export function checkIfExpired() {
    try {
        console.log("mphkje edw");
        const jwt = localStorage.getItem(tokenKey);
        console.log("Check user in localstoreage:");
        const user = localStorage.getItem(userObject);
        console.log(user);
        if (jwt == null || user == null) return false;
        setJwt(jwt);
        var dateNow = new Date();
        var decodedToken = jwtDecode(jwt);
        if (decodedToken.exp * 1000 < dateNow.getTime()) {
            console.log("Einai false to jwt!!!!");
            return false;
        }
        else {
            return true;
        }
    } catch (ex) {
      return null;
    }
}
  
export async function register() {
    
}

export async function updateAccount() {
    
}

// edw pera save the jwt and so on...
