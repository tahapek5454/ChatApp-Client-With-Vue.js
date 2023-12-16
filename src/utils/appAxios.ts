
import axios from "axios"

const appAxios = axios.create({
    baseURL : "https://localhost:7279/api/"
});


export default appAxios;