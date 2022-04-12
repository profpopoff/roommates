import React from "react";
import { Link } from 'react-router-dom'
import './RegisterComp.scss'
import logo from '../../assets/logo.svg'
import CustomInput from "../CustomInput/CustomInput";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import { useHttp } from '../../hooks/http.hook'

export default function RegisterComp() {

   const {loading, request, error, cleareError} = useHttp()

   const [success, setSuccess] = React.useState(false)

   const [form, setForm] = React.useState({
      email: '', password: '', fullName: '', phoneNumber: ''
   })

   // React.useEffect(() => {
   //    message(error)
   //    cleareError()
   // }, [error, message, cleareError])

   const changeHandler = event => {
      setForm({...form, [event.target.name]: event.target.value})
   }

   const registerHandler = async () => {
      try {
         const data = await request('/api/auth/register', 'POST', {...form})
         setSuccess(true)
      } catch (error) {}
   }

   return (
      <div className="register-comp">
         <Link to={process.env.PUBLIC_URL + '/'} className="logo">
            <div className="logo-image">
               <img src={logo} alt="Roommates logo" />
            </div>
            <h2 className="logo-title">Room<span>mates</span></h2>
         </Link>
         <div className="language-selector">
            <LanguageSelect />
         </div>
         <h2 className="title">Регистрация</h2>
            <form action="/">
               <CustomInput 
                  name='email'
                  label='Email'
                  type='email'
                  handleChange={changeHandler}
               />
               <CustomInput 
                  name='password'
                  label='Password'
                  type='password'
                  handleChange={changeHandler}
               />
               <CustomInput 
                  name='repeat-password'
                  label='Repeat password'
                  type='password'
                  // handleChange={changeHandler}
               />
               <CustomInput 
                  name='fullName'
                  label='Name'
                  type='text'
                  handleChange={changeHandler}
               />
               <CustomInput 
                  name='phoneNumber'
                  label='Phone'
                  type='phone'
                  handleChange={changeHandler}
               />
               {/* <input className='submit-btn' type="submit" value='Submit'/> */}
               <button className="submit-btn" onClick={registerHandler} disabled={loading}>Выполнить</button>
               {success && <h4 className="success">Пользователь успешно создан.</h4>}
               {error && <h4 className="error">{error}</h4>}
            </form>
      </div>
   )
}