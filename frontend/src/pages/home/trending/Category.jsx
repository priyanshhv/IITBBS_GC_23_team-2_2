import React,{useState} from 'react';
import { useSelector } from "react-redux";

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';


const Category = ({category,data}) => {
  // const [endpoint,setEndpoint] = useState("day");
  // const {data,loading} = useFetch(`/Category/all/${endpoint}`);

  // const onTabChange = (tab)=>{
  //   setEndpoint(tab.toLowerCase());
  // }
  const {loading} = useSelector((state)=>state.home);


  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">{category}</span>
            {/* <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}/> */}
        </ContentWrapper>
        <Carousel data={data} loading={loading}/>
    </div>
  );
}

export default Category;
