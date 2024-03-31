import React, { useRef, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import { setProducts } from "../../store/homeSlice";

const Carousel = ({data,loading,endpoint,title}) => {
  const carouselContainer = useRef();
  const {products} = useSelector((state)=>state.home);
  const navigate = useNavigate();
 // console.log("carousel",data);

  const navigation = (direction) => {
    const container = carouselContainer.current;

    const scrollAmount = direction==="left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
    })
  }

  const SkeletonItem = ()=>{
    return (
        <div className="sleletonItem">
            <div className="posterBlock skeleton"> </div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
        </div>
    )
  }
  
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && (
            <div className="carouselTitle">{title}</div>
        )}
        <BsFillArrowLeftCircleFill
            className="carouselLeftNav arrow"
            onClick={()=>navigation("left")}
        />
        <BsFillArrowRightCircleFill
            className="carouselRighttNav arrow"
            onClick={()=>navigation("right")}
        />
        {!loading ? (
            <div className="carouselItems" ref={carouselContainer}>
                {data?.map((item)=>{
                    console.log(item);
                    const posterUrl = item?.img ? item?.img : PosterFallback;
                    const [isAdd,setIsAdd] = useState((item.title in products)? true:false);
                    const [count,setCount] = useState((item.title in products)? products[item.title].quantity:0);
                   
                    const dispatch = useDispatch();
                    const setMapProducts = (products,productName,productquantity,item)=>{
                        const newProducts = {};
                        let found = false;
                        for(const [key,value] of Object.entries(products)){
                            if(key==productName){
                                found = true;
                                if(productquantity==0)
                                {

                                }
                                else{
                                    newProducts[key] = {...value,quantity: productquantity};
                                }
                            }
                            else
                            {
                                newProducts[key]= value ;
                            }
                        }
                        if(!found)
                        {
                            newProducts[productName] = {...item,quantity: productquantity};
                        }
                        dispatch(setProducts(newProducts));
                    }
                    return (
                        <div 
                        className="carouselItem" 
                        key={item._id}
                        >
                            <div className="posterBlock"  onClick={()=>navigate(`/${item.media_type || endpoint}/${item._id}`)}>
                                <Img src={posterUrl} />
                                <CircleRating rating={`₹${item?.price}`}/>
                                {/* <Genres data = {item.genre_ids.slice(0,2)}/> */}
                            </div>
                            <div className="textBlock">
                                <span className="title">{item?.title}</span>
                                {/* <span className="date">{item?.categories[0]}</span> */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        '& > *': {
                                        m: 1,
                                        },
                                    }}
                                    >
                                    {!isAdd && 
                                     <ButtonGroup variant="outlined" aria-label="outlined button group" onClick={()=>{
                                        setIsAdd(true)
                                        setCount((count)=>count+1)
                                        setMapProducts(products,item?.title,count+1,item);
                                     }}>
                                        <Button>Add</Button>
                                    </ButtonGroup>}
                                    {isAdd && 
                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <Button onClick={()=>{
                                            if(count-1==0)
                                            {
                                                setCount(count=>count-1);
                                                setIsAdd(false)
                                            }
                                            else
                                            {
                                                setCount(count=>count-1);
                                            }
                                            setMapProducts(products,item?.title,count-1,item);
                                        }}>-</Button>
                                        <Button>{count}</Button>
                                        <Button onClick={()=>{
                                            setCount(count=>count+1)
                                            setMapProducts(products,item?.title,count+1,item);
                                            }}>+</Button>
                                    </ButtonGroup>
                                    }
                                </Box>
                            </div>
                        </div>
                    );
                })}
            </div>
        ) : (
            <div className="loadingSkeleton">
                {SkeletonItem()}
                {SkeletonItem()}
                {SkeletonItem()}
                {SkeletonItem()}
                {SkeletonItem()}
            </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Carousel;

//4 : 12
