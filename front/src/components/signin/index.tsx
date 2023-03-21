import Grid from '@mui/material/Grid'
import { TextInput,PasswordInput } from '../../mini-components/form/input/input'
import './signin.scss'
import {useFormik} from 'formik'
import { useTranslation } from 'react-i18next'
import {signInValidationSchema} from './validation'

import { useContext, useState } from 'react'
import { CancelButton, DoButton } from '../../mini-components/form/buttons/buttons'
import { object } from 'yup'
import { useNavigate } from 'react-router-dom'
import notificationContext , {iAlert}from '../../services/context/notification/context'
interface iProps {setShowSignUp:Function}
export const Signin =({setShowSignUp}:iProps)=>{
    const {t,i18n}=useTranslation()
    const navigate =useNavigate()
    const {setAlert}=useContext(notificationContext)
  
const formik=useFormik({
    initialValues:{
        username:'',
        password:''
    },
    onSubmit:()=>{},
    validationSchema:signInValidationSchema(i18n.language)

})
const handleLogin=()=>{
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
console.log(formik.values)
console.log(formik.errors)
    return (
        <Grid item container rowGap={2} xs={12} padding={4}
        className="signin"
        >
            <Grid item container xs={12}
            justifyContent="center">
                <h2
                className='title'>
                    {t('signin')}
                </h2>
            </Grid>
            <Grid item container xs={12}
            justifyContent="center"
            alignItems="center"
          >
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
            <Grid item  container xs={12}
              justifyContent="center"
              alignItems="center">
                <Grid item md={8} xs={12}>
                    <PasswordInput
                    value={formik.values.password}
                    handleBlur={formik.handleBlur}
                    handleChange={formik.handleChange}
                    name="password"
                    label={t('password')}
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    />
                </Grid>

            </Grid>
            <Grid item container xs={12}
             justifyContent="center"
            >
                 <Grid item md={5} xs={6}
                 display="flex"
                 justifyContent={'center'}
                 alignItems="center"
             >
                    <DoButton
                     title={t('signin')}
                     fun={()=>handleLogin()}
                     disabled={
                        !Boolean(formik.values.username) ||
                        !Boolean(formik.values.password)
                     }
                     />
                 </Grid>
                 {/* <Grid item md={5} xs={6}
                  display="flex"
                  justifyContent={'center'}
                  alignItems="center"
                 >
                    <CancelButton
                     title={t('cancel')}
                     fun={()=>{}}
                     />
                 </Grid> */}
            </Grid>
            <Grid item xs={12} justifyContent='center'
            display={'flex'}>
            <div onClick={()=>setShowSignUp(true)}
            className="linkedText"
            >
                {t('dont_have_account')}
            </div>
            </Grid>
        </Grid>
    )
}