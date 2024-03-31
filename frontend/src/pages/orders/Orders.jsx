import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Spinner from "../../components/spinner/Spinner";

import { SoupKitchen } from '@mui/icons-material';
import { fetchDataFromApi, fetchOrdersFromApi } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

 const menuCall =  async (orders,data,setOrders,setLoading) => {
      let promises = [];
        data.map((order,i)=>{
            const obj = {};
            obj["userName"] = order.userName;
            obj["address"] = order.address;
            obj["amount"] = order.amount;
            obj["products"] = [];
            obj["createdAt"] = order.createdAt;
            order.products.map((product)=>{
              try {
                const menu =  fetchDataFromApi(`/products/find/${product.productId}`);
                promises.push({i:i,menu:menu,quantity: product.quantity})
                // console.log(menu);
                // obj["products"].push({
                //   // productName: menu.title,
                //   quantity: product.quantity
                // })
              } catch (error) {
                // console.log(error);
                navigate("*");
              }
            });
            orders.push(obj);
        })

        //console.log("hi");
        const res = await Promise.all(promises);
        //console.log("done");

        res.forEach((ele,i)=>{
          ele.menu.then(r=>{
           // console.log(r.title,ele.quantity);
             orders[ele.i]["products"].push({
             productName: r.title,
             quantity: ele.quantity
          })
        //  console.log(orders);
          if(i == res.length-1)
          {
        // setOrders(orders);
        // setLoading(false);
             setTimeout(() => {
           setOrders(orders);
        setLoading(false);
        }, 4000);
          }
          })
          
        })

    }

const Orders = () => {
    const navigate = useNavigate();
    const [orders,setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    // const menuCall =  async (orders,data) => {
    //   let promises = [];
    //     data.map((order,i)=>{
    //         const obj = {};
    //         obj["userName"] = order.userName;
    //         obj["address"] = order.address;
    //         obj["amount"] = order.amount;
    //         obj["products"] = [];
    //         obj["createdAt"] = order.createdAt;
    //         order.products.map((product)=>{
    //           try {
    //             const menu =  fetchDataFromApi(`/products/find/${product.productId}`);
    //             promises.push(menu)
    //             // console.log(menu);
    //             obj["products"].push({
    //               productName: menu.title,
    //               quantity: product.quantity
    //             })
    //           } catch (error) {
    //             // console.log(error);
    //             navigate("*");
    //           }
    //         });
    //         orders.push(obj);
    //     })

    //     console.log("hi");
    //      await Promise.all(promises);
    //     console.log("done");

    // }

    function getTimeInPM(timestamp) {
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Get the hour of the day
  const hour = date.getHours();

  // Format the hour in the AM/PM format
  const hourInAMPM = hour < 12 ? hour + " AM" : (hour - 12) + " PM";

  // Return the time in the AM/PM format
  return hourInAMPM;
}

function getStringOfOrders(products){
  let str="";
  for(let i=0;i<products.length;i++){
    const product = products[i];
    if(i<products.length-1)
    {
      str += `${product.quantity} ${product.productName}, `;
    }
    else
    {
      str += `${product.quantity} ${product.productName}`;
    }
    // console.log(str);
  }
  return str;
}

const [time,setTime] = useState(0);

    useEffect( () => {
         const accessToken = localStorage.getItem("accessToken");
          setLoading(true);
         
         fetchOrdersFromApi("/order?new=true",accessToken).then(res => {
            // console.log("orders",res.data);
            const objOrders = [];
            menuCall(objOrders,res.data,setOrders,setLoading);
            // setOrders(objOrders)
            // setLoading(true)
            // setLoading(false)
            // setTimeout(() => {
            //   console.log(objOrders);
            //   setOrders(objOrders)
            // setLoading(false)
            // }, 2500);
        //       const timeOut = setTimeout(() => {
        //     setLoading(false)
        // }, 2000);
         })
         .catch(err => {
             navigate("/login");
         })

          // setLoading(true);
        // const timeOut = setTimeout(() => {
        //     setLoading(false)
        // }, 1000);
        // return () => {
        // clearTimeout(timeOut);}
         
    }, [time]);

  return (
    <div style={{
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        padding:"67px 20px"
    }}>
        <h1>Orders</h1>

          {loading && <Spinner initial={true} />}

             {!loading && (
        <List
      sx={{ width: '100%', bgcolor: 'background.paper', color: "black", height:"100%", mt:3}}
      aria-label="contacts"
    >
      
      {orders?.map((order,i) => {
        const str = getStringOfOrders(order.products); 
        return (
          <ListItem disablePadding key={i}>
            <ListItemButton>
              <ListItemIcon>
                <SoupKitchen/>
              </ListItemIcon>
              <ListItemText >On {order.address} {order.userName} has ordered {str} at {getTimeInPM(order.createdAt)} having amount ₹{order.amount}</ListItemText>
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
             )}
             <Button variant="contained" color="success" sx={{mt:4}} onClick={()=>{
                          setTime(time+1);
                                        }}>
                                            Refresh
                                        </Button>
    </div>
  );
}

export default Orders;
