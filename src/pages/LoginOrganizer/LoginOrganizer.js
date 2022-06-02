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
    orgId:"",
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
      if(res.status>=200 && res.status<=299){
        localStorage.clear();
        localStorage.setItem('orgId',data.orgId);
        localStorage.setItem('loginState',2);
        navigate('/');
      }
      Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag})

  }

  return (
    <div>
    <label>Organizer-ID : <input type='text' name='orgId' onChange={handleChange} value={loginOrganizerData.orgId}/></label>
    <label>Password : <input type='password' name='password' onChange={handleChange} value={loginOrganizerData.password}/></label>
    <input type='button' onClick={onSubmit} value='Login'/>
  </div>
  )
}

export default Login