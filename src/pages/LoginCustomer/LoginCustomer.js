import React,{useContext} from 'react'
import styles from "./LoginCustomer.module.css"
import {apiLoginCustomer}  from '../../auth/auth';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';
import {useNavigate} from 'react-router-dom';
function Login() {
  let navigate=useNavigate();
  const [loginCustomerData,setLoginCustomerData]=React.useState({
    userName:"",
    password:""
  })

  function handleChange(event){
    setLoginCustomerData((prevData)=>{
        return{
            ...prevData,
            [event.target.name]:event.target.value
        }
    })
  }

  const onSubmit = async() =>{      
      var data=loginCustomerData;
      const res=await apiLoginCustomer(data);
      console.log(res.data);
      // console.log(res.status)
      if(res.status>=200 && res.status<=299){
        localStorage.setItem('userName',data.userName);
        // window.location.href='/';
        navigate('/');
      }
      Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag})

  }

  return (
    <div>
      <label>User Name : <input type='text' name='userName' onChange={handleChange} value={loginCustomerData.userName}/></label>
      <label>Password : <input type='password' name='password' onChange={handleChange} value={loginCustomerData.password}/></label>
      <input type='button' onClick={onSubmit} value='Login'/>
    </div>
  )
}

export default Login