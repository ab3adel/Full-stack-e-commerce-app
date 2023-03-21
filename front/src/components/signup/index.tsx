import Grid from '@mui/material/Grid'
import './signup.scss'
import {useFormik} from 'formik'
import { useTranslation } from 'react-i18next'
import {signUpValidationSchema} from './validation'

import { useContext, useState } from 'react'
import { CancelButton, DoButton } from '../../mini-components/form/buttons/buttons'
import {TextInput,PasswordInput} from '../../mini-components/form/input/input'
import notificationContext ,{iAlert} from '../../services/context/notification/context'
import { useNavigate } from 'react-router-dom'
interface iProps {setShowSignUp:Function}
export const SignUp =({setShowSignUp}:iProps)=>{
    const {t,i18n}=useTranslation()
    const [showPassword,setShowPassword]=useState(false)
    const {setAlert}=useContext(notificationContext)
    const navigate= useNavigate()
const formik=useFormik({
    initialValues:{
        username:'',
        password:'',
        password_confirmation:''
    },
    onSubmit:()=>{},
    validationSchema:signUpValidationSchema

})
const handleSignup=()=>{
    if (Object.keys(formik.errors).length ===0) {
        setAlert((pre:iAlert)=>({...pre,open:true,action:'success',message:i18n.language==='en'?
    `Welcome ${formik.values.username}`:`مرحبا ${formik.values.username}`}))
        sessionStorage.setItem('auth',JSON.stringify({username:formik.values.username}))
        navigate('/')
    } 
    else {
        return
    }
}


    return (
        <Grid item container rowGap={2} xs={12} padding={4}
        className='signup'>
            <Grid item container xs={12}
            justifyContent="center">
                <h2
                className='title'>
                    {t('signup')}
                </h2>
            </Grid>
            <Grid item  container xs={12}
                     justifyContent="center"
                     alignItems="center">
               <Grid item md={8} xs={12}>

                    <TextInput 
                    value={formik.values.username}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    name='username'
                    error={formik.errors.username}
                    label={t('username')}
                    touched={formik.touched.username}
                    />
               </Grid>
            </Grid>
            <Grid item container xs={12}
            justifyContent="center"
            alignItems={'center'}
            >
                <Grid item md={8} xs={12}>

                <PasswordInput 
                    value={formik.values.password}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                
                    name='password'
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    label={t('password')}
                    />
                </Grid>

            </Grid>
            <Grid item container xs={12}
            justifyContent="center"
            alignItems={"center"}
            >
                <Grid item md={8} xs={12}>

                    <PasswordInput 
                        value={formik.values.password_confirmation}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        name='password_confirmation'
                        error={formik.errors.password_confirmation}
                        touched={formik.touched.password_confirmation}
                        label={t('password_confirmation')}
                        />
                </Grid>

            </Grid>
            <Grid item container xs={12}
            justifyContent="center">
                 <Grid item md={5} xs={6}
                      display="flex"
                      justifyContent={'center'}
                      alignItems="center">
                    <DoButton
                     title={t('singup')}
                     fun={()=>handleSignup()}
                     disabled={
                        !Boolean(formik.values.username) ||
                        !Boolean(formik.values.password)||
                        !Boolean(formik.values.password_confirmation)
                     }
                     />
                 </Grid>
                 {/* <Grid item md={5} xs={6}>
                    <CancelButton
                     title={t('cancel')}
                     fun={()=>{}}
                     />
                 </Grid> */}
            </Grid>
            <Grid item xs={12} justifyContent="center"
            display={"flex"}
            >
                <div onClick={()=>setShowSignUp(false)}
                className="linkedText"> 
                    {
                        t('you_have_account')
                    }
                </div>
            </Grid>
          
        </Grid>
    )
}