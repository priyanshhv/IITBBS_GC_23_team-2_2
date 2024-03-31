// import { useEffect, useState } from "react";
// import { fetchDataFromApi } from "../utils/api";
// import axios from 'axios';

// const BASE_URL = "http://localhost:5000/api";

// const postDataFromApi = async (url,postData) => {

//     try {
//         const data = await axios.post(
//             BASE_URL+url,postData
//         );
         
//         return data;
//     } catch (error) {
//         console.log("Errapijs", error);
//     }
// }

// const useFetch = (url,postData) => {
//     const [posting, setPosting] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         setPosting("loading...");
//        // setData(null);
//         setError(null);

//         postDataFromApi(url,postData)
//             .then((res) => {
//                 setPosting(false);
//                 //setData(res);
//             })
//             .catch((err) => {
//                 setPosting(false);
//                 setError("Something went wrong!");
//             });
//     }, [url]);

//     return { posting, error };
// };

// export default usePost;