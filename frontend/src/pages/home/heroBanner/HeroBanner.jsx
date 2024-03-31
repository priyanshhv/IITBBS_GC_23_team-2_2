import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.scss"
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
  const [background,setBackground] = useState("");
  const [query,setQuery] = useState("");
  const navigate = useNavigate();
  const {url} = useSelector((state)=>state.home);

  const {data,loading} = useFetch("https://i.ibb.co/WxPZxRS/nathan-dumlao-6-Vh-PY27jdps-unsplash.jpg");

  useEffect(() => {
    const bg = "https://i.ibb.co/WxPZxRS/nathan-dumlao-6-Vh-PY27jdps-unsplash.jpg";
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (e)=>{
    if(e.key==="Enter" && query.length>0){
       navigate(`/search/${query}`)
    }
    console.log("enter key is pressed");
  };

  const searchButton = ()=>{
     if(query.length>0){
       navigate(`/search/${query}`)
    }
  };

  return (
    <div className="heroBanner ">

      {/* {!loading && <div className="backdrop-img">
        <Img src={background}/>
      </div>} */}
      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
                <span className="title">Welcome.</span>
                <span className="subTitle">To IIT Bhubaneswar</span>
                <div className="searchInput">
                    <input 
                    type="text" 
                    placeholder="" 
                    onKeyUp={searchQueryHandler}
                    onChange={(e)=>{setQuery(e.target.value)}}
                     />
                    <button onClick={searchButton}>Search</button>
                </div>
            </div>
      </ContentWrapper>
        
    </div>
  );
}

export default HeroBanner;
