import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Homepage from './pages/Homepage'
import Apartment from './pages/Apartment'
import Chats from './pages/Chats'
import Favourites from './pages/Favourites'
import Profile from './pages/Profile'
import Register from './pages/Register'

export default function App() {
  return (
    <Routes>
     
      <Route path={process.env.PUBLIC_URL + '/'} element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path={process.env.PUBLIC_URL + '/register'} element={<Register />} />
        <Route path={'/apartment'} element={<Apartment />} />
        <Route path={process.env.PUBLIC_URL + '/chats'} element={<Chats />} />
        <Route path={process.env.PUBLIC_URL + '/favourites'} element={<Favourites />} />
        <Route path={process.env.PUBLIC_URL + '/profile'} element={<Profile />} />
        <Route path={process.env.PUBLIC_URL + '/profile/edit'} element={<Profile />} />
        <Route path={process.env.PUBLIC_URL + '/settings'} element={<Profile />} />
        <Route path={process.env.PUBLIC_URL + '/help'} element={<Profile />} />
      </Route>
    </Routes>
  );
}
