import B3d from '../../assets/images/B3d.png'
import Grid from '@mui/material/Grid'
import {Link} from 'react-router-dom'
import {Phone,Email,House} from '@mui/icons-material'
import './footer.scss'
import { useTranslation } from 'react-i18next'
export const Footer=()=>{
const {t}=useTranslation()
    return (
        <Grid item container xs={12} padding={4}
        className="footer">
            
            <Grid item container  xs={12}
         
          >
                <Grid item  container justifyContent="center "md={4} xs={12}>
                  <img src={B3d} className="logo" />
                </Grid>
                <Grid item container xs={12} md={4}
                 className='links'

                >
                    <Grid item xs={12} textAlign="center">
                        <h1 >{t('links')}</h1>
                    </Grid>
                    <Grid item container xs={12}
                    px={2}>
                        <Grid item xs={12} textAlign="center">

                            <Link to={"/"} >
                            {t("login")}
                            </Link>
                        </Grid>
                        <Grid item xs={12} textAlign="center">

                            <Link to={'/'} >{t("home")}</Link>
                        </Grid>
                    </Grid>
                   
                </Grid>
                <Grid item container xs={12} md={4}
                className="contacts"
               
                >
                    <Grid item xs={12}
                    textAlign="center" >

                        <h1>{t('contacts')}</h1>
                    </Grid>
                    <Grid item container xs={12}
                    px={2} >
                        <Grid item xs={4}
                        display="flex" justifyContent={'center'}><House  /></Grid>
                        <Grid item xs={8} >
                            Syria ,Tartous ,Banias
                        </Grid>
                        <Grid item xs={4}
                          display="flex" justifyContent={'center'}
                        ><Phone  /></Grid>
                        <Grid item xs={8}
                        >
                            283042308402394802
                        </Grid>
                        <Grid item xs={4}
                          display="flex" justifyContent={'center'}
                        ><Email   /></Grid>
                        <Grid item xs={8}  >
                            MyEcommerce@service.com
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}