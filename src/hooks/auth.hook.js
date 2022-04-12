import React from "react"

const storageName = 'userData'

export const useAuth = () => {
   const [token, setToken] = React.useState(null)
   const [userId, setUserId] = React.useState(null)
   const [userName, setUserName] = React.useState(null)
   const [userEmail, setUserEmail] = React.useState(null)
   const [userPhone, setUserPhone] = React.useState(null)
   const [isAuthenticated, setIsAuthenticated] = React.useState(false)

   const update = React.useCallback((name, email, phone) => {
      setUserName(name)
      setUserEmail(email)
      setUserPhone(phone)
      console.log(userName, userPhone, userEmail)

      localStorage.setItem(storageName, JSON.stringify({
         userName: name, userEmail: email, userPhone: phone
      }))
   }, [])

   const login = React.useCallback((jwtToken, id, name, email, phone) => {
      setToken(jwtToken)
      setUserId(id)
      setUserName(name)
      setUserEmail(email)
      setUserPhone(phone)
      setIsAuthenticated(true)
      
      localStorage.setItem(storageName, JSON.stringify({
         userId: id, token: jwtToken, userName: name, userEmail: email, userPhone: phone
      }))
   }, [])

   const logout = React.useCallback(() => {
      setToken(null)
      setUserId(null)
      setUserName(null)
      setUserEmail(null)
      setUserPhone(null)
      setIsAuthenticated(false)

      localStorage.removeItem(storageName)
   }, [])

   React.useEffect(() => {
      const data = JSON.parse(localStorage.getItem(storageName))

      if (data && data.token) {
         login(data.token, data.userId, data.userName, data.userEmail, data.userPhone)
      }
   }, [login])

   return { login, logout, update, token, userId, userName, userEmail, userPhone, isAuthenticated }
}