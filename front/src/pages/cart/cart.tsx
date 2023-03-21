import Grid from '@mui/material/Grid'
import './cart.scss'
import { RenderItem } from './renderItem';
import  Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {homeSlicer,iInitial} from '../../services/store/features/homeSlicer'
import { useTranslation } from 'react-i18next';
import {ShoppingBagOutlined} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

const Cart =()=>{
    const {t,i18n}=useTranslation()
    const navigate=useNavigate()
    const dispatch=useDispatch()
 
     const [page,setPage]=useState(1)
const state=useSelector((state:{products:iInitial})=>state.products)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      }
      useEffect(()=>{
        if (page) {
        dispatch(homeSlicer.actions.setCurrentPage(page))

        }
      },[page])
      console.log(state)
    return (
        <Grid container
        className="card"
        rowGap={2}
        >
            
            <Grid item xs={12}
            className="box">
               {
                state.savedProducts[page-1] &&
                state.savedProducts[page-1].length >0 ?
                state.savedProducts[page-1].map((ele,index)=>
                <RenderItem  {...ele} key={index}/>
                ):
                <Grid item xs={12} textAlign="center"
                className='noProduct'>
                    <span>
                    {
                        i18n.language==='en'?
                        "There is no saved products to show":
                        "لا يوجد منتجات محفوظة لعرضها"
                    }
                    </span>
                    <div className='link'
                    onClick={()=>navigate('/')}>
                        {
                            i18n.language==='en'?
                            'Save products to your shopping cart from here':
                            "احفظ منتجات لسلتك من هنا"
                        }
                    </div>
                    <ShoppingBagOutlined
                    color="secondary"
                    fontSize={'large'} />
                </Grid>
               }
            
            </Grid>
            <Grid item container xs={12}
            justifyContent="center"
            >

                <Pagination count={5} color="secondary"
                page={page} onChange={handleChange}/>
            </Grid>
       
        </Grid>
    )
}
export default Cart;