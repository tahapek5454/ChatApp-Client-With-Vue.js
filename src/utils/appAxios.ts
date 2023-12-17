
import axios from "axios"

const appAxios = axios.create({
    baseURL : "http://localhost:7279/api/"
});


export default appAxios;