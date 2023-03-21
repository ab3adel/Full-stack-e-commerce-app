import Grid from "@mui/material/Grid";
import { Card } from "../../components/card/card";

import Pagination from "@mui/material/Pagination";

import { useSelector, useDispatch } from "react-redux";
import { homeSlicer, iInitial } from "../../services/store/features/homeSlicer";
import { useState, useEffect, useContext } from "react";

import { EllipsisLoader } from "../../mini-components/loader/loader";
import axios from "../../services/api/axios";
import { useTranslation } from "react-i18next";
import notificationContext, { iAlert } from "../../services/context/notification/context";
const Home = () => {
  const state = useSelector((state: { products: iInitial }) => state.products);
  const dispatch = useDispatch();
  const {i18n}=useTranslation()
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {setAlert}=useContext(notificationContext)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  console.log(state);

  useEffect(() => {
    if (page && !state.all_pages[page] ) {
       axios.get('products',{params:{page,locale:i18n.language?i18n.language:'en'}})
       .then((res) => {
         if (res) {
           console.log(res);
           if (res.data?.data?.data?.data) {
             dispatch(homeSlicer.actions.setProducts({page,data:res.data?.data?.data?.data}))
            
           }
         }
       })
       .catch(err=>{
         setAlert((pre:iAlert)=>({...pre,open:true,action:'error',message:i18n.language==='en'?
       "There is a Network connection issue ,please try again later":
       "يوجد مشكلة في اتصال الشبكة و رجاء حاول لاحقا"
     }))
       })
   
  
    
    }
  }, [page]);
  if (loading) {
    return (
      <Grid container xs={12} justifyContent="center">
        <EllipsisLoader />
      </Grid>
    );
  }
  console.log(state)
  return (
    <Grid container>
      <Grid item container xs={12} rowGap={2}>
        {state.all_pages[page] ? (
          state.all_pages[page].map((ele) => <Card {...ele} />)
        ) : (
          <Grid container xs={12} justifyContent="center">
            <EllipsisLoader />
          </Grid>
        )}
      </Grid>
      <Grid item container xs={12} justifyContent="center">
        <Pagination
          count={5}
          color="secondary"
          page={page}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
