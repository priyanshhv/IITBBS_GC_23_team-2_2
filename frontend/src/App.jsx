import { useState,useEffect } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {fetchDataFromApi} from "./utils/api"
import { useSelector,useDispatch } from 'react-redux';
import { getApiConfiguration,getMenu } from './store/homeSlice';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from './pages/home/Home';
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import SetMenu from './pages/setMenu/SetMenu';
import Orders from './pages/orders/Orders';



function App() {
  const dispatch = useDispatch();
  //const {url}= useSelector((state)=>state.home);
  //console.log(url);
  useEffect(()=>{
    //fetchApiConfig();
    genresCall();
  },[])

  // const fetchApiConfig = ()=>{
  //   fetchDataFromApi("/configuration")
  //   .then((data) => {
  //     console.log("API data",data);
  //     const url = {
  //       backdrop : data.images.secure_base_url+"original",
  //       poster : data.images.secure_base_url+"original",
  //       profile : data.images.secure_base_url+"original",
  //     }
  //     dispatch(getApiConfiguration(url));
  //   });
  // }

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["NOODLES","PASTA","SANDWICH","SNACKS","PIZZA","BURGER","MOMOS","MAGGIE","BEVERAGES"];
    let menu = {};
    endPoints.forEach((url)=>{
      const dta = fetchDataFromApi(`/products?category=${url}`);
      promises.push(dta)
    })

    const data = await Promise.all(promises);
    //console.log(data);
    // data.map((arr,index)=>{
    //   console.log(index,arr,arr.length);
    //   if(arr.length>0)
    //   {
    //     arr.map(ar=>{
    //       console.log(ar);
    //       menu?.[endPoints[index]]?.push(ar);
    //     })
    //   }
    // })
    data.forEach((arr, index) => {
     if(arr.length>0)
     menu[endPoints[index]] = arr;
    });
    //console.log(menu);
    // const data = await Promise.all(promises);
    // data.map(({genres})=>{
    //   return genres.map(item=>{
    //    return allGenres[item.id] = item;
    //   })
    // });
    // console.log(allGenres);
    dispatch(getMenu(menu))
    dispatch(getApiConfiguration(false))
  }

  //  App {url?.total_pages}
    const accessToken = localStorage.getItem("accessTokenCafe");

  return (
    <BrowserRouter>
     <Header/>
      <Routes>
        <Route path="/table/:no" element={<Home/>} />
        <Route path="/" element={<Home/>} />
        {/* <Route path="/:mediaType/:id" element={<Details/>} />
        <Route path="/search/:query" element={<SearchResult/>} />*/}
        <Route path="/explore/:mediaType" element={<Explore/>} /> 
        <Route path="/login" element={<Login/>} /> 
        <Route path="/register" element={<Register/>} /> 
        <Route path="/setMenu" element={<SetMenu/>} /> 
        <Route path="*" element={<PageNotFound/>} />
        <Route path="/orders" element={<Orders/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
