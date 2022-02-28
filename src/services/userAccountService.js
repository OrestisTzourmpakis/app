import http, { setJwt} from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/useraccount/";
const tokenKey = "token";
const userObject = "user";
export async function login(model)
{
    let login = apiEndpoint +"loginAdmin";
    const result = await http.post(login,model,{widthCredentials:true});
    console.log(result);
    // save the user info too..
    return result.data;
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


export function logout() {
    localStorage.removeItem(tokenKey);
}
  

  
export async function register(user) {
    let registerUser = apiEndpoint +"registerfromadmin";
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