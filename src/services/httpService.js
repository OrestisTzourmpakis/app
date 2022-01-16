import axios from "axios";
import logger from "./logService";


axios.interceptors.response.use(null, error => {
    // if (error.response.status === 401)
    // {
    //     let navigate = useNavigate();
    //     navigate("login");
    //     }
    const expectedError = 
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if(!expectedError){
        logger.log(error);
    }

    return Promise.reject(error);
});

export function setJwt(jwt)
{
    // axios.defaults.headers.common["x-auth-token"] = jwt;
    axios.defaults.headers = { 'Authorization': `Bearer ${jwt}` };
}

export default {
    get: axios.get,
    post: axios.post,
    put:axios.put,
    delete:axios.delete,
    setJwt
}
