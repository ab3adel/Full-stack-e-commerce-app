import AppBar from '@mui/material/AppBar'

import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import { LanguageSwitcher } from '../../mini-components/language-switcher/language-switcher'

import  useScrollTrigger  from '@mui/material/useScrollTrigger'
import Slide from '@mui/material/Slide'
import heart from '../../assets/images/heart-icon.svg'
import React,{ useState } from 'react'
import {Sidebar} from '../sidebar/sidebar'
import {Menu as MenuIcon} from '@mui/icons-material'
import {ShoppingCart} from '@mui/icons-material'
import './header.scss'
import {iInitial} from '../../services/store/features/homeSlicer'
import {homeSlicer} from '../../services/store/features/homeSlicer'
import {useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
type tPath= '/' |'/cart' | '/auth'
export const Header =()=>{
    const state=useSelector((state:{products:iInitial})=>state.products)
const {t}=useTranslation()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openSidebar,setOpenSidebar]=useState(false)
    const trigger = useScrollTrigger()
    const navigate=useNavigate()
    const location=useLocation()
    let paths={'/':t('home'),'/cart':t('cart'),'/auth':t('auth')}
    
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      }
    const handleClose=()=>setAnchorEl(null)
console.log(location.pathname)
    return (
        <React.Fragment>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar position="fixed"
                 className="header"
                 sx={{
                    background:'white'
                 }}
                >
                <Toolbar>
                
                <div 
               style={{position:"relative",flexGrow:'1'}} >
                <div className='icons'
             
                >

                    <div className="language">
                    <LanguageSwitcher />
                    </div>
 
                    <div className='logoIcon'
                    onClick={()=>navigate('/cart')}
                    >

                     <ShoppingCart className="logo" />
                    { 
                    state.saved?.length>0
                    && location.pathname !=='/cart'?
                    <div className="circle">
                        {state.saved.length}
                     </div>:null
                     }
                    </div>
                    <div className="logoIcon heart">
                        <img src={heart} className="logo"/>
                        {
                            state.likes.length>0?
                            <div className="circle">
                             {state.likes.length}
                            </div>:null
                        }
                      
                    </div>
                </div>
                    <span className='pageName'>
                       {paths[location.pathname as tPath]}
                    </span>
                </div>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                    onClick={()=>setOpenSidebar(!openSidebar)}
                >
                    <MenuIcon sx={{color:'black'}}/>
                </IconButton>
            
            
        
                </Toolbar>

            </AppBar>
        </Slide>
        <Sidebar 
         openSidebar={openSidebar}
         setOpenSidebar={setOpenSidebar}
        />
      </React.Fragment>
    )
}