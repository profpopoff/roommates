import React from "react"
import axios from "axios"
import './RoommatePicture.scss'
import userImg from '../../assets/default-user.png'

export default function RoommatePicture(props) {

   const [roommate, setRoommate] = React.useState()

   const PF = process.env.REACT_APP_PUBLIC_FOLDER

   React.useEffect(() => {
      const getUser = async () => {
         try {
            const res = await axios.get('api/users/find/' + props.userId)
            setRoommate(res.data)
         } catch (error) {
            console.log(error)
         }
      } 
      getUser()
   }, [props.userId])
   
   return (
      <img src={roommate?.profilePicture ? PF + roommate.profilePicture : userImg} alt="" className="roommate-img" />
   )
}