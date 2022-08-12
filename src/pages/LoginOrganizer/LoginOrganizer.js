import React from 'react';
import { useRef } from 'react';
import styles from "./LoginOrganizer.module.css"
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';
import ReCAPTCHA from "react-google-recaptcha";
import {useNavigate} from 'react-router-dom';
import ButtonOrg from "../../components/Button/ButtonOrg";
import BgSnowAnim from '../../components/BgSnowAnim/BgSnowAnim';
import { apiLoginOrganizer,apiGcaptcha} from '../../auth/auth';

function Login() {
  let navigate=useNavigate();
  const [loginOrganizerData,setLoginOrganizerData]=React.useState({
    orgId:"",
    password:""
  })
  const captchaRef = useRef(null);
  function handleChange(event){
    setLoginOrganizerData((prevData)=>{
        return{
            ...prevData,
            [event.target.name]:event.target.value
        }
    })
  }

  const onSubmit = async(e) =>{
    e.preventDefault();
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();

    await apiGcaptcha({ token })
      .then(res => console.log(res))
      .catch((error) => {
        console.log(error);
      });      
      var data=loginOrganizerData;
      // console.log(data);
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
    <BgSnowAnim/>
      <div className={`${styles.card}`}>
      <h1 className={`${styles.head}`}>LOGIN</h1>
        <div className={`${styles.content}`}>
        <label>Organizer-ID : <br/><br/><input type='text' name='orgId' onChange={handleChange} value={loginOrganizerData.orgId} className={`${styles.inputfields}`}/></label><br/><br/>
        <label>Password : <br/><br/><input type='password' name='password' onChange={handleChange} value={loginOrganizerData.password} className={`${styles.inputfields}`}/></label><br/><br/>
        <div style={{width:"58%",margin:"auto"}}><ReCAPTCHA 
            sitekey={'6LdiIB8hAAAAAMByMVdIEMEwQa-E1jB_Ykr7n5gm'}
            size="normal"
            ref={captchaRef}
          /></div><br/>
        <ButtonOrg text='Login' func={onSubmit} /><br/><br/>
        <a style={{color:"#f51269",textDecoration:'none'}} href='/ForgotPasswordOrg'>Forgot Password / Org. ID</a>
          <br/><br/>
          Don't have an account? <a style={{color:"#f51269",textDecoration:'none'}} href='/SignUpOrganizer'>Sign Up</a>
        </div>
      </div>
  </div>
  )
}

export default Login