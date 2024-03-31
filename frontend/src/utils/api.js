import axios from "axios";
// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "https://cafechainashta.onrender.com/api";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKE;



// const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'application/json', 
// };

export const fetchDataFromApi = async (url,params) => {

    try {
        const {data} = await axios.get(
            BASE_URL+url,
            // {
            //     headers,
            //     params
            // }
        );
         
        return data;
    } catch (error) {
        console.log("Errapijs", error);
    }
}

export const postDataFromApi = async (url,postData,handleClose) => {

    try {
        const data = await axios.post(
            BASE_URL+url,postData
        );       
        handleClose();
       
        return data;
    } catch (error) {
        handleClose();
        throw new Error(error);
        console.log("Errapijs", error);
    }
}

export const postMenuItemToApi = async (url,postData,accessToken)=>{
    const headers = {
        token: `Bearer ${accessToken}`
    };

    try {
        const data = await axios.post(
            BASE_URL+url,postData, {headers}
        );   
        console.log("posted");
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}


export const fetchOrdersFromApi = async (url,accessToken)=>{
    const headers = {
        token: `Bearer ${accessToken}`
    };

    try {
        const data = await axios.get(
            BASE_URL+url, {headers}
        );   
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}