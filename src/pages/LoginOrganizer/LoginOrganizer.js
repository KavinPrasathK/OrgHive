import React from 'react'
import styles from "./LoginOrganizer.module.css"
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';
import {useNavigate} from 'react-router-dom';
import { apiLoginOrganizer } from '../../auth/auth';

function Login() {
  let navigate=useNavigate();
  const [loginOrganizerData,setLoginOrganizerData]=React.useState({
    orgid:"",
    password:""
  })

  function handleChange(event){
    setLoginOrganizerData((prevData)=>{
        return{
            ...prevData,
            [event.target.name]:event.target.value
        }
    })
  }

  const onSubmit = async() =>{      
      var data=loginOrganizerData;
      const res=await apiLoginOrganizer(data);
      console.log(res.data);
      // console.log(res.status)
      if(res.status>=200 && res.status<=299){
        localStorage.setItem('orgid',data.orgid);
        // window.location.href='/';
        navigate('/');
      }
      Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag})

  }

  return (
    <div>
    <label>Organizer-ID : <input type='text' name='orgid' onChange={handleChange} value={loginOrganizerData.orgid}/></label>
    <label>Password : <input type='password' name='password' onChange={handleChange} value={loginOrganizerData.password}/></label>
    <input type='button' onClick={onSubmit} value='Login'/>
  </div>
  )
}

export default Login