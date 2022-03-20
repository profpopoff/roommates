import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Homepage from './pages/Homepage'
import Rent from './pages/Rent'
import Chats from './pages/Chats'
import Favourites from './pages/Favourites'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Routes>
      <Route path={process.env.PUBLIC_URL + '/'} element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path={process.env.PUBLIC_URL + '/rent'} element={<Rent />} />
        <Route path={process.env.PUBLIC_URL + '/chats'} element={<Chats />} />
        <Route path={process.env.PUBLIC_URL + '/favourites'} element={<Favourites />} />
        <Route path={process.env.PUBLIC_URL + '/profile'} element={<Profile />} /> 
        {/* not finished */}
        <Route path={process.env.PUBLIC_URL + '/profile/edit'} element={<Profile />} />
        <Route path={process.env.PUBLIC_URL + '/settings'} element={<Profile />} />
        <Route path={process.env.PUBLIC_URL + '/help'} element={<Profile />} />
      </Route>
    </Routes>
  );
}
