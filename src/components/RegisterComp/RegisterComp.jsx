import React from "react"
import axios from 'axios'
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

   const [file, setFile] = React.useState(null)

   const changeHandler = event => {
      setForm({...form, [event.target.name]: event.target.value})
   }

   const registerHandler = async (e) => {
      e.preventDefault()

      const createProfile = {
         ...form,
      }

      if (file) {
         const data = new FormData()
         const fileName = Date.now() + file.name
         // setEditForm({...editForm, profilePicture: fileName})
         createProfile.profilePicture = fileName
         data.append("name", fileName)
         data.append("file", file)
         
         try {
            await axios.post("/api/upload", data)
         } catch (err) {}
      }

      try {
         const data = await request('/api/auth/register', 'POST', {...createProfile})
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
            <form onSubmit={registerHandler}>
               <CustomInput 
                  name='email'
                  label='Почта'
                  type='email'
                  handleChange={changeHandler}
               />
               <CustomInput 
                  name='password'
                  label='Пароль'
                  type='password'
                  handleChange={changeHandler}
               />
               <CustomInput 
                  name='repeat-password'
                  label='Повторите пароль'
                  type='password'
                  // handleChange={changeHandler}
               />
               <CustomInput 
                  name='fullName'
                  label='Имя'
                  type='text'
                  handleChange={changeHandler}
               />
               <CustomInput 
                  name='phoneNumber'
                  label='Телефон'
                  type='phone'
                  handleChange={changeHandler}
               />
               <input
                     type="file"
                     id="file"
                     accept=".png,.jpeg,.jpg"
                     onChange={(e) => setFile(e.target.files[0])}
                  />
               <input className='submit-btn' type="submit" value='Выполнить'/>
               {/* <button className="submit-btn" onClick={registerHandler} disabled={loading}>Выполнить</button> */}
               {success && <h4 className="success">Пользователь успешно создан.</h4>}
               {error && <h4 className="error">{error}</h4>}
            </form>
      </div>
   )
}