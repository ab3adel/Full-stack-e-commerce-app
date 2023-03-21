import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useTranslation } from 'react-i18next';
import {LanguageSwitcher} from '../../mini-components/language-switcher/language-switcher'
import {Login,ShoppingBag,Person,Home} from '@mui/icons-material'
import B3d from '../../assets/images/B3d.png'
import './sidebar.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from '../../services/getAuth';
interface iProps {openSidebar:boolean,setOpenSidebar:Function}
export const Sidebar=({openSidebar,setOpenSidebar}:iProps)=>{
    const {t}=useTranslation()
    const navigate=useNavigate()
    const location =useLocation()
    const handleClose =(event: React.KeyboardEvent | React.MouseEvent) => {
    

      setOpenSidebar(false);
    };
const handleLogout =()=>{
  sessionStorage.removeItem('auth')
  navigate('/auth')
}
    return (
        <Drawer
        anchor={'left'}
        open={openSidebar}
        onClose={handleClose}
        className="sidebar"
      >
   
        <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={handleClose}
      
      >
        <div style={{maxWidth:'100%',cursor:'pointer'}}
          onClick={()=>navigate('/')}>
            <img src={B3d} className="logo" />
        </div>
        <List>
        <ListItem disablePadding
      >

              <ListItemButton
              sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center'
              }}
              >
                <ListItemIcon sx={{justifyContent:'center'}}>
                   <Person fontSize={'large'}/>
                </ListItemIcon>
                <ListItemText primary={getAuth()? getAuth().username:'unkown'} />
              </ListItemButton>
            </ListItem>
          {[
            {label:t('home'),icon:<Home color='inherit'/>,path:'/'},
            {label:t('cart'),icon:<ShoppingBag />,path:'/cart'}, 
          {label: getAuth()?t('logout'):t('login')
          ,icon:<div onClick={()=>getAuth()?handleLogout():{}}><Login /></div>
          ,path:'/auth'}].map((eleme, index) => (
            <>
              <Divider />
            <ListItem key={index} disablePadding
            className={location.pathname===eleme.path?'active':''}
            onClick={()=>navigate(eleme.path)}>
              <ListItemButton>
                <ListItemIcon>
                  {eleme.icon}
                </ListItemIcon>
                <ListItemText primary={eleme.label} />
              </ListItemButton>
            </ListItem>
            </>
          ))}
        </List>

      
      
      </Box>
     
      </Drawer>
    )
}