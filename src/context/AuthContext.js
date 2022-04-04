import React from "react"

function noop() {}

export const AuthContex = React.createContext({
   accessToken: null,
   userId: null,
   login: noop,
   logout: noop,
   isAuthenticated: false
})