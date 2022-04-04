import React from "react";
import { Link } from 'react-router-dom'
import './RegisterComp.scss'
import logo from '../../assets/logo.svg'
import CustomInput from "../CustomInput/CustomInput";
import LanguageSelect from "../LanguageSelect/LanguageSelect";

export default function RegisterComp() {

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
         <h2 className="title">Sign Up</h2>
            <form action="/">
               <CustomInput 
                  name='email'
                  label='Email'
                  type='email'
               />
               <CustomInput 
                  name='password'
                  label='Password'
                  type='password'
               />
               <CustomInput 
                  name='-repeat-password'
                  label='Repeat password'
                  type='password'
               />
               <CustomInput 
                  name='name'
                  label='Name'
                  type='text'
               />
               <CustomInput 
                  name='phone'
                  label='Phone'
                  type='phone'
               />
               <input className='submit-btn' type="submit" value='Submit'/>
            </form>
      </div>
   )
}