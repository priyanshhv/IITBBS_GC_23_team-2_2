import React, { useState, useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const inputRef = useRef(null);
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0,0)
    }, [location]);

    const handleScroll = ()=>{
      if(window.scrollY>200){
        if(window.scrollY > lastScrollY && !mobileMenu){
          setShow("hide")
        }
        else{
          setShow("show")
        }
      }
      else
      {
        setShow("top")
      }
      setLastScrollY(window.scrollY)
    }

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener("scroll",handleScroll)
      };
    }, [lastScrollY]);

     const searchQueryHandler = (e)=>{
    if(e.key==="Enter" && query.length>0){
       navigate(`/search/${query}`)
       setTimeout(() => {
        setShowSearch(false)
       }, 1000);
    }
  };

    const openSearch = ()=>{
      setMobileMenu(false);
      setShowSearch(true);
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }

    const openMobileMenu = ()=>{
      setMobileMenu(true);
      setShowSearch(false);
    }

    const navigationHandler = (type)=>{
      navigate(`/explore/${type}`);
       setTimeout(() => {
         setMobileMenu(false);
       }, 1000);
    }
    const accessToken = localStorage.getItem("accessToken");

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
          <ContentWrapper>
            <div className="logo" onClick={()=>navigate(`/`)} style={{color:"#ffffff"}}>
              {/* <img src={logo} alt="" /> */}
              ALL IN ONE Solutions
            </div>
            <ul className="menuItems">
              <li className="menuItem" onClick={()=>navigate("/register")}>Register</li>
              <li className="menuItem" onClick={()=>navigate("/login")}>Login</li>
              <li className="menuItem" onClick={()=>navigate("/orders")}>Food</li>
              <li className="menuItem" onClick={()=>navigate("/setMenu")}>Lost and Found</li>
              <li className="menuItem" onClick={()=>navigate("/events")}>Events</li>
              <li className="menuItem" onClick={()=>navigate("/library")}>Library</li>
{/* 
              {accessToken ? (
         <li className="menuItem" onClick={()=>navigate("/orders")}>Library</li>
        ) : ("")}
              <li className="menuItem">
                <HiOutlineSearch onClick={()=>{
                  openSearch();
                  // console.log(inputRef.current);
                  // inputRef.current.focus();
                  }}/>
              </li> */}
            </ul>

            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch}/>
              {mobileMenu?(<VscChromeClose onClick={()=>setMobileMenu(false)}/>):(<SlMenu onClick={openMobileMenu}/>)}
            </div>
          </ContentWrapper>
          {showSearch && <div className="searchBar">
            <ContentWrapper>
              <div className="searchInput">
                    <input 
                    ref={inputRef}
                    type="text" 
                    placeholder="" 
                    onKeyUp={searchQueryHandler}
                    onChange={(e)=>{setQuery(e.target.value)}}
                     />
                   <VscChromeClose onClick={()=>setShowSearch(false)}/>
                </div>
            </ContentWrapper>
          </div>}
        </header>
    );
};

export default Header;

//6:10