
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import {Outlet, useNavigate} from 'react-router-dom'
import { Header } from '../../components/header/header';
import {Footer} from '../../components/footer/footer'
import { useEffect } from 'react';
import { getAuth } from '../../services/getAuth';

const Layout =()=>{
    const navigate=useNavigate()
useEffect(()=>{
if (!getAuth()) {
    navigate('/auth')
}
},[])

    return (
        <Grid container paddingBottom={2}
        rowGap={1}>
              <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12}>
            <div style={{height:'85px',width:'100%',background:'none'}} />
            </Grid>
            <Grid item container xs={12}>
                <Outlet />
            </Grid>
            <Grid item xs={12}>
            <div style={{height:'30px',width:'100%',background:'none'}} />
            </Grid>
           
            <Grid item container xs={12}>
                <Footer />
            </Grid>
        </Grid>
    )
}
export default Layout;