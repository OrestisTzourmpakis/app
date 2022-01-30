import http, { setJwt} from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/useraccount/";
const tokenKey = "token";
const userObject = "user";
export async function login(model)
{
    let login = apiEndpoint +"login";
    const {data} = await http.post(login,model);
  
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
  
export async function register(user) {
    let registerUser = apiEndpoint +"register";
    const result = await http.post(registerUser,user);
    return result;
}

export async function updateAccount(model) {
    console.log("Update user called!!!!");
    let updateUser = apiEndpoint +"updateUser";
    const result = await http.post(updateUser,model);
    return result;
}

// edw pera save the jwt and so on...

export async function googleLogin()
{
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    }
    let googleLogin = apiEndpoint + "googleLogin";
    // const result = await http.get(googleLogin);
    let xhr = new XMLHttpRequest();
    var json_obj, status = false;
    xhr.open("GET",googleLogin,true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var json_obj = JSON.parse(xhr.responseText);
            status = true;
            this.setState({ json_obj });
          } else {
            console.error(xhr.statusText);
          }
        }
      }.bind(this);
      xhr.onerror = function (e) {
        console.error(xhr.statusText);
      };
      xhr.send(null);
    
    //return result;
}

export async function checkUserRole(email)
{
    let checkUser = apiEndpoint + `checkRole?email=${email}`;
    const { data } = await http.get(checkUser);
    return data;
}