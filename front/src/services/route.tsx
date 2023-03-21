import {RouteObject} from 'react-router-dom'
import Auth from '../pages/auth/auth'
import Cart from '../pages/cart/cart'
import Home from '../pages/home'
import Layout from '../pages/layout'
import { getAuth } from './getAuth'

export const routes:RouteObject[]=
  
    [
      {path:'/',element:<Layout />,children:[
        {index:true,element:<Home />},
        {path:'/cart',element:<Cart />}
      ]},
      {path:'/auth',element:<Auth/>}
]