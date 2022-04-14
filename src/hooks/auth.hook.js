import React from "react"

const storageName = 'userData'

export const useAuth = () => {
   const [token, setToken] = React.useState()
   const [userId, setUserId] = React.useState()
   const [userName, setUserName] = React.useState()
   const [userEmail, setUserEmail] = React.useState()
   const [userPhone, setUserPhone] = React.useState()
   const [userPicture, setUserPicture] = React.useState()
   const [isAuthenticated, setIsAuthenticated] = React.useState(false)

   const update = React.useCallback((id, token, name, email, phone, picture) => {
      setUserName(name)
      setUserEmail(email)
      setUserPhone(phone)
      setUserPicture(picture)
      // console.log(name, email, phone, picture)

      localStorage.setItem(storageName, JSON.stringify({
         userId: id, token: token, userName: name, userEmail: email, userPhone: phone, userPicture: picture
      }))
   }, [])

   const login = React.useCallback((jwtToken, id, name, email, phone, picture) => {
      setToken(jwtToken)
      setUserId(id)
      setUserName(name)
      setUserEmail(email)
      setUserPhone(phone)
      setUserPicture(picture)
      setIsAuthenticated(true)
      
      localStorage.setItem(storageName, JSON.stringify({
         userId: id, token: jwtToken, userName: name, userEmail: email, userPhone: phone, userPicture: picture
      }))
   }, [])

   const logout = React.useCallback(() => {
      setToken(null)
      setUserId(null)
      setUserName(null)
      setUserEmail(null)
      setUserPhone(null)
      setUserPicture(null)
      setIsAuthenticated(false)

      localStorage.removeItem(storageName)
   }, [])

   React.useEffect(() => {
      const data = JSON.parse(localStorage.getItem(storageName))

      if (data && data.token) {
         login(data.token, data.userId, data.userName, data.userEmail, data.userPhone, data.userPicture)
      }
   }, [login])

   return { login, logout, update, token, userId, userName, userEmail, userPhone, userPicture , isAuthenticated }
}