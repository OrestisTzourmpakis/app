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
    return result.data;
}


export async function register(user) {
    let registerUser = apiEndpoint +"registerfromadmin";
    const result = await http.post(registerUser,user);
    return result;
}

export async function updateAccount(model) {
    let updateUser = apiEndpoint +"updateUser";
    const result = await http.post(updateUser,model);
    return result;
}

export async function checkUserRole(email)
{
    let checkUser = apiEndpoint + `checkRole?email=${email}`;
    const { data } = await http.get(checkUser);
    return data;
}

export async function requestResetPassword(email)
{
    let resetPassword = apiEndpoint + `requestResetPassword?email=${email}`;
    const result = await http.get(resetPassword);
}