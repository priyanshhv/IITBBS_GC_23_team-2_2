import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import "./style.scss";

import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi, postDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { setordertext } from "../../store/homeSlice";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


let filters = {};

// const sortbyData = [
//     { value: "popularity.desc", label: "Popularity Descending" },
//     { value: "popularity.asc", label: "Popularity Ascending" },
//     { value: "vote_average.desc", label: "Rating Descending" },
//     { value: "vote_average.asc", label: "Rating Ascending" },
//     {
//         value: "primary_release_date.desc",
//         label: "Release Date Descending",
//     },
//     { value: "primary_release_date.asc", label: "Release Date Ascending" },
//     { value: "original_title.asc", label: "Title (A-Z)" },
// ];

const Explore = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const { mediaType } = useParams();
     const {products} = useSelector((state)=>state.home);
     const {address} = useSelector((state)=>state.home);
     const {ordertext} = useSelector((state)=>state.home);
    //const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
    let amount = 0;
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const [name,setName] = useState("");

    //const [orderText,setOrderText] = useState(ordertext);
    // const fetchInitialData = () => {
    //     setLoading(true);
    //     fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
    //         setData(res);
    //         setPageNum((prev) => prev + 1);
    //         setLoading(false);
    //     });
    // };

    // const fetchNextPageData = () => {
    //     fetchDataFromApi(
    //         `/discover/${mediaType}?page=${pageNum}`,
    //         filters
    //     ).then((res) => {
    //         if (data?.results) {
    //             setData({
    //                 ...data,
    //                 results: [...data?.results, ...res.results],
    //             });
    //         } else {
    //             setData(res);
    //         }
    //         setPageNum((prev) => prev + 1);
    //     });
    // };

    useEffect(() => {
        // filters = {};
        // setData(null);
        // setPageNum(1);
        // setSortby(null);
        // setGenre(null);
        // fetchInitialData();
        setLoading(true);
        const timeOut = setTimeout(() => {
            setLoading(false)
        }, 1000);
        return () => {
        clearTimeout(timeOut);
      };
    }, [mediaType]);

    // const onChange = (selectedItems, action) => {
    //     if (action.name === "sortby") {
    //         setSortby(selectedItems);
    //         if (action.action !== "clear") {
    //             filters.sort_by = selectedItems.value;
    //         } else {
    //             delete filters.sort_by;
    //         }
    //     }

    //     if (action.name === "genres") {
    //         setGenre(selectedItems);
    //         if (action.action !== "clear") {
    //             let genreId = selectedItems.map((g) => g.id);
    //             genreId = JSON.stringify(genreId).slice(1, -1);
    //             filters.with_genres = genreId;
    //         } else {
    //             delete filters.with_genres;
    //         }
    //     }

    //     setPageNum(1);
    //     fetchInitialData();
    // };

    const product = [];

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "cart"
                            ? "My Cart"
                            : "Lost And Found"}
                    </div>
                    {/* <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div> */}
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {/* {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )} */}
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 200 }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Item</StyledTableCell>
                                        <StyledTableCell align="right">Location</StyledTableCell>
                                        <StyledTableCell align="right">Date</StyledTableCell>
                                        {/* <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                        Object.keys(products).map(function(key) {
                                            const item = products[key];
                                            amount=amount+(item.quantity)*(item.price);
                                            product.push({
                                                productId: item._id,
                                                quantity: item.quantity
                                            })
                                            return (
                                                 <StyledTableRow key={item._id}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {item.title}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{item.quantity}</StyledTableCell>
                                                    <StyledTableCell align="right">₹{(item.quantity)*(item.price)}</StyledTableCell>
                                              
                                                </StyledTableRow>
                                            )
                                            })
                                    // rows.map((row) => (
                                    //     <StyledTableRow key={row.name}>
                                    //     <StyledTableCell component="th" scope="row">
                                    //         {row.name}
                                    //     </StyledTableCell>
                                    //     <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                    //     <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                    //     {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                    //     <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                                    //     </StyledTableRow>
                                    // ))
                                }
                                    <StyledTableRow key={6}>
                                        <StyledTableCell component="th" scope="row">
                                            
                                        </StyledTableCell>
                                        <StyledTableCell align="right">Amount</StyledTableCell>
                                        <StyledTableCell align="right">₹{amount}</StyledTableCell>
                                        {/* <StyledTableCell align="right"> </StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell> */}
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                                </TableContainer>
                                  <Stack direction="row" spacing={2} sx={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mt: 4
                                  }}>
                                {ordertext=="Thanks For Ordering" ? (
                                     <Button variant="contained" color="success">
                                    {ordertext}
                                </Button>
                                ): (
                                    <Button variant="contained" color="success" onClick={handleOpen} >
                                    {ordertext}
                                </Button>
                                )}
                                

                                 <Backdrop
                                    sx={{ color: '#fff', 
                                    zIndex: (theme) => theme.zIndex.drawer + 1,
                                    backdropFilter: "blur(3px)",
                                     backgroundColor:'#cfe0f1a6'
                                }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                        <Stack direction="column" spacing={2} sx={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mt: 4
                                  }}>
                                    <TextField id="outlined-basic" label="Required" variant="outlined" sx={{ m: 1, width: '25ch' }} onChange={(e)=>{
                                        setName(e.target.value)
                                    }} value={name} 
          InputProps={{
            startAdornment: <InputAdornment position="start">Name</InputAdornment>,
          }}/>
                                        <Button variant="contained" color="success" onClick={()=>{
                                            const postData = {};
                                            postData["userName"]=name;
                                            postData["products"]=product;
                                            postData["amount"]=amount;
                                            postData["address"]=address;

                                            setTimeout(() => {
                                                handleClose();
                                            }, 500);

                                            if(amount==0){
                                                handleClose();
                                            return;
                                            }
                                            // ////////
                                            postDataFromApi("/order",postData,handleClose)
                                            .then((data)=>{
                                                // console.log("Data posted Explore");
                                                 dispatch(setordertext("Thanks For Ordering"));  
                                            })
                                            .catch(err=>{
                                                // console.log("Error in posting");
                                                
                                                dispatch(setordertext("Error Occur Try Again")); 
                                                // console.log(err);
                                            })
                                        }}>
                                            Next
                                        </Button>
                                    </Stack>
                                    </Box>
                                </Backdrop>
                                </Stack>
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Explore;