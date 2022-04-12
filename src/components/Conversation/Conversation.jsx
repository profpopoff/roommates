import React from "react"
import axios from 'axios'
import './Conversation.scss' 
import userImg from '../../assets/cover.jpeg'

export default function Conversation(props) {

   const [notMe, setNotMe] = React.useState(null)

   React.useEffect(() => {
      const notMeId = props.conversation.members.find(member => member !== props.userId)

      const getUser = async () => {
         try {
            const res = await axios.get('api/users/find/' + notMeId)
            setNotMe(res.data)
         } catch (error) {
            console.log(error)
         }
      }
      getUser()
   }, [props.userId, props.conversation])

   // console.log(notMe.fullName)

   return (
      <div className="conversation">
         <img src={userImg} alt="" className="conversation-img" />
         <span className="conversation-name">{notMe?.fullName}</span>
      </div>
   )
}